"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/ui/section";
import { habit } from "@/content/landing";
import { cn } from "@/lib/cn";
import { EASE_SUMI } from "@/lib/motion";

const TOTAL_DAYS = 35;
const START = TOTAL_DAYS - habit.streak.days;

export function HabitSection() {
  const reduced = useReducedMotion();
  const xpPercent = Math.round((habit.xp.current / habit.xp.target) * 100);

  return (
    <Section id="kebiasaan" className="border-t border-line">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading
              eyebrow={habit.eyebrow}
              title={habit.title}
              description={habit.description}
            />
          </Reveal>

          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {habit.badges.map((badge, index) => (
              <Reveal key={badge.title} delay={index * 0.05}>
                <div className="group flex h-full items-center gap-4 bg-paper p-4 transition-colors duration-500 hover:bg-paper-raised">
                  <span className="grid size-12 shrink-0 place-items-center border border-line-strong font-serif-jp text-xl transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                    {badge.mark}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-medium">{badge.title}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">
                      {badge.note}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="max-w-sm text-[12.5px] leading-relaxed text-ink-faint">
              Tidak ada nyawa yang habis dan tidak ada hukuman karena melewatkan
              sehari. Streak bisa dibekukan sekali per bulan.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="border border-line bg-paper-raised">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="grid size-6 place-items-center border border-ink bg-ink font-mono text-[10px] text-paper">
                  {habit.xp.level}
                </span>
                <span className="text-[13px] font-medium">{habit.xp.title}</span>
              </div>
              <span className="font-mono text-[10px] tabular text-ink-muted">
                {habit.xp.current.toLocaleString("id-ID")} /{" "}
                {habit.xp.target.toLocaleString("id-ID")} XP
              </span>
            </div>

            <div className="h-[3px] w-full bg-line" aria-hidden="true">
              <motion.div
                className="h-full bg-ink"
                initial={reduced ? { width: `${xpPercent}%` } : { width: 0 }}
                whileInView={{ width: `${xpPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: EASE_SUMI, delay: 0.2 }}
              />
            </div>

            <div className="flex flex-col gap-6 px-5 py-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                    {habit.streak.week}
                  </span>
                  <span className="font-mono text-[10px] tabular text-ink-muted">
                    terbaik {habit.streak.best} hari
                  </span>
                </div>
                <div className="flex items-center justify-between gap-5">
                  <div className="grid shrink-0 grid-cols-7 gap-1" aria-hidden="true">
                    {Array.from({ length: TOTAL_DAYS }).map((_, index) => {
                      const active = index >= START;
                      const isToday = index === TOTAL_DAYS - 1;
                      return (
                        <motion.span
                          key={index}
                          initial={reduced ? undefined : { opacity: 0, scale: 0.8 }}
                          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.008,
                            ease: EASE_SUMI,
                          }}
                          className={cn(
                            "size-4",
                            active ? "bg-ink" : "bg-line",
                            isToday &&
                              "ring-1 ring-accent ring-offset-1 ring-offset-paper-raised",
                          )}
                        />
                      );
                    })}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-[2rem] leading-none tabular">
                      {habit.streak.days}
                    </span>
                    <span className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-faint">
                      hari berturut
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink-faint">
                  <span>5 minggu lalu</span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block size-1.5 bg-accent" /> hari ini
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-line pt-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                  Misi hari ini
                </span>
                {habit.quests.map((quest) => {
                  const percent = Math.round((quest.progress / quest.target) * 100);
                  return (
                    <div key={quest.label} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-[12.5px]">
                          {quest.done ? (
                            <Check
                              className="size-3.5 text-ink"
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          ) : (
                            <span
                              className="size-3.5 border border-line-strong"
                              aria-hidden="true"
                            />
                          )}
                          {quest.label}
                        </span>
                        <span className="font-mono text-[9.5px] tabular text-ink-faint">
                          {quest.progress}/{quest.target} · +{quest.xp} XP
                        </span>
                      </div>
                      <div className="h-px w-full bg-line" aria-hidden="true">
                        <div
                          className={cn("h-full", quest.done ? "bg-ink" : "bg-ink-muted")}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
