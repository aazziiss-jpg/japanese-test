import { ArrowUpRight, TriangleAlert } from "lucide-react";

export function SupabaseSetupNotice() {
  return (
    <div className="mt-8 border border-line bg-paper-raised p-4">
      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
        <TriangleAlert className="size-3.5" strokeWidth={1.6} aria-hidden="true" />
        Belum dikonfigurasi
      </p>

      <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
        Isi kunci proyek Supabase di{" "}
        <code className="rounded-[2px] bg-paper-sunken px-1 py-0.5 font-mono text-[11px] text-ink">
          .env.local
        </code>
        , lalu jalankan ulang server pengembangan.
      </p>

      <pre className="mt-3 overflow-x-auto border border-line bg-paper px-3 py-2.5 font-mono text-[10.5px] leading-relaxed text-ink-soft">
        <code>{`NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...`}</code>
      </pre>

      <a
        href="https://supabase.com/dashboard"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-1 text-[12px] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
      >
        Buka dashboard Supabase
        <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
      </a>
    </div>
  );
}
