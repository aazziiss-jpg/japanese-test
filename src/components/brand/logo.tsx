import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/landing";

export function Logo({
  className,
  showWordmark = true,
  href = "/",
}: {
  className?: string;
  showWordmark?: boolean;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 focus-visible:outline-offset-4",
        className,
      )}
      aria-label={`${site.name} — beranda`}
    >
      <span className="relative grid size-8 place-items-center border border-ink bg-ink text-paper transition-transform duration-500 ease-[var(--ease-sumi)] group-hover:-rotate-3">
        <span className="font-serif-jp text-[15px] leading-none">{site.mark}</span>
        <span
          className="absolute inset-[3px] border border-paper/25"
          aria-hidden="true"
        />
      </span>
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-medium tracking-[-0.02em]">
            {site.name}
          </span>
          <span className="mt-0.5 font-jp text-[9px] tracking-[0.32em] text-ink-muted">
            {site.reading}
          </span>
        </span>
      ) : null}
    </Link>
  );
}

export function Hanko({
  mark = "済",
  className,
}: {
  mark?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-12 rotate-[-4deg] place-items-center rounded-[3px] bg-accent text-accent-foreground shadow-[inset_0_0_0_2px_rgba(255,255,255,0.18)]",
        className,
      )}
    >
      <span className="font-serif-jp text-[22px] leading-none">{mark}</span>
    </span>
  );
}
