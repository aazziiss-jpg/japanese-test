"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lightbulb, RotateCcw } from "lucide-react";
import { StrokeCanvas, type StrokeCanvasHandle } from "@/components/handwriting/stroke-canvas";
import { GLYPHS } from "@/lib/handwriting/strokes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { springStamp } from "@/lib/motion";

export function TraceDemo({
  glyphKey = "a",
  className,
  autoHintDelay = 9000,
}: {
  glyphKey?: string;
  className?: string;
  autoHintDelay?: number;
}) {
  const glyph = GLYPHS[glyphKey];
  const canvas = useRef<StrokeCanvasHandle>(null);
  const [progress, setProgress] = useState({ done: 0, total: glyph.strokes.length, accuracy: 0 });
  const [complete, setComplete] = useState(false);

  const handleProgress = useCallback(
    (done: number, total: number, accuracy: number) => {
      setProgress({ done, total, accuracy });
      if (done < total) setComplete(false);
    },
    [],
  );

  const handleReset = () => {
    setComplete(false);
    canvas.current?.reset();
  };

  return (
    <div
      className={cn(
        "relative flex flex-col border border-line bg-paper-raised",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          Latihan menulis
        </span>
        <span className="flex items-baseline gap-2 font-mono text-[10px] tracking-[0.18em] text-ink-faint">
          <span className="font-jp">{glyph.readings[0]}</span>
          <span className="text-ink-muted">/ {glyph.romaji}</span>
        </span>
      </div>

      <div className="relative px-4 pt-4 pb-2">
        <StrokeCanvas
          ref={canvas}
          glyph={glyph}
          autoHintDelay={autoHintDelay}
          onProgress={handleProgress}
          onComplete={() => setComplete(true)}
        />

        <AnimatePresence>
          {complete ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={springStamp}
              className="pointer-events-none absolute right-7 top-7 z-20 grid size-16 place-items-center rounded-[3px] border-2 border-accent/70 bg-paper/80 backdrop-blur-sm"
            >
              <span className="font-serif-jp text-[26px] leading-none text-accent">
                正
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="flex items-end justify-between gap-3 border-t border-line px-4 py-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {Array.from({ length: glyph.strokes.length }).map((_, index) => (
              <span
                key={index}
                className={cn(
                  "h-[3px] w-6 transition-colors duration-300",
                  index < progress.done ? "bg-ink" : "bg-line-strong",
                )}
              />
            ))}
          </div>
          <p className="max-w-[15rem] text-[11px] leading-relaxed text-ink-muted">
            {complete
              ? `Rapi. ${glyph.char} selesai dengan akurasi ${progress.accuracy}%.`
              : progress.done > 0
                ? "Bagus. Lanjutkan goresan berikutnya."
                : `Mulai dari goresan 1. Ikuti garis tipis.`}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="size-9 px-0"
            aria-label="Tampilkan petunjuk goresan"
            onClick={() => canvas.current?.hint()}
          >
            <Lightbulb className="size-4" strokeWidth={1.4} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="size-9 px-0"
            aria-label="Ulangi dari awal"
            onClick={handleReset}
          >
            <RotateCcw className="size-4" strokeWidth={1.4} />
          </Button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {progress.done} dari {progress.total} goresan selesai.
      </p>
    </div>
  );
}
