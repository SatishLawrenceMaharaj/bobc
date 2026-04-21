import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const sessionValue = request.cookies.get("admin_session")?.value;
    const sessionId = Number(sessionValue);

    if (!sessionValue || Number.isNaN(sessionId)) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const result = await pool.query(
      `SELECT id, username FROM public.admin_users WHERE id = $1 AND is_active = true`,
      [sessionId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      admin: result.rows[0],
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}