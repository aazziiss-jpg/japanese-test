"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Eye, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reviewIntervals, reviewQueue } from "@/data/preview";
import { cn } from "@/lib/cn";
import { EASE_SUMI } from "@/lib/motion";

export function ReviewSession() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [rating, setRating] = useState<string | null>(null);

  const card = reviewQueue[index % reviewQueue.length];
  const remaining = Math.max(1, reviewQueue.length - index);

  const rate = (label: string, detail: string) => {
    setRating(`${label} · berikutnya ${detail}`);
    window.setTimeout(() => {
      setIndex((value) => value + 1);
      setRevealed(false);
      setRating(null);
    }, 520);
  };

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
        <span>Ulangi · N5</span>
        <span>{remaining} kartu tersisa</span>
      </div>

      <div className="relative flex min-h-[340px] flex-col justify-between border border-line bg-paper-raised p-6 sm:p-10">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-muted">
            {card.type}
          </span>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:text-ink"
            aria-label="Putar pelafalan (contoh)"
          >
            <Volume2 className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
          <span className="font-mono text-[10px] tracking-[0.2em] text-ink-faint">
            {revealed ? card.reading : "　"}
          </span>
          <span className="font-serif-jp text-[clamp(4rem,14vw,7rem)] leading-none">
            {card.term}
          </span>

          <div className="h-8">
            <AnimatePresence mode="wait">
              {revealed ? (
                <motion.p
                  key="meaning"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_SUMI }}
                  className="text-[14px] text-ink-soft"
                >
                  {card.meaning}
                </motion.p>
              ) : (
                <motion.div
                  key="hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="h-2 w-24 bg-line" aria-hidden="true" />
                  <span className="h-2 w-12 bg-line" aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {revealed ? (
            <motion.div
              key="ratings"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_SUMI }}
              className="grid grid-cols-2 gap-2 sm:grid-cols-4"
            >
              {reviewIntervals.map((interval) => (
                <button
                  key={interval.label}
                  type="button"
                  onClick={() => rate(interval.label, interval.detail)}
                  className={cn(
                    "flex flex-col items-center gap-1 border px-2 py-3 text-[11px] transition-colors duration-300",
                    interval.tone === "ink"
                      ? "border-ink bg-ink text-paper hover:bg-ink-soft"
                      : "border-line text-ink hover:border-ink",
                  )}
                >
                  <span className="font-medium">{interval.label}</span>
                  <span
                    className={cn(
                      "font-mono text-[9px]",
                      interval.tone === "ink" ? "text-paper/60" : "text-ink-faint",
                    )}
                  >
                    {interval.detail}
                  </span>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <Button size="md" onClick={() => setRevealed(true)} className="w-full sm:w-auto">
                <Eye className="size-4" strokeWidth={1.5} />
                Tampilkan jawaban
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {rating ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 border-t border-line bg-paper-raised py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted"
            >
              <RotateCcw className="size-3" strokeWidth={1.5} />
              {rating}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
          FSRS · 4 pilihan · tanpa menebak
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
          retensi 92%
        </p>
      </div>
    </div>
  );
}
