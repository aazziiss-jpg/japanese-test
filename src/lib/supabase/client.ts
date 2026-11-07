import {
  createClient as createSupabaseClient,
  type SupabaseClient,
} from "@supabase/supabase-js";
import { requireSupabaseConfig } from "@/lib/supabase/config";

/**
 * Satu instance untuk seluruh aplikasi. Di mode static export tidak ada
 * server yang membaca cookie sesi, jadi sesi disimpan di localStorage
 * (default supabase-js) agar tetap hidup di WebView Capacitor dan browser.
 */
let client: SupabaseClient | null = null;

export function createClient() {
  if (!client) {
    const { url, key } = requireSupabaseConfig();
    client = createSupabaseClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "sumi.auth",
      },
    });
  }

  return client;
}
