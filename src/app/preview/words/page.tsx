"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { MiniStat, PreviewHeader } from "@/components/app/app-shell";
import { vocabularyWords } from "@/data/preview";
import { cn } from "@/lib/cn";

const CATEGORIES = [
  { key: "all", label: "Semua" },
  { key: "Kata Kerja", label: "Kata Kerja" },
  { key: "Kata Nama", label: "Kata Nama" },
  { key: "Kata Penyebutan", label: "Kata Penyebutan" },
  { key: "Adjektiva", label: "Adjektiva" },
] as const;

export default function WordsPage() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]["key"]>("all");

  const filteredWords =
    activeCategory === "all"
      ? vocabularyWords
      : vocabularyWords.filter((w) => w.category === activeCategory);

  const groupByCategory = (words: typeof vocabularyWords) => {
    const acc: Record<string, typeof vocabularyWords> = {};
    words.forEach((w) => {
      (acc[w.category] ??= []).push(w);
    });
    return acc;
  };

  const grouped = activeCategory === "all" 
    ? groupByCategory(vocabularyWords) 
    : { [activeCategory]: filteredWords };

  return (
    <div>
      <PreviewHeader
        eyebrow="Kosakata N5"
        title="Kosakata sebelum lupa."
        description={
          activeCategory === "all"
            ? `Semua ${vocabularyWords.length} kosakata difilter menurut kategori.`
            : `${filteredWords.length} kosakata dalam kategori ${activeCategory}.`
        }
        action={
          <div className="flex flex-wrap gap-2">
            <MiniStat icon="layers" label="Total kata" value={String(vocabularyWords.length)} accent />
            <MiniStat icon="target" label="Kategori" value={String(CATEGORIES.length - 1)} />
          </div>
        }
      />

      {/* Category shortcut buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActiveCategory(cat.key)}
            aria-pressed={activeCategory === cat.key}
            className={cn(
              "flex items-center gap-2 rounded-[3px] border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition-all duration-200",
              activeCategory === cat.key
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink-muted hover:border-ink hover:text-ink hover:bg-paper-raised",
            )}
          >
            <span className="font-mono">{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <main className="flex flex-col gap-10">
          {Object.entries(grouped).map(([category, words]) => (
            <section key={category} id={category.replace(/\s+/g, "-").toLowerCase()}>
              <div className="mb-4 flex items-baseline gap-3 border-b border-line pb-2">
                <h2 className="text-[15px] font-medium tracking-[-0.01em]">
                  {category}
                </h2>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">
                  {words.length} unit
                </span>
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2">
                {words.map((card) => (
                  <article 
                    key={card.id} 
                    className="flex flex-col gap-2 border border-line bg-paper-raised p-4 transition-colors hover:border-ink/30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif-jp text-[20px] leading-tight text-ink">
                        {card.term}
                      </span>
                      <span className="font-mono text-[10px] text-ink-faint">
                        {card.reading}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-[13px] font-medium text-ink-soft">
                        {card.meaning}
                      </p>
                      {card.example && (
                        <p className="font-jp text-[11px] leading-relaxed text-ink-muted italic">
                          "{card.example}"
                        </p>
                      )}
                    </div>

                    <div className="mt-2 flex items-center justify-between border-t border-line/50 pt-2">
                      <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-ink-faint">
                        FSRS: {card.due}
                      </span>
                      <button className="text-ink-faint hover:text-ink transition-colors">
                        <ArrowRight className="size-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </main>

        <aside className="flex flex-col gap-4">
          <div className="border border-line bg-paper-raised p-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
              Metode Belajar
            </span>
            <div className="mt-4 space-y-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink-faint">Format</span>
                <p className="text-[11px] leading-relaxed text-ink-muted">
                  Huruf Jepang (Hiragana/Katakana), cara baca romaji, arti, dan contoh kalimat.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink-faint">Kategori</span>
                <p className="text-[11px] leading-relaxed text-ink-muted">
                  Kosa kata dibagi menjadi Bab untuk memudahkan navigasi dan fokus belajar.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-ink bg-ink p-5 text-paper">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-paper/40">
              Antrean Kosakata
            </span>
            <p className="mt-3 font-mono text-[2.2rem] leading-none tabular">
              12
            </p>
            <p className="mt-1 text-[11px] text-paper/50">
              kartu jatuh tempo hari ini
            </p>
            <button
              className="mt-5 flex w-full h-9 items-center justify-center gap-2 border border-paper/25 text-[11px] transition-colors hover:bg-paper hover:text-ink"
            >
              Mulai Sesi SRS
              <ArrowRight className="size-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}