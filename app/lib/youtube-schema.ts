// import { Pool } from "pg";

// export async function ensureYoutubeVideosSchema(pool: Pool) {
//   await pool.query(`
//     create table if not exists public.youtube_videos (
//       id text primary key,
//       title text not null,
//       description text,
//       youtube_url text not null,
//       thumbnail_url text,
//       published_date date,
//       created_at timestamptz default now(),
//       updated_at timestamptz default now()
//     );
//   `);

//   await pool.query(`alter table public.youtube_videos add column if not exists description text;`);
//   await pool.query(`alter table public.youtube_videos add column if not exists youtube_url text;`);
//   await pool.query(`alter table public.youtube_videos add column if not exists thumbnail_url text;`);
//   await pool.query(`alter table public.youtube_videos add column if not exists published_date date;`);
//   await pool.query(`alter table public.youtube_videos add column if not exists created_at timestamptz default now();`);
//   await pool.query(`alter table public.youtube_videos add column if not exists updated_at timestamptz default now();`);

//   await pool.query(`update public.youtube_videos set created_at = now() where created_at is null;`);
//   await pool.query(`update public.youtube_videos set updated_at = now() where updated_at is null;`);
//   await pool.query(`update public.youtube_videos set youtube_url = concat('https://www.youtube.com/watch?v=', id) where youtube_url is null or youtube_url = '';`);
//   await pool.query(`update public.youtube_videos set thumbnail_url = concat('https://i.ytimg.com/vi/', id, '/hqdefault.jpg') where thumbnail_url is null or thumbnail_url = '';`);
// }

import { pool } from "@/lib/db";

export async function ensureYoutubeVideosSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.youtube_videos (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      youtube_url TEXT,
      thumbnail_url TEXT,
      published_date DATE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    ALTER TABLE public.youtube_videos
    ADD COLUMN IF NOT EXISTS description TEXT;
  `);

  await pool.query(`
    ALTER TABLE public.youtube_videos
    ADD COLUMN IF NOT EXISTS youtube_url TEXT;
  `);

  await pool.query(`
    ALTER TABLE public.youtube_videos
    ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
  `);

  await pool.query(`
    ALTER TABLE public.youtube_videos
    ADD COLUMN IF NOT EXISTS published_date DATE;
  `);

  await pool.query(`
    ALTER TABLE public.youtube_videos
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
  `);

  await pool.query(`
    ALTER TABLE public.youtube_videos
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
  `);

  await pool.query(`
    UPDATE public.youtube_videos
    SET youtube_url = CONCAT('https://www.youtube.com/watch?v=', id)
    WHERE youtube_url IS NULL OR youtube_url = '';
  `);

  await pool.query(`
    UPDATE public.youtube_videos
    SET thumbnail_url = CONCAT('https://i.ytimg.com/vi/', id, '/hqdefault.jpg')
    WHERE thumbnail_url IS NULL OR thumbnail_url = '';
  `);

  await pool.query(`
    UPDATE public.youtube_videos
    SET created_at = NOW()
    WHERE created_at IS NULL;
  `);

  await pool.query(`
    UPDATE public.youtube_videos
    SET updated_at = NOW()
    WHERE updated_at IS NULL;
  `);
}