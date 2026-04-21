import { pool } from "@/lib/db";

export async function ensureAdminsSchema() {
  try {
    // Create the admins table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.admins (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Check if the table has the expected columns
    await pool.query(`
      ALTER TABLE public.admins
      ADD COLUMN IF NOT EXISTS id SERIAL PRIMARY KEY;
    `);

    await pool.query(`
      ALTER TABLE public.admins
      ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
    `);

    await pool.query(`
      ALTER TABLE public.admins
      ADD COLUMN IF NOT EXISTS password_hash TEXT;
    `);

    await pool.query(`
      ALTER TABLE public.admins
      ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
    `);

    await pool.query(`
      ALTER TABLE public.admins
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
    `);

    await pool.query(`
      ALTER TABLE public.admins
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
    `);

    console.log("Admins table schema ensured");
  } catch (error) {
    console.error("Error ensuring admins schema:", error);
  }
}
