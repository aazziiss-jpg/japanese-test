import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AuthPanel } from "@/components/auth/auth-panel";
import { SupabaseSetupNotice } from "@/components/auth/supabase-setup-notice";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Masuk atau Daftar",
  description:
    "Masuk atau buat akun Sumi untuk melanjutkan pelajaran, ulangan, dan latihan menulis.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-ink p-10 text-paper lg:flex xl:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-28 select-none font-serif-jp text-[26rem] leading-none text-paper/[0.06]"
        >
          墨
        </div>

        <Link
          href="/"
          className="relative inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60 transition-colors hover:text-paper"
        >
          ← Beranda
        </Link>

        <div className="relative max-w-sm">
          <p className="font-serif-jp text-2xl leading-snug">毎日、一つずつ。</p>
          <p className="mt-4 text-[14px] leading-[1.8] text-paper/70">
            Setiap hari, satu langkah. Goresan, kartu, dan kalimat kecil yang
            menumpuk menjadi kebiasaan.
          </p>
        </div>

        <div className="relative flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/45">
          <span className="size-1.5 bg-accent" aria-hidden="true" />
          JLPT N5 — N4
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between px-5 sm:px-8">
          <Logo />
          <ThemeToggle />
        </header>

        <main id="main" className="flex flex-1 items-center px-5 pb-16 pt-6 sm:px-8">
          <div className="mx-auto w-full max-w-sm">
            {isSupabaseConfigured ? (
              <>
                <AuthPanel />
                <p className="mt-6 border-t border-line pt-5 text-[12px] leading-relaxed text-ink-faint">
                  Akses pembelajaran hanya terbuka setelah masuk. Akun dikelola
                  melalui Supabase Auth.
                </p>
              </>
            ) : (
              <>
                <p className="font-mono text-eyebrow uppercase text-ink-muted">
                  アカウント · Akun
                </p>
                <h1 className="mt-4 text-title">Selamat datang kembali.</h1>
                <p className="mt-3 text-pretty text-[14px] leading-[1.75] text-ink-muted">
                  Masuk untuk melanjutkan pelajaran, ulangan, dan sesi menulismu.
                </p>
                <SupabaseSetupNotice />
              </>
            )}
          </div>
        </main>

        <footer className="px-5 pb-8 sm:px-8">
          <Link
            href="/"
            className="mx-auto block w-full max-w-sm text-[12px] text-ink-muted transition-colors hover:text-ink"
          >
            ← Kembali ke beranda
          </Link>
        </footer>
      </div>
    </div>
  );
}
