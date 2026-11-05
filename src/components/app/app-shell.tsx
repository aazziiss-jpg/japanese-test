"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  House,
  Layers,
  Mic,
  Pencil,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { cn } from "@/lib/cn";

const items = [
  { href: "/preview/learn", label: "Belajar", icon: BookOpen },
  { href: "/preview/writing", label: "Menulis", icon: Pencil },
  { href: "/preview/review", label: "Ulangi", icon: Layers },
  { href: "/preview/sensei", label: "Sensei", icon: Mic },
  { href: "/preview/profile", label: "Profil", icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-svh">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Logo showWordmark={false} />
            <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
            <Link
              href="/"
              className="hidden items-center gap-1.5 text-[11px] text-ink-muted transition-colors hover:text-ink sm:flex"
            >
              <ArrowLeft className="size-3.5" strokeWidth={1.5} />
              Kembali ke landing
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-line px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink-faint sm:block">
              Mode pratinjau · data contoh
            </span>
            <Link
              href="/preview"
              className="grid size-9 place-items-center rounded-[3px] border border-line text-ink-muted transition-colors hover:text-ink md:hidden"
              aria-label="Daftar layar pratinjau"
            >
              <House className="size-4" strokeWidth={1.4} />
            </Link>
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl pt-14">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-56 shrink-0 flex-col justify-between border-r border-line px-4 py-7 md:flex">
          <nav className="flex flex-col gap-1" aria-label="Navigasi aplikasi">
            {items.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-[3px] px-3 py-2.5 text-[13px] transition-colors duration-300",
                    active
                      ? "bg-ink text-paper"
                      : "text-ink-muted hover:bg-ink/[0.04] hover:text-ink dark:hover:bg-paper/[0.06]",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.5} />
                  {item.label}
                  {active ? (
                    <span className="ml-auto size-1 bg-accent" aria-hidden="true" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-4 pb-28 pt-6 sm:px-6 md:px-8 md:pb-16 md:pt-10">
          {children}
        </main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/95 backdrop-blur-xl md:hidden"
        aria-label="Navigasi bawah"
      >
        <div className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
          {items.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 rounded-[3px] py-2 text-[9px] uppercase tracking-[0.1em] transition-colors",
                  active ? "text-ink" : "text-ink-faint",
                )}
              >
                <Icon className="size-[18px]" strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function PreviewHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
      <div className="flex flex-col gap-2">
        {eyebrow ? (
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="text-balance text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-[1.08] tracking-[-0.03em]">
          {title}
        </h1>
        {description ? (
          <p className="max-w-xl text-[13px] text-ink-muted">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

const statIcons = {
  layers: Layers,
  target: Target,
  sparkles: Sparkles,
} as const;

export type MiniStatIcon = keyof typeof statIcons;

export function MiniStat({
  icon,
  label,
  value,
  accent,
}: {
  icon: MiniStatIcon;
  label: string;
  value: string;
  accent?: boolean;
}) {
  const Icon = statIcons[icon];
  return (
    <div className="flex items-center gap-3 border border-line bg-paper-raised px-3.5 py-2.5">
      <Icon
        className={cn("size-4", accent ? "text-accent" : "text-ink-muted")}
        strokeWidth={1.5}
      />
      <div className="flex flex-col">
        <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-faint">
          {label}
        </span>
        <span className="font-mono text-[12px] tabular leading-tight text-ink">
          {value}
        </span>
      </div>
    </div>
  );
}
