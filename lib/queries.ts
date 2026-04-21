import { pool } from "./db";

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  priority: "high" | "medium" | "low";
}

export interface ServiceTime {
  id: string;
  title: string;
  time_text: string;
  location?: string;
}

export interface ContactInfo {
  id: string;
  phone: string;
  email: string;
  address_line_1: string;
  address_line_2?: string;
  map_url?: string;
  prayer_request_form_url?: string;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const result = await pool.query(
      "SELECT id, title, to_char(created_at, 'YYYY-MM-DD') AS date, content AS description, priority FROM public.announcements ORDER BY id DESC LIMIT 10"
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
}

export async function getServiceTimes(): Promise<ServiceTime[]> {
  try {
    const result = await pool.query(
      "SELECT id, title, time_text, location FROM public.service_times ORDER BY title"
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching service times:", error);
    return [];
  }
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const result = await pool.query(
      "SELECT id, address_line_1, address_line_2, map_url, phone, email, prayer_request_form_url FROM public.contact_info LIMIT 1"
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return null;
  }
}
