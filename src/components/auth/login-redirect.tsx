"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { nextPath } from "@/components/auth/next-path";

/** Kalau sesi masih aktif, halaman masuk tidak perlu ditampilkan. */
export function LoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let active = true;

    createClient()
      .auth.getSession()
      .then(({ data }) => {
        if (active && data.session) router.replace(nextPath());
      })
      .catch(() => {
        // Biarkan formulir tampil kalau sesi tidak bisa diperiksa.
      });

    return () => {
      active = false;
    };
  }, [router]);

  return null;
}
