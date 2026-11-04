"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { senseiModes, senseiTranscript } from "@/data/preview";
import { cn } from "@/lib/cn";
import { EASE_SUMI } from "@/lib/motion";

const BARS = [8, 14, 22, 10, 28, 18, 34, 12, 26, 9, 20, 30, 14, 24, 8, 16, 28, 12];

export function SenseiStudio() {
  const [live, setLive] = useState(false);
  const [mode, setMode] = useState(0);

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="flex flex-col gap-4">
        <div className="border border-line bg-paper-raised">
          <div className="border-b border-line px-4 py-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
              Mode sesi
            </span>
          </div>
          <div className="flex flex-col p-2">
            {senseiModes.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setMode(index)}
                className={cn(
                  "flex flex-col gap-0.5 rounded-[3px] px-3 py-2.5 text-left transition-colors duration-300",
                  mode === index
                    ? "bg-ink text-paper"
                    : "text-ink-muted hover:bg-ink/[0.04] hover:text-ink dark:hover:bg-paper/[0.06]",
                )}
              >
                <span className="text-[12px]">{item.title}</span>
                <span
                  className={cn(
                    "font-mono text-[8.5px] uppercase tracking-[0.12em]",
                    mode === index ? "text-paper/50" : "text-ink-faint",
                  )}
                >
                  {item.note}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="border border-line p-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
            Konteks sensei
          </span>
          <ul className="mt-3 flex flex-col gap-2 text-[11px] text-ink-muted">
            <li className="flex justify-between">
              <span>Level</span>
              <span className="font-mono text-ink">N5</span>
            </li>
            <li className="flex justify-between">
              <span>Fokus</span>
              <span className="text-ink">Kata kerja ます</span>
            </li>
            <li className="flex justify-between">
              <span>Lemah</span>
              <span className="text-ink">partikel を</span>
            </li>
            <li className="flex justify-between">
              <span>Kuota hari ini</span>
              <span className="font-mono text-ink">3/5 mnt</span>
            </li>
          </ul>
        </div>
      </aside>

      <div className="flex flex-col gap-4">
        <div className="relative overflow-hidden border border-line bg-paper-raised">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  live ? "bg-accent" : "bg-line-strong",
                )}
              />
              {live ? "Mendengarkan" : "Siap"}
            </span>
            <span className="font-mono text-[9px] tabular text-ink-faint">00:42</span>
          </div>

          <div className="relative grid place-items-center px-6 py-10">
            <div className="relative grid size-56 place-items-center sm:size-64">
              <span className="absolute inset-0 rounded-full border border-line" />
              <span className="absolute inset-6 rounded-full border border-dashed border-line" />
              <AnimatePresence>
                {live ? (
                  <>
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1.35, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full border border-accent/40"
                    />
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0.35 }}
                      animate={{ scale: 1.2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.7,
                      }}
                      className="absolute inset-0 rounded-full border border-ink/30"
                    />
                  </>
                ) : null}
              </AnimatePresence>

              <span className="absolute top-4 font-mono text-[8px] uppercase tracking-[0.2em] text-ink-faint">
                AI
              </span>

              <button
                type="button"
                onClick={() => setLive((value) => !value)}
                aria-pressed={live}
                aria-label={live ? "Akhiri bicara" : "Mulai bicara"}
                className={cn(
                  "relative grid size-20 place-items-center rounded-full transition-[transform,background-color] duration-300 sm:size-24",
                  live
                    ? "bg-accent text-accent-foreground"
                    : "bg-ink text-paper hover:scale-[1.03]",
                )}
              >
                {live ? (
                  <MicOff className="size-7" strokeWidth={1.4} />
                ) : (
                  <Mic className="size-7" strokeWidth={1.4} />
                )}
              </button>
            </div>

            <div className="mt-8 flex h-10 items-center justify-center gap-[3px]" aria-hidden="true">
              {BARS.map((height, index) => (
                <span
                  key={index}
                  className={cn(
                    "w-[3px] bg-ink/30",
                    live && "animate-[wave_1.1s_ease-in-out_infinite] bg-ink/60",
                  )}
                  style={{
                    height: `${height}px`,
                    animationDelay: `${index * 55}ms`,
                  }}
                />
              ))}
            </div>

            <p className="mt-2 font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink-faint">
              {live ? "sedang mendengarkan · tekan untuk berhenti" : "tekan untuk mulai bicara"}
            </p>
          </div>
        </div>

        <div className="border border-line bg-paper-raised">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
              Transkrip
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-faint">
              <Volume2 className="size-3" strokeWidth={1.5} />
              Jepang · Indonesia
            </span>
          </div>
          <div className="flex flex-col gap-4 p-4 sm:p-5">
            {senseiTranscript.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE_SUMI, delay: index * 0.05 }}
                className={cn(
                  "flex flex-col gap-1",
                  line.role === "user" && "items-end text-right",
                )}
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-faint">
                  {line.role === "sensei" ? "Sensei" : "Kamu"}
                </span>
                <div
                  className={cn(
                    "max-w-[88%] px-3.5 py-2.5",
                    line.role === "sensei"
                      ? "border border-line bg-paper"
                      : "bg-ink text-paper",
                  )}
                >
                  <p className="font-jp text-[14px] leading-relaxed tracking-wide">
                    {line.jp}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-[10.5px] leading-relaxed",
                      line.role === "sensei" ? "text-ink-muted" : "text-paper/50",
                    )}
                  >
                    {line.id}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
