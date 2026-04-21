import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, title, content, priority, to_char(created_at, 'YYYY-MM-DD') AS date FROM public.announcements ORDER BY id DESC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Failed to fetch announcements" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, priority } = await request.json();

    if (!title || !content || !priority) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "INSERT INTO public.announcements (title, content, priority) VALUES ($1, $2, $3) RETURNING id, title, content, priority, to_char(created_at, 'YYYY-MM-DD') AS date",
      [title, content, priority]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json(
      { error: "Failed to create announcement" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Announcement ID is required" },
        { status: 400 }
      );
    }

    await pool.query("DELETE FROM public.announcements WHERE id = $1", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json(
      { error: "Failed to delete announcement" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, title, content, priority } = await request.json();

    if (!id || !title || !content || !priority) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "UPDATE public.announcements SET title = $1, content = $2, priority = $3 WHERE id = $4 RETURNING id, title, content, priority, to_char(created_at, 'YYYY-MM-DD') AS date",
      [title, content, priority, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Announcement not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating announcement:", error);
    return NextResponse.json(
      { error: "Failed to update announcement" },
      { status: 500 }
    );
  }
}
