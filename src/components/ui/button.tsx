import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] font-medium tracking-[-0.01em] transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-sumi)] disabled:pointer-events-none disabled:opacity-40 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink-soft dark:hover:bg-ink-soft",
  outline:
    "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
  ghost: "text-ink-muted hover:bg-ink/[0.04] hover:text-ink dark:hover:bg-paper/[0.06]",
  accent:
    "bg-accent text-accent-foreground hover:brightness-[1.06]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-7 text-[15px]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props} />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link
      href={href}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {children}
    </Link>
  );
}

export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        "size-4 transition-transform duration-300 ease-[var(--ease-sumi)] group-hover:translate-x-0.5",
        className,
      )}
    >
      <path
        d="M3 8h9.5M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
