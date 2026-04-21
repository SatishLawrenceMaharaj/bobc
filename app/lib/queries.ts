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
  name: string;
  day: string;
  time: string;
  location?: string;
}

export interface ContactInfo {
  id: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const result = await pool.query(
      "SELECT id, title, date, content, priority FROM announcements ORDER BY date DESC LIMIT 10"
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
      "SELECT id, name, day, time, location FROM service_times ORDER BY CASE WHEN day = 'Sunday' THEN 0 WHEN day = 'Wednesday' THEN 1 ELSE 2 END, time"
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
      "SELECT id, phone, email, address, city, state, zip_code as zipCode FROM contact_info LIMIT 1"
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return null;
  }
}
