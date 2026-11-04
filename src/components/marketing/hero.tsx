"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink, ArrowGlyph } from "@/components/ui/button";
import { TraceDemo } from "@/components/marketing/trace-demo";
import { Eyebrow } from "@/components/ui/section";
import { hero, stats } from "@/content/landing";
import { EASE_SUMI } from "@/lib/motion";

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const reduced = useReducedMotion();
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now() + 320;
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.max(0, Math.min(1, (now - start) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimated(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, value]);

  const display = reduced ? value : animated;

  return (
    <span className="tabular">
      {display.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 md:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-24 select-none font-serif-jp text-[22rem] leading-none text-ink opacity-[0.025] sm:text-[38rem] sm:opacity-[0.03] lg:-right-8 lg:text-[46rem]"
      >
        あ
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-7">
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_SUMI }}
            >
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </motion.div>

            <h1 className="text-balance text-hero">
              {hero.title.map((line, index) => (
                <motion.span
                  key={line}
                  className="block"
                  initial={reduced ? undefined : { opacity: 0, y: 22 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.65,
                    ease: EASE_SUMI,
                    delay: 0.06 + index * 0.08,
                  }}
                >
                  {index === 1 ? (
                    <span className="relative inline-block">
                      {line}
                      <svg
                        viewBox="0 0 320 12"
                        fill="none"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-2.5 w-full text-accent"
                      >
                        <motion.path
                          d="M2 8.5C62 3.2 128 2.4 196 4.6c40 1.3 78 3 122 1.2"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          initial={reduced ? undefined : { pathLength: 0 }}
                          animate={reduced ? undefined : { pathLength: 1 }}
                          transition={{ duration: 1.1, ease: EASE_SUMI, delay: 0.75 }}
                        />
                      </svg>
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="max-w-md text-pretty text-[15px] leading-[1.75] text-ink-muted"
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_SUMI, delay: 0.24 }}
            >
              {hero.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_SUMI, delay: 0.3 }}
            >
              <ButtonLink href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
                <ArrowGlyph />
              </ButtonLink>
              <ButtonLink
                href={hero.secondaryCta.href}
                variant="outline"
                size="lg"
              >
                {hero.secondaryCta.label}
              </ButtonLink>
            </motion.div>

            <motion.p
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint"
              initial={reduced ? undefined : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {hero.note}
            </motion.p>
          </div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 26 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_SUMI, delay: 0.16 }}
            className="relative"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                Coba sendiri
              </span>
              <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint sm:flex">
                mouse atau jari
                <span className="inline-block h-px w-8 bg-line-strong" />
              </span>
            </div>
            <TraceDemo />
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 -z-10 size-full border border-line"
            />
          </motion.div>
        </div>

        <div className="mt-16 border-t border-line pt-8 pb-14 sm:mt-20 md:mt-24">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  {stat.label}
                </dt>
                <dd className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-medium leading-none tracking-[-0.04em]">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
