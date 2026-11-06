"use client";

import { useCallback, useRef, useState } from "react";
import { Eye, Lightbulb, RotateCcw } from "lucide-react";
import {
  StrokeCanvas,
  type StrokeCanvasHandle,
} from "@/components/handwriting/stroke-canvas";
import { KANA_STROKE_PATHS } from "@/lib/handwriting/kana-strokes";
import type { Glyph } from "@/lib/handwriting/strokes";
import {
  hiraganaRows,
  katakanaRows,
  type KanaCharacter,
} from "@/data/preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type ChapterId = "n5" | "n4";
type SectionId = "hiragana" | "katakana";

const chapters = [
  { id: "n5", label: "N5", title: "Dasar", caption: "Hiragana & katakana" },
  {
    id: "n4",
    label: "N4",
    title: "Pemantapan",
    caption: "Presisi & kecepatan",
  },
] as const;

const sections = [
  {
    id: "hiragana",
    mark: "あ",
    label: "Hiragana",
    rows: hiraganaRows,
  },
  {
    id: "katakana",
    mark: "ア",
    label: "Katakana",
    rows: katakanaRows,
  },
] as const;

const vowels = new Set(["a", "i", "u", "e", "o"]);

function buildGlyph(character: KanaCharacter): Glyph {
  return {
    char: character.kana,
    romaji: character.romaji,
    meaning: vowels.has(character.romaji)
      ? "Vokal dasar"
      : `Suku kata ${character.romaji}`,
    readings: [character.kana],
    strokes: KANA_STROKE_PATHS[character.kana] ?? [],
  };
}

const KANA_GLYPHS: Record<string, Glyph> = Object.fromEntries(
  [...hiraganaRows, ...katakanaRows].flatMap((row) =>
    row.characters.map((character) => [character.kana, buildGlyph(character)]),
  ),
);

export function WritingLab() {
  const [chapterId, setChapterId] = useState<ChapterId>("n5");
  const [sectionId, setSectionId] = useState<SectionId>("hiragana");
  const [kana, setKana] = useState(hiraganaRows[0].characters[0].kana);
  const [progress, setProgress] = useState({ done: 0, total: 3, accuracy: 0 });
  const canvas = useRef<StrokeCanvasHandle>(null);

  const chapter =
    chapters.find((item) => item.id === chapterId) ?? chapters[0];
  const section =
    sections.find((item) => item.id === sectionId) ?? sections[0];
  const row =
    section.rows.find((item) =>
      item.characters.some((entry) => entry.kana === kana),
    ) ?? section.rows[0];
  const character =
    row.characters.find((item) => item.kana === kana) ?? row.characters[0];
  const glyph = KANA_GLYPHS[character.kana];

  const handleProgress = useCallback(
    (done: number, total: number, accuracy: number) => {
      setProgress({ done, total, accuracy });
    },
    [],
  );

  const selectCharacter = (nextCharacter: KanaCharacter) => {
    setKana(nextCharacter.kana);
    setProgress({
      done: 0,
      total: KANA_STROKE_PATHS[nextCharacter.kana]?.length ?? 0,
      accuracy: 0,
    });
  };

  const selectSection = (nextSection: (typeof sections)[number]) => {
    setSectionId(nextSection.id);
    selectCharacter(nextSection.rows[0].characters[0]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        className="grid grid-cols-2 gap-px border border-line bg-line"
        role="group"
        aria-label="Pilih bab"
      >
        {chapters.map((item) => {
          const selected = item.id === chapter.id;

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setChapterId(item.id)}
              className={cn(
                "flex flex-col justify-between gap-4 p-4 text-left transition-colors duration-300 sm:p-5",
                selected
                  ? "bg-ink text-paper"
                  : "bg-paper text-ink hover:bg-paper-raised",
              )}
            >
              <div className="flex w-full items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span
                    className={cn(
                      "font-mono text-[9px] uppercase tracking-[0.18em]",
                      selected ? "text-paper/50" : "text-ink-faint",
                    )}
                  >
                    {item.label}
                  </span>
                  <span className="text-[15px] font-medium tracking-[-0.01em]">
                    {item.title}
                  </span>
                  <span
                    className={cn(
                      "text-[10.5px] leading-relaxed",
                      selected ? "text-paper/50" : "text-ink-faint",
                    )}
                  >
                    {item.caption}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-serif-jp text-[30px] leading-none",
                    selected ? "text-paper/25" : "text-ink opacity-[0.14]",
                  )}
                >
                  {item.id === "n5" ? "五" : "四"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex flex-col gap-4">
          <div
            className="grid grid-cols-2 gap-px border border-line bg-line"
            role="group"
            aria-label="Pilih subbab huruf"
          >
            {sections.map((item) => {
              const selected = item.id === section.id;
              const total = item.rows.reduce(
                (count, entry) => count + entry.characters.length,
                0,
              );

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectSection(item)}
                  className={cn(
                    "flex items-center justify-between gap-3 p-4 text-left transition-colors duration-300",
                    selected
                      ? "bg-paper-raised"
                      : "bg-paper hover:bg-paper-raised",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center border font-serif-jp text-xl leading-none",
                        selected
                          ? "border-ink bg-ink text-paper"
                          : "border-line text-ink-muted",
                      )}
                    >
                      {item.mark}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-[13px] font-medium">
                        {item.label}
                      </span>
                      <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-faint">
                        {item.rows.length} baris · {total} huruf
                      </span>
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-3.5 rounded-full border",
                      selected ? "border-ink bg-ink" : "border-line-strong",
                    )}
                  />
                </button>
              );
            })}
          </div>

          {chapter.id === "n4" ? (
            <p className="border border-dashed border-line px-4 py-3 text-[11.5px] leading-relaxed text-ink-muted">
              Bab pemantapan memakai huruf yang sama. Fokus pada ketepatan titik
              awal, arah, dan panjang goresan tanpa panduan tambahan.
            </p>
          ) : null}

          <div className="border border-line bg-paper-raised">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                Huruf {section.label}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">
                {section.rows.length} baris · A–P
              </span>
            </div>

            <div className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-3">
              {section.rows.map((item) => (
                <div key={item.id} className="bg-paper-raised p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-faint">
                      {item.title}
                    </span>
                    <span className="font-mono text-[8.5px] tabular text-ink-faint">
                      {item.characters.length}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.characters.map((entry) => {
                      const selected = entry.kana === character.kana;

                      return (
                        <button
                          key={entry.kana}
                          type="button"
                          onClick={() => selectCharacter(entry)}
                          aria-pressed={selected}
                          aria-label={`${entry.kana} · ${entry.romaji}`}
                          className={cn(
                            "grid h-9 min-w-9 place-items-center border px-1.5 font-serif-jp text-base leading-none transition-colors duration-300",
                            selected
                              ? "border-ink bg-ink text-paper"
                              : "border-line text-ink hover:border-ink",
                          )}
                        >
                          {entry.kana}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col border border-line bg-paper-raised">
            <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="font-serif-jp text-lg leading-none">
                  {glyph.char}
                </span>
                <span className="font-mono text-[10px] tracking-[0.14em] text-ink-faint">
                  {glyph.romaji}
                </span>
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
                key={character.kana}
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
                <span className="hidden sm:inline">
                  Lokal · tanpa kirim gambar
                </span>
              </div>
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
                    {row.title}
                  </span>
                </div>
              </div>

              {character.note ? (
                <p className="border-l-2 border-accent pl-3 text-[11px] leading-relaxed text-ink-muted">
                  {character.note}
                </p>
              ) : null}

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
                  <dt className="text-ink-muted">Baris</dt>
                  <dd className="font-mono text-[10px] uppercase tracking-[0.1em]">
                    {row.label}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Tingkat</dt>
                  <dd className="font-mono text-[10px] uppercase tracking-[0.1em]">
                    {chapter.label}
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
                Goresan dinilai dari titik awal, arah, panjang, dan bentuk —
                bukan kecepatan.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 bg-accent" />
                Goresan yang meleset ditandai vermilion dan bisa diulang tanpa
                batas.
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
    </div>
  );
}
