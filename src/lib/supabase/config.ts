export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

export const isSupabaseConfigured =
  SUPABASE_URL.length > 0 && SUPABASE_KEY.length > 0;

/**
 * Dipakai hanya setelah `isSupabaseConfigured` dicek, supaya pesan errornya
 * jelas saat variabel lingkungan belum diisi.
 */
export function requireSupabaseConfig() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (atau NEXT_PUBLIC_SUPABASE_ANON_KEY) di .env.local.",
    );
  }

  return { url: SUPABASE_URL, key: SUPABASE_KEY };
}
