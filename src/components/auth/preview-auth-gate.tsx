"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Pengganti penjagaan rute yang sebelumnya dilakukan proxy server. Di mode
 * static/Capacitor tidak ada middleware, jadi sesi diperiksa di browser.
 *
 * Petunjuk sesi disimpan terpisah supaya aplikasi tetap bisa dibuka saat
 * offline ketika token perlu disegarkan tetapi jaringan tidak tersedia.
 */
const SESSION_HINT = "sumi.auth.session";

type GateState = "checking" | "allowed";

function readHint() {
  try {
    return localStorage.getItem(SESSION_HINT) === "1";
  } catch {
    return false;
  }
}

function writeHint(value: boolean) {
  try {
    if (value) localStorage.setItem(SESSION_HINT, "1");
    else localStorage.removeItem(SESSION_HINT);
  } catch {
    // localStorage bisa diblokir; anggap tidak ada petunjuk.
  }
}

export function PreviewAuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<GateState>(
    isSupabaseConfigured ? "checking" : "allowed",
  );

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let active = true;
    const supabase = createClient();

    function allow() {
      if (!active) return;
      writeHint(true);
      setState("allowed");
    }

    function deny() {
      if (!active) return;
      writeHint(false);
      const next = pathname || "/preview";
      router.replace(`/login?next=${encodeURIComponent(next)}`);
    }

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        if (data.session) {
          allow();
          return;
        }

        // Token tidak bisa dimuat (mis. offline). Izinkan jika sesi pernah
        // valid di perangkat ini; konten tetap lokal dan tidak sensitif.
        if (readHint()) allow();
        else deny();
      })
      .catch(() => {
        if (readHint()) allow();
        else deny();
      });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") deny();
        else if (session) allow();
      },
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (state === "checking") {
    return (
      <div className="flex min-h-[50svh] flex-col items-center justify-center gap-3">
        <span className="size-2 animate-pulse bg-ink" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          Memeriksa sesi…
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
