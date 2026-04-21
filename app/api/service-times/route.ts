import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, title, time_text, location FROM public.service_times ORDER BY title"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching service times:", error);
    return NextResponse.json(
      { error: "Failed to fetch service times" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, time_text, location } = await request.json();

    if (!title || !time_text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "INSERT INTO public.service_times (title, time_text, location) VALUES ($1, $2, $3) RETURNING id, title, time_text, location",
      [title, time_text, location || null]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating service time:", error);
    return NextResponse.json(
      { error: "Failed to create service time" },
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
        { error: "Service time ID is required" },
        { status: 400 }
      );
    }

    await pool.query("DELETE FROM public.service_times WHERE id = $1", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service time:", error);
    return NextResponse.json(
      { error: "Failed to delete service time" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, title, time_text, location } = await request.json();

    if (!id || !title || !time_text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "UPDATE public.service_times SET title = $1, time_text = $2, location = $3 WHERE id = $4 RETURNING id, title, time_text, location",
      [title, time_text, location || null, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Service time not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating service time:", error);
    return NextResponse.json(
      { error: "Failed to update service time" },
      { status: 500 }
    );
  }
}
