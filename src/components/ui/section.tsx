"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE_SUMI } from "@/lib/motion";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  once = true,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduced ? undefined : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.6, ease: EASE_SUMI, delay }}
    >
      {children}
    </Component>
  );
}

export function Eyebrow({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-eyebrow uppercase text-ink-muted",
        className,
      )}
    >
      <span className="inline-block size-1.5 bg-accent" aria-hidden="true" />
      {index ? <span className="text-ink-faint">{index}</span> : null}
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-2xl text-balance text-display">{title}</h2>
      {description ? (
        <p className="max-w-xl text-pretty text-[15px] leading-[1.75] text-ink-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 px-5 py-20 sm:px-8 md:py-28 lg:py-32",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
