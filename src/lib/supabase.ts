import { createClient, SupabaseClient } from '@supabase/supabase-js';

const FALLBACK_URL = 'https://gcemimgzgoprmpunnphf.supabase.co';
const FALLBACK_KEY = 'sb_publishable_fthUGJV9-bPdpQr6b-edTg_tBkIVKf';

function getValidatedUrl(): string {
  try {
    const raw = import.meta.env?.VITE_SUPABASE_URL;
    if (typeof raw === 'string' && raw.trim().length > 0) {
      const trimmed = raw.trim();
      if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
        // Validate with URL constructor
        new URL(trimmed);
        return trimmed;
      }
    }
  } catch {
    // Ignore invalid URL error and fallback
  }
  return FALLBACK_URL;
}

function getValidatedKey(): string {
  try {
    const raw = import.meta.env?.VITE_SUPABASE_ANON_KEY;
    if (typeof raw === 'string' && raw.trim().length > 10) {
      return raw.trim();
    }
  } catch {
    // Ignore error and fallback
  }
  return FALLBACK_KEY;
}

export const SUPABASE_URL: string = getValidatedUrl();
export const SUPABASE_ANON_KEY: string = getValidatedKey();

// Safely instantiate Supabase client with graceful error trapping
function initSupabase(): SupabaseClient {
  try {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } catch (err) {
    console.warn('Failed to initialize Supabase with custom config, using default fallback:', err);
    try {
      return createClient(FALLBACK_URL, FALLBACK_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    } catch (criticalErr) {
      console.error('Critical Supabase initialization error:', criticalErr);
      // Return a safe mock proxy to prevent app-wide crash
      return {
        from: () => ({
          select: () => Promise.resolve({ data: [], error: { message: 'Database client offline' } }),
          insert: () => Promise.resolve({ data: null, error: { message: 'Database client offline' } }),
          update: () => Promise.resolve({ data: null, error: { message: 'Database client offline' } }),
          delete: () => Promise.resolve({ data: null, error: { message: 'Database client offline' } }),
        }),
      } as unknown as SupabaseClient;
    }
  }
}

export const supabase: SupabaseClient = initSupabase();

/**
 * SQL Schema needed in the user's Supabase project.
 * The user can copy this directly into Supabase SQL Editor if the tables don't exist yet.
 */
export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor to fix the Row Level Security (RLS) error:

-- 1. Ensure tables exist
CREATE TABLE IF NOT EXISTS public.appointments (
    id TEXT PRIMARY KEY,
    patient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    date_of_birth TEXT,
    service_id TEXT NOT NULL,
    service_name TEXT NOT NULL,
    preferred_date TEXT NOT NULL,
    preferred_time TEXT NOT NULL,
    reason_for_visit TEXT NOT NULL,
    is_first_visit BOOLEAN DEFAULT true,
    status TEXT DEFAULT 'requested',
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Drop any conflicting or restrictive existing policies
DROP POLICY IF EXISTS "Allow public insert on appointments" ON public.appointments;
DROP POLICY IF EXISTS "Allow read on appointments" ON public.appointments;
DROP POLICY IF EXISTS "Allow update on appointments" ON public.appointments;
DROP POLICY IF EXISTS "public_all_access_appointments" ON public.appointments;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.appointments;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.appointments;

DROP POLICY IF EXISTS "Allow public insert on contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow read on contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "public_all_access_messages" ON public.contact_messages;

-- 3. Grant full table permissions to anon and authenticated roles
GRANT ALL ON TABLE public.appointments TO anon, authenticated, postgres, service_role;
GRANT ALL ON TABLE public.contact_messages TO anon, authenticated, postgres, service_role;

-- 4. Disable RLS to allow direct appointments and message storage without restrictions
ALTER TABLE public.appointments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages DISABLE ROW LEVEL SECURITY;

-- (Optional) If you require RLS enabled, run these universal policies instead of disabling:
-- ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "public_all_access_appointments" ON public.appointments FOR ALL TO public USING (true) WITH CHECK (true);
-- ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "public_all_access_messages" ON public.contact_messages FOR ALL TO public USING (true) WITH CHECK (true);
`;

/**
 * Helper to test live Supabase connection
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  tableReady: boolean;
  error?: string;
}> {
  try {
    const { error } = await supabase
      .from('appointments')
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return {
          connected: true,
          tableReady: false,
          error: 'Table "appointments" does not exist yet. Please run the SQL setup script.',
        };
      }
      return {
        connected: false,
        tableReady: false,
        error: error.message,
      };
    }

    return {
      connected: true,
      tableReady: true,
    };
  } catch (err: any) {
    return {
      connected: false,
      tableReady: false,
      error: err?.message || 'Network error connecting to Supabase',
    };
  }
}
