"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { getStroke } from "perfect-freehand";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import {
  GLYPH_SPACE,
  matchStroke,
  sampleStroke,
  type Glyph,
  type Point,
} from "@/lib/handwriting/strokes";

export type StrokeCanvasHandle = {
  reset: () => void;
  hint: () => void;
  revealAll: () => void;
};

type Props = {
  glyph: Glyph;
  className?: string;
  onProgress?: (done: number, total: number, accuracy: number) => void;
  onComplete?: () => void;
  autoHintDelay?: number;
  showCounter?: boolean;
};

const pathCache = new Map<string, Path2D>();

function toPath2D(d: string) {
  const cached = pathCache.get(d);
  if (cached) return cached;
  const path = new Path2D(d);
  pathCache.set(d, path);
  return path;
}

function outlineFromStroke(points: Point[]) {
  if (points.length < 2) return "";
  const stroke = getStroke(points, {
    size: 6.4,
    thinning: 0.52,
    smoothing: 0.62,
    streamline: 0.4,
    simulatePressure: true,
    last: true,
  });

  if (stroke.length === 0) return "";

  let d = `M ${stroke[0][0].toFixed(2)} ${stroke[0][1].toFixed(2)}`;
  for (let i = 1; i < stroke.length; i += 1) {
    const [x0, y0] = stroke[i - 1];
    const [x1, y1] = stroke[i];
    d += ` Q ${x0.toFixed(2)} ${y0.toFixed(2)} ${((x0 + x1) / 2).toFixed(2)} ${((y0 + y1) / 2).toFixed(2)}`;
  }
  d += " Z";
  return d;
}

type CanvasState = {
  completed: number;
  active: Point[];
  drawing: boolean;
  reveal: number;
  invalid: boolean;
  hintIndex: number;
  hintProgress: number;
};

export const StrokeCanvas = forwardRef<StrokeCanvasHandle, Props>(
  function StrokeCanvas(
    { glyph, className, onProgress, onComplete, autoHintDelay = 0, showCounter = true },
    ref,
  ) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const refs = useRef<Point[][]>([]);
    const colors = useRef({ ink: "#111111", guide: "#999999", accent: "#c8352b" });
    const reduceMotion = useReducedMotion();
    const reduceRef = useRef(false);
    const [status, setStatus] = useState<"idle" | "drawing" | "correct" | "wrong" | "done">(
      "idle",
    );
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [completedCount, setCompletedCount] = useState(0);
    const [ready, setReady] = useState(false);

    const onProgressRef = useRef(onProgress);
    const onCompleteRef = useRef(onComplete);
    onProgressRef.current = onProgress;
    onCompleteRef.current = onComplete;

    const state = useRef<CanvasState>({
      completed: 0,
      active: [],
      drawing: false,
      reveal: 1,
      invalid: false,
      hintIndex: -1,
      hintProgress: 0,
    });

    reduceRef.current = Boolean(reduceMotion);
    const total = glyph.strokes.length;

    const readColors = useCallback(() => {
      if (typeof window === "undefined") return;
      const styles = getComputedStyle(document.documentElement);
      colors.current = {
        ink: styles.getPropertyValue("--canvas-ink").trim() || "#111111",
        guide: styles.getPropertyValue("--canvas-guide").trim() || "#999999",
        accent: styles.getPropertyValue("--accent").trim() || "#c8352b",
      };
    }, []);

    const draw = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const cssSize = rect.width || 320;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const pixelSize = Math.round(cssSize * dpr);

      if (canvas.width !== pixelSize || canvas.height !== pixelSize) {
        canvas.width = pixelSize;
        canvas.height = pixelSize;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssSize, cssSize);
      ctx.save();
      ctx.scale(cssSize / GLYPH_SPACE, cssSize / GLYPH_SPACE);

      const { completed, active, reveal, invalid, hintIndex, hintProgress } =
        state.current;
      const { ink, guide, accent } = colors.current;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Panduan tipis untuk seluruh goresan.
      for (let index = 0; index < glyph.strokes.length; index += 1) {
        const path = toPath2D(glyph.strokes[index]);
        const isNext = index === completed;
        ctx.setLineDash(isNext ? [3.4, 3.4] : []);
        ctx.strokeStyle = invalid && isNext ? accent : guide;
        ctx.globalAlpha = isNext ? 0.6 : 0.24;
        ctx.lineWidth = isNext ? 2.6 : 2.2;
        ctx.stroke(path);
      }
      ctx.setLineDash([]);

      // Goresan yang sudah benar, dengan animasi sapuan.
      const samples = refs.current;
      for (let index = 0; index < completed; index += 1) {
        const points = samples[index];
        if (!points || points.length === 0) continue;
        const progress =
          index === completed - 1 && reveal < 1 ? reveal : 1;
        drawProgressive(ctx, points, progress, ink, 4.1);
      }

      // Petunjuk aktif.
      if (hintIndex >= 0 && hintIndex < glyph.strokes.length) {
        const points = samples[hintIndex];
        if (points && points.length) {
          drawProgressive(ctx, points, hintProgress, accent, 3.4);
        }
      }

      // Tinta yang sedang digambar.
      if (active.length > 1) {
        const outline = outlineFromStroke(active);
        if (outline) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = invalid ? accent : ink;
          ctx.fill(new Path2D(outline));
        }
      }

      ctx.restore();
      ctx.globalAlpha = 1;
    }, [glyph.strokes]);

    const reset = useCallback(() => {
      state.current = {
        completed: 0,
        active: [],
        drawing: false,
        reveal: 1,
        invalid: false,
        hintIndex: -1,
        hintProgress: 0,
      };
      setStatus("idle");
      setAccuracy(null);
      setCompletedCount(0);
      onProgressRef.current?.(0, glyph.strokes.length, 0);
      draw();
    }, [draw, glyph.strokes.length]);

    // Siapkan sampel referensi + warna + ukuran.
    useEffect(() => {
      refs.current = glyph.strokes.map((d) => sampleStroke(d));
      readColors();
      setReady(true);
      reset();
    }, [glyph, readColors, reset]);

    useEffect(() => {
      const observer = new ResizeObserver(() => draw());
      if (wrapRef.current) observer.observe(wrapRef.current);
      return () => observer.disconnect();
    }, [draw]);

    useEffect(() => {
      const observer = new MutationObserver(() => {
        readColors();
        draw();
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    }, [draw, readColors]);

    const runReveal = useCallback(
      (onDone?: () => void) => {
        if (reduceRef.current) {
          state.current.reveal = 1;
          draw();
          onDone?.();
          return;
        }

        const start = performance.now();
        const duration = 260;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          state.current.reveal = 1 - Math.pow(1 - t, 3);
          draw();
          if (t < 1) requestAnimationFrame(tick);
          else onDone?.();
        };
        requestAnimationFrame(tick);
      },
      [draw],
    );

    const hint = useCallback(() => {
      const index = state.current.completed;
      if (index >= glyph.strokes.length) return;

      if (reduceRef.current) {
        state.current.hintIndex = index;
        state.current.hintProgress = 1;
        draw();
        window.setTimeout(() => {
          state.current.hintIndex = -1;
          state.current.hintProgress = 0;
          draw();
        }, 900);
        return;
      }

      const start = performance.now();
      const duration = 900;
      state.current.hintIndex = index;
      state.current.hintProgress = 0;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        state.current.hintProgress = 1 - Math.pow(1 - t, 3);
        draw();
        if (t < 1) requestAnimationFrame(tick);
        else {
          window.setTimeout(() => {
            state.current.hintIndex = -1;
            state.current.hintProgress = 0;
            draw();
          }, 420);
        }
      };
      requestAnimationFrame(tick);
    }, [draw, glyph.strokes.length]);

    const revealAll = useCallback(() => {
      state.current.completed = glyph.strokes.length;
      state.current.active = [];
      state.current.reveal = 1;
      setStatus("done");
      setCompletedCount(glyph.strokes.length);
      draw();
      onProgressRef.current?.(glyph.strokes.length, glyph.strokes.length, accuracy ?? 100);
      onCompleteRef.current?.();
    }, [accuracy, draw, glyph.strokes.length]);

    useImperativeHandle(ref, () => ({ reset, hint, revealAll }), [
      reset,
      hint,
      revealAll,
    ]);

    const toSpace = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
      const canvas = event.currentTarget;
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * GLYPH_SPACE;
      const y = ((event.clientY - rect.top) / rect.height) * GLYPH_SPACE;
      return [
        Math.max(0, Math.min(GLYPH_SPACE, x)),
        Math.max(0, Math.min(GLYPH_SPACE, y)),
      ];
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (state.current.completed >= glyph.strokes.length) return;
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      state.current.drawing = true;
      state.current.active = [toSpace(event)];
      state.current.invalid = false;
      setStatus("drawing");
      draw();
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!state.current.drawing) return;
      event.preventDefault();
      const point = toSpace(event);
      const active = state.current.active;
      const last = active[active.length - 1];
      if (last && Math.hypot(point[0] - last[0], point[1] - last[1]) < 0.7) return;
      active.push(point);
      draw();
    };

    const finishStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!state.current.drawing) return;
      state.current.drawing = false;
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // Pointer sudah dilepas.
      }

      const active = state.current.active;
      state.current.active = [];

      if (active.length < 4) {
        setStatus("idle");
        draw();
        return;
      }

      const reference = refs.current[state.current.completed];
      if (!reference) {
        draw();
        return;
      }

      const result = matchStroke(active, reference);
      const nextAccuracy =
        accuracy === null ? result.score : Math.round((accuracy + result.score) / 2);
      setAccuracy(nextAccuracy);

      if (result.ok) {
        state.current.completed += 1;
        const done = state.current.completed >= glyph.strokes.length;
        state.current.reveal = reduceRef.current ? 1 : 0;
        setCompletedCount(state.current.completed);
        setStatus(done ? "done" : "correct");
        onProgressRef.current?.(
          state.current.completed,
          glyph.strokes.length,
          nextAccuracy,
        );
        if (done) {
          runReveal(() => onCompleteRef.current?.());
        } else {
          runReveal();
        }
      } else {
        state.current.invalid = true;
        state.current.reveal = 1;
        setStatus("wrong");
        draw();
        window.setTimeout(() => {
          state.current.invalid = false;
          setStatus("idle");
          draw();
        }, 520);
      }
    };

    useEffect(() => {
      if (!autoHintDelay) return;
      if (status !== "idle") return;
      const timer = window.setTimeout(() => hint(), autoHintDelay);
      return () => window.clearTimeout(timer);
    }, [autoHintDelay, hint, status]);

    return (
      <div
        ref={wrapRef}
        className={cn(
          "relative aspect-square w-full select-none",
          status === "wrong" && "animate-[shake_0.36s_ease-in-out]",
          className,
        )}
        data-status={status}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line" />
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-line" />
          <span className="absolute inset-3 border border-dashed border-line" />
        </div>

        <canvas
          ref={canvasRef}
          className="relative z-10 size-full touch-none"
          role="img"
          aria-label={`Kanvas latihan menulis karakter ${glyph.char}. Gambar goresan mengikuti panduan.`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishStroke}
          onPointerLeave={finishStroke}
          onPointerCancel={finishStroke}
        />

        {!ready ? (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-mono text-eyebrow uppercase text-ink-faint">
              memuat kanvas
            </span>
          </div>
        ) : null}

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-1 pb-0.5",
            !showCounter && "justify-end",
          )}
        >
          {showCounter ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
              {completedCount}/{total} goresan
            </span>
          ) : null}
          {status === "wrong" ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent"
            >
              coba lagi
            </motion.span>
          ) : status === "correct" ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted"
            >
              tepat
            </motion.span>
          ) : null}
        </div>
      </div>
    );
  },
);

function drawProgressive(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  progress: number,
  color: string,
  width: number,
) {
  if (points.length < 2 || progress <= 0) return;
  const limit = Math.max(2, Math.floor(points.length * Math.min(1, progress)));
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < limit; i += 1) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.globalAlpha = 1;
  ctx.stroke();
}
