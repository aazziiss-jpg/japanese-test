"use client";

import { useCallback, useRef, useState } from "react";
import { Eye, Lightbulb, RotateCcw } from "lucide-react";
import { StrokeCanvas, type StrokeCanvasHandle } from "@/components/handwriting/stroke-canvas";
import { GLYPHS, GLYPH_ORDER } from "@/lib/handwriting/strokes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function WritingLab() {
  const [glyphKey, setGlyphKey] = useState<string>("a");
  const [progress, setProgress] = useState({ done: 0, total: 3, accuracy: 0 });
  const canvas = useRef<StrokeCanvasHandle>(null);
  const glyph = GLYPHS[glyphKey];

  const handleProgress = useCallback(
    (done: number, total: number, accuracy: number) => {
      setProgress({ done, total, accuracy });
    },
    [],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex flex-col border border-line bg-paper-raised">
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
          <div className="flex items-center gap-1">
            {GLYPH_ORDER.map((key) => {
              const item = GLYPHS[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setGlyphKey(key);
                    setProgress({ done: 0, total: item.strokes.length, accuracy: 0 });
                  }}
                  aria-pressed={glyphKey === key}
                  className={cn(
                    "grid size-9 place-items-center font-serif-jp text-lg transition-colors",
                    glyphKey === key
                      ? "bg-ink text-paper"
                      : "text-ink-muted hover:bg-ink/[0.05] hover:text-ink",
                  )}
                >
                  {item.char}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 px-2.5 text-[11px]"
              onClick={() => canvas.current?.hint()}
            >
              <Lightbulb className="size-3.5" strokeWidth={1.5} />
              Petunjuk
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 px-2.5 text-[11px]"
              onClick={() => canvas.current?.revealAll()}
            >
              <Eye className="size-3.5" strokeWidth={1.5} />
              Contoh
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 px-2.5 text-[11px]"
              onClick={() => canvas.current?.reset()}
            >
              <RotateCcw className="size-3.5" strokeWidth={1.5} />
              Ulang
            </Button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <StrokeCanvas
            key={glyphKey}
            ref={canvas}
            glyph={glyph}
            autoHintDelay={12000}
            showCounter={false}
            onProgress={handleProgress}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-4 py-3">
          <div className="flex items-center gap-2">
            {Array.from({ length: glyph.strokes.length }).map((_, index) => (
              <span
                key={index}
                className={cn(
                  "h-6 w-1.5 transition-colors",
                  index < progress.done ? "bg-ink" : "bg-line",
                )}
              />
            ))}
            <span className="ml-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
              {progress.done}/{glyph.strokes.length} goresan
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
            <span>
              Akurasi{" "}
              <span className="text-ink">
                {progress.accuracy ? `${progress.accuracy}%` : "—"}
              </span>
            </span>
            <span className="hidden sm:inline">Lokal · tanpa kirim gambar</span>
          </div>
        </div>
      </div>

      <aside className="flex flex-col gap-4">
        <div className="border border-line bg-paper-raised">
          <div className="border-b border-line px-4 py-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
              Karakter
            </span>
          </div>
          <div className="flex flex-col gap-5 p-4">
            <div className="flex items-end justify-between">
              <span className="font-serif-jp text-[5rem] leading-none">
                {glyph.char}
              </span>
              <div className="flex flex-col items-end gap-1 pb-1">
                <span className="font-mono text-[11px] tracking-[0.14em]">
                  {glyph.romaji}
                </span>
                <span className="font-jp text-[11px] text-ink-muted">
                  {glyph.readings.join(" · ")}
                </span>
              </div>
            </div>

            <dl className="flex flex-col gap-2 border-t border-line pt-4 text-[11.5px]">
              <div className="flex justify-between">
                <dt className="text-ink-muted">Jumlah goresan</dt>
                <dd className="font-mono">{glyph.strokes.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Arti</dt>
                <dd>{glyph.meaning}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Tingkat</dt>
                <dd className="font-mono text-[10px] uppercase tracking-[0.1em]">
                  N5
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="border border-line p-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
            Cara membaca umpan balik
          </span>
          <ul className="mt-3 flex flex-col gap-3 text-[11.5px] leading-relaxed text-ink-muted">
            <li className="flex gap-2.5">
              <span className="mt-1.5 size-1.5 shrink-0 bg-ink" />
              Goresan dinilai dari titik awal, arah, panjang, dan bentuk — bukan
              kecepatan.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-1.5 size-1.5 shrink-0 bg-accent" />
              Goresan yang meleset ditandai vermilion dan bisa diulang tanpa
              kehilangan nyawa.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-1.5 size-1.5 shrink-0 border border-line-strong" />
              Panduan tipis selalu terlihat; petunjuk penuh muncul setelah 12
              detik diam.
            </li>
          </ul>
        </div>

        <div className="border border-line bg-paper-sunken p-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
            Catatan desain
          </span>
          <p className="mt-2 text-[11.5px] leading-relaxed text-ink-muted">
            Kanvas memakai dua lapis: panduan dari KanjiVG dan tinta kanvas
            dengan tekanan. Validasi berjalan lokal — tidak ada gambar yang
            dikirim ke server.
          </p>
        </div>
      </aside>
    </div>
  );
}
