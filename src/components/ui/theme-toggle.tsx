"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  const observer = new MutationObserver(() => {
    for (const notify of listeners) notify();
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => {
    listeners.delete(listener);
    observer.disconnect();
  };
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("sumi-theme", next ? "dark" : "light");
    } catch {
      // Penyimpanan tidak tersedia; tema tetap berubah untuk sesi ini.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Aktifkan tema terang" : "Aktifkan tema gelap"}
      aria-pressed={dark}
      className={cn(
        "grid size-9 place-items-center rounded-[3px] border border-line text-ink-muted transition-colors duration-300 hover:border-line-strong hover:text-ink",
        className,
      )}
    >
      <Sun className="hidden size-4 dark:block" strokeWidth={1.4} aria-hidden="true" />
      <Moon className="size-4 dark:hidden" strokeWidth={1.4} aria-hidden="true" />
    </button>
  );
}
