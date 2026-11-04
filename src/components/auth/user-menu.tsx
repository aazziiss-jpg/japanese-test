"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function UserMenu() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let active = true;

    createClient()
      .auth.getClaims()
      .then(({ data }) => {
        if (!active) return;
        const claim = data?.claims?.email;
        setEmail(typeof claim === "string" ? claim : null);
      })
      .catch(() => {
        // Email hanya pelengkap tampilan; sesi tetap divalidasi di proxy.
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleSignOut() {
    if (busy) return;
    setBusy(true);

    try {
      await createClient().auth.signOut();
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <div className="flex items-center gap-2">
      {email ? (
        <span
          className="hidden max-w-40 truncate text-[11px] text-ink-muted lg:block"
          title={email}
        >
          {email}
        </span>
      ) : null}

      <button
        type="button"
        onClick={handleSignOut}
        disabled={busy}
        aria-label="Keluar dari akun"
        title="Keluar"
        className="grid size-9 place-items-center rounded-[3px] border border-line text-ink-muted transition-colors duration-300 hover:border-line-strong hover:text-ink disabled:opacity-40"
      >
        <LogOut className="size-4" strokeWidth={1.4} aria-hidden="true" />
      </button>
    </div>
  );
}
