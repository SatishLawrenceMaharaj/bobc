import { pool } from "./db";

export type Announcement = {
  id: number;
  title: string;
  date: string;
  content: string;
  priority: "high" | "medium" | "low";
};

export type ServiceTime = {
  id: string;
  title: string;
  time_text: string;
  location: string;
};

export type ContactInfo = {
  id: number;
  address_line_1: string | null;
  address_line_2: string | null;
  map_url: string | null;
  phone: string | null;
  email: string | null;
  prayer_request_form_url: string | null;
};

export async function getAnnouncements(): Promise<Announcement[]> {
  const result = await pool.query(`
    select
      id,
      title,
      announcement_date as date,
      content,
      priority
    from public.announcements
    order by id desc
  `);

  return result.rows;
}

export async function getServiceTimes(): Promise<ServiceTime[]> {
  const result = await pool.query(`
    select
      id,
      title,
      time_text,
      location
    from public.service_times
    order by title asc
  `);

  return result.rows;
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  const result = await pool.query(`
    select
      id,
      address_line_1,
      address_line_2,
      map_url,
      phone,
      email,
      prayer_request_form_url
    from public.contact_info
    where id = 1
    limit 1
  `);

  return result.rows[0] ?? null;
}