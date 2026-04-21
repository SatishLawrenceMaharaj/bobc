import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, address_line_1, address_line_2, map_url, phone, email, prayer_request_form_url FROM public.contact_info LIMIT 1"
    );
    return NextResponse.json(result.rows[0] || null);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact info" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {
      id,
      address_line_1,
      address_line_2,
      map_url,
      phone,
      email,
      prayer_request_form_url,
    } = await request.json();

    if (!address_line_1 || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "UPDATE public.contact_info SET address_line_1 = $1, address_line_2 = $2, map_url = $3, phone = $4, email = $5, prayer_request_form_url = $6 WHERE id = $7 RETURNING id, address_line_1, address_line_2, map_url, phone, email, prayer_request_form_url",
      [
        address_line_1,
        address_line_2 || null,
        map_url || null,
        phone,
        email,
        prayer_request_form_url || null,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Contact info not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating contact info:", error);
    return NextResponse.json(
      { error: "Failed to update contact info" },
      { status: 500 }
    );
  }
}
