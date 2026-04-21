import { pool } from "@/lib/db";
import { ensureYoutubeVideosSchema } from "../../lib/youtube-schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ensureYoutubeVideosSchema();

    const result = await pool.query(`
      select
        id,
        title,
        coalesce(description, '') as description,
        youtube_url as url,
        thumbnail_url as thumbnail,
        coalesce(to_char(published_date, 'YYYY-MM-DD'), to_char(created_at, 'YYYY-MM-DD')) as date
      from public.youtube_videos
      order by coalesce(published_date, created_at) desc
      limit 50
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
