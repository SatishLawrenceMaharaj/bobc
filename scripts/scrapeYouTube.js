const https = require('https');
const fs = require('fs');
const path = require('path');

// Known channel IDs - update if needed
const CHANNEL_IDS = {
  'bethelobcbordenarve': 'UCD1HZ08Pogylic8LB47L4QA', // Bethel OBC Borde Narve
};

function fetchRSSFeed(channelId) {
  return new Promise((resolve, reject) => {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    
    console.log(`Fetching RSS feed from: ${url}`);
    
    https.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (data) {
          resolve(data);
        } else {
          reject(new Error('Empty response from YouTube RSS feed'));
        }
      });
    }).on('error', (err) => {
      reject(new Error(`Failed to fetch RSS: ${err.message}`));
    });
  });
}

function decodeHtmlEntities(text) {
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
  };
  return text.replace(/&[^;]+;/g, (match) => entities[match] || match);
}

function parseRSSFeed(rssData) {
  const videos = [];
  
  // Simple regex-based parsing for robustness
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
      const author = authorMatch ? decodeHtmlEntities(authorMatch[1]) : 'Bethel OBC';
      
      const date = publishedMatch 
        ? publishedMatch[1].split('T')[0]
        : new Date().toISOString().split('T')[0];
      
      videos.push({
        id: videoId,
        title,
        description: author,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        date,
      });
    }
  }
  
  return videos;
}

async function scrapeYouTubeVideos() {
  try {
    const username = 'bethelobcbordenarve';
    const channelId = CHANNEL_IDS[username] || 'UCiQ5u3H3U1zfqJ7R1G_8pqQ';
    
    console.log(`Scraping YouTube videos for @${username}...`);
    console.log(`Using channel ID: ${channelId}`);
    
    const rssData = await fetchRSSFeed(channelId);
    
    console.log('Parsing RSS feed...');
    const videos = parseRSSFeed(rssData);
    
    if (videos.length === 0) {
      console.warn('No videos found in the feed. This might be a private channel or the channel ID is incorrect.');
    }
    
    // Convert to TypeScript format
    const tsContent = `export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  date: string;
}

export const youtubeVideos: YouTubeVideo[] = ${JSON.stringify(videos, null, 2)};
`;
    
    // Save to TypeScript file
    const outputDir = path.join(__dirname, '../app/data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputFile = path.join(outputDir, 'youtubeVideos.ts');
    fs.writeFileSync(outputFile, tsContent);
    
    console.log(`✓ Successfully scraped ${videos.length} videos!`);
    console.log(`✓ Saved to ${outputFile}`);
    console.log('\nTo re-run this scraper, use: npm run scrape-videos');
    
  } catch (error) {
    console.error('✗ Error scraping YouTube:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Check that the channel ID is correct');
    console.log('2. Make sure the channel has public videos');
    console.log('3. Try again in a few moments (rate limiting)');
    process.exit(1);
  }
}

scrapeYouTubeVideos();
