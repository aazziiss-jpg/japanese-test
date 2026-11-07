"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const ENTERED_KEY = "sumi.native.entered";

/**
 * Di perangkat, aplikasi langsung masuk ke area belajar. Landing tetap bisa
 * dibuka lewat tautan "Kembali ke landing" setelah sesi aplikasi berjalan.
 */
export function NativeEntry() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") return;

    let active = true;

    async function enter() {
      const { Capacitor } = await import("@capacitor/core");
      if (!active || !Capacitor.isNativePlatform()) return;

      try {
        if (sessionStorage.getItem(ENTERED_KEY) === "1") return;
        sessionStorage.setItem(ENTERED_KEY, "1");
      } catch {
        // Tetap lanjut kalau storage diblokir.
      }

      router.replace("/preview/learn");
    }

    enter().catch(() => {});
    return () => {
      active = false;
    };
  }, [pathname, router]);

  return null;
}
