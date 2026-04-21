import https from "node:https";
import { Pool } from "pg";

const CHANNEL_CONFIG = {
  handle: process.env.YOUTUBE_CHANNEL_HANDLE || "bethelobcbordenarve",
  channelId: process.env.YOUTUBE_CHANNEL_ID || "UCD1HZ08Pogylic8LB47L4QA",
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          timeout: 15000,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
        },
        (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            if (res.statusCode && res.statusCode >= 400) {
              reject(new Error(`Request failed for ${url} with status ${res.statusCode}`));
              return;
            }

            if (!data) {
              reject(new Error(`Empty response from ${url}`));
              return;
            }

            resolve(data);
          });
        }
      )
      .on("error", (err) => {
        reject(new Error(`Failed to fetch ${url}: ${err.message}`));
      });
  });
}

async function resolveChannelId({ handle, channelId }) {
  const candidates = [];

  if (channelId) {
    candidates.push(channelId);
  }

  if (handle) {
    const channelPageUrl = `https://www.youtube.com/@${handle}`;
    console.log(`Resolving channel ID from handle page: ${channelPageUrl}`);

    try {
      const page = await fetchUrl(channelPageUrl);
      const patterns = [
        /"channelId":"(UC[^"]{20,})"/,
        /"externalId":"(UC[^"]{20,})"/,
        /\/channel\/(UC[^"'/\s]{20,})/,
      ];

      for (const pattern of patterns) {
        const match = page.match(pattern);
        if (match && match[1]) {
          candidates.unshift(match[1]);
          break;
        }
      }
    } catch (error) {
      console.warn(`Could not resolve channel ID from handle page: ${error.message}`);
    }
  }

  const uniqueCandidates = [...new Set(candidates.filter(Boolean))];

  if (uniqueCandidates.length === 0) {
    throw new Error("No YouTube channel handle or channel ID configured.");
  }

  return uniqueCandidates;
}

async function fetchRSSFeed(channelCandidates) {
  let lastError;

  for (const channelId of channelCandidates) {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    console.log(`Fetching RSS feed from: ${url}`);

    try {
      const rss = await fetchUrl(url);
      return { rss, channelId };
    } catch (error) {
      lastError = error;
      console.warn(`RSS fetch failed for ${channelId}: ${error.message}`);
    }
  }

  throw lastError || new Error("Unable to fetch YouTube RSS feed.");
}

function decodeHtmlEntities(text) {
  const entities = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
  };

  return text.replace(/&[^;]+;/g, (match) => entities[match] || match);
}

function parseRSSFeed(rssData) {
  const videos = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(rssData)) !== null) {
    const entry = match[1];
    const titleMatch = entry.match(/<title>(.*?)<\/title>/);
    const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
    const authorMatch = entry.match(/<author>\s*<name>(.*?)<\/name>/);

    if (titleMatch && videoIdMatch) {
      const videoId = videoIdMatch[1].trim();
      const title = decodeHtmlEntities(titleMatch[1]);
      const author = authorMatch ? decodeHtmlEntities(authorMatch[1]) : "Bethel OBC";
      const date = publishedMatch
        ? publishedMatch[1].split("T")[0]
        : new Date().toISOString().split("T")[0];

      videos.push({
        id: videoId,
        title,
        description: author,
        thumbnail_url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        youtube_url: `https://www.youtube.com/watch?v=${videoId}`,
        published_date: date,
      });
    }
  }

  return videos;
}

async function ensureTable(pool) {
  await pool.query(`
    create table if not exists public.youtube_videos (
      id text primary key,
      title text not null,
      description text,
      youtube_url text not null,
      thumbnail_url text,
      published_date date,
      created_at timestamptz default now(),
      updated_at timestamptz default now()
    );
  `);

  await pool.query(`alter table public.youtube_videos add column if not exists description text;`);
  await pool.query(`alter table public.youtube_videos add column if not exists youtube_url text;`);
  await pool.query(`alter table public.youtube_videos add column if not exists thumbnail_url text;`);
  await pool.query(`alter table public.youtube_videos add column if not exists published_date date;`);
  await pool.query(`alter table public.youtube_videos add column if not exists created_at timestamptz default now();`);
  await pool.query(`alter table public.youtube_videos add column if not exists updated_at timestamptz default now();`);

  await pool.query(`update public.youtube_videos set created_at = now() where created_at is null;`);
  await pool.query(`update public.youtube_videos set updated_at = now() where updated_at is null;`);
  await pool.query(`update public.youtube_videos set youtube_url = concat('https://www.youtube.com/watch?v=', id) where youtube_url is null or youtube_url = '';`);
  await pool.query(`update public.youtube_videos set thumbnail_url = concat('https://i.ytimg.com/vi/', id, '/hqdefault.jpg') where thumbnail_url is null or thumbnail_url = '';`);
}

async function upsertVideos(pool, videos) {
  for (const video of videos) {
    await pool.query(
      `
      insert into public.youtube_videos (
        id,
        title,
        description,
        youtube_url,
        thumbnail_url,
        published_date,
        created_at,
        updated_at
      )
      values ($1, $2, $3, $4, $5, $6, now(), now())
      on conflict (id) do update
      set
        title = excluded.title,
        description = excluded.description,
        youtube_url = excluded.youtube_url,
        thumbnail_url = excluded.thumbnail_url,
        published_date = excluded.published_date,
        updated_at = now()
      `,
      [
        video.id,
        video.title,
        video.description,
        video.youtube_url,
        video.thumbnail_url,
        video.published_date,
      ]
    );
  }
}

async function scrapeYouTubeVideos() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    console.log(`Scraping YouTube videos for @${CHANNEL_CONFIG.handle}...`);
    const channelCandidates = await resolveChannelId(CHANNEL_CONFIG);
    console.log(`Channel ID candidates: ${channelCandidates.join(", ")}`);

    const { rssData, channelId } = await (async () => {
      const { rss, channelId } = await fetchRSSFeed(channelCandidates);
      return { rssData: rss, channelId };
    })();

    console.log(`Using working channel ID: ${channelId}`);
    console.log("Parsing RSS feed...");
    const videos = parseRSSFeed(rssData);

    if (videos.length === 0) {
      console.warn(
        "No videos found in the feed. The channel may have no public videos or YouTube changed the response format."
      );
    }

    await ensureTable(pool);
    await upsertVideos(pool, videos);

    console.log(`✓ Successfully upserted ${videos.length} videos into Postgres`);

    const check = await pool.query(`
      select id, title, youtube_url, thumbnail_url, published_date
      from public.youtube_videos
      order by coalesce(published_date, current_date) desc
      limit 10
    `);

    console.table(check.rows);
  } catch (error) {
    console.error("✗ Error scraping YouTube:", error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

scrapeYouTubeVideos();
