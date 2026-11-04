"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Heart, Volume2, X } from "lucide-react";
import { lessonQuestions } from "@/data/preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { EASE_SUMI } from "@/lib/motion";

export default function LessonPreviewPage() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const question = lessonQuestions[index];
  const selectedOption = question.options.find((option) => option.id === selected);
  const correct = Boolean(checked && selectedOption?.correct);

  const check = () => {
    if (!selected) return;
    setChecked(true);
  };

  const next = () => {
    setChecked(false);
    setSelected(null);
    setIndex((value) => (value + 1) % lessonQuestions.length);
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col">
      <div className="flex items-center gap-4">
        <Link
          href="/preview/learn"
          aria-label="Keluar dari pelajaran"
          className="grid size-9 shrink-0 place-items-center rounded-[3px] border border-line text-ink-muted transition-colors hover:text-ink"
        >
          <X className="size-4" strokeWidth={1.5} />
        </Link>

        <div className="flex flex-1 gap-1" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, segment) => (
            <span
              key={segment}
              className={cn(
                "h-[3px] flex-1",
                segment < index + 1 ? "bg-ink" : "bg-line",
              )}
            />
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, heart) => (
            <Heart
              key={heart}
              className={cn(
                "size-3.5",
                heart < 4 ? "fill-ink text-ink" : "text-line-strong",
              )}
              strokeWidth={1.2}
              aria-hidden="true"
            />
          ))}
          <span className="sr-only">4 dari 5 nyawa</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
        <span>Unit 02 · Hiragana dasar</span>
        <span>Soal {index + 1} dari 8</span>
      </div>

      <motion.div
        key={`question-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_SUMI }}
        className="mt-4 flex flex-col gap-8 border border-line bg-paper-raised p-6 sm:p-9"
      >
        <div className="flex flex-col gap-6">
          <p className="max-w-lg text-[15px] leading-relaxed text-ink-soft">
            {question.prompt}
          </p>

          <div className="flex items-end justify-between gap-6">
            <span className="font-serif-jp text-[clamp(5rem,16vw,8rem)] leading-[0.9]">
              {question.character}
            </span>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-ink hover:text-ink"
              aria-label="Putar audio (contoh)"
            >
              <Volume2 className="size-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {question.options.map((option, optionIndex) => {
              const isSelected = selected === option.id;
              const isCorrect = option.correct;
              const showCorrect = checked && isCorrect;
              const showWrong = checked && isSelected && !isCorrect;

              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={checked}
                  onClick={() => setSelected(option.id)}
                  className={cn(
                    "group flex items-center justify-between border px-4 py-4 text-left transition-[border-color,background-color] duration-300",
                    isSelected
                      ? "border-ink bg-ink/[0.03] dark:bg-paper/[0.05]"
                      : "border-line hover:border-line-strong",
                    showCorrect && "border-ink bg-ink/[0.06] dark:bg-paper/[0.08]",
                    showWrong && "border-accent bg-accent-soft",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span className={cn("text-xl", /^[a-z]+$/.test(option.label) ? "font-sans text-[17px]" : "font-jp")}>
                      {option.label}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "size-3.5 rounded-full border",
                      isSelected ? "border-ink bg-ink" : "border-line-strong",
                      showWrong && "border-accent bg-accent",
                    )}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {checked ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: EASE_SUMI }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-4 border-t border-line pt-6">
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full font-mono text-[11px]",
                      correct
                        ? "bg-ink text-paper"
                        : "bg-accent text-accent-foreground",
                    )}
                    aria-hidden="true"
                  >
                    {correct ? "✓" : "!"}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] font-medium">
                      {correct ? "Tepat." : "Belum tepat."}
                    </p>
                    <p className="max-w-lg text-[12.5px] leading-relaxed text-ink-muted">
                      {question.explanation}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button size="sm" onClick={next}>
                    Lanjut
                    <ArrowRight className="size-3.5" strokeWidth={1.5} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
          Pratinjau · belum tersambung ke progres
        </p>
        <Button
          size="sm"
          variant={checked ? "outline" : "primary"}
          disabled={!selected}
          onClick={checked ? next : check}
        >
          {checked ? "Soal berikutnya" : "Periksa"}
        </Button>
      </div>

      <div className="mt-8 flex items-start gap-3 border border-dashed border-line p-4">
        <span className="font-serif-jp text-lg leading-none text-ink-faint">あ</span>
        <p className="text-[11.5px] leading-relaxed text-ink-muted">
          <span className="font-medium text-ink">Catatan desain.</span> Panel
          koreksi muncul dari bawah kartu, bukan menutupi soal. Warna salah
          memakai aksen vermilion, benar memakai tinta penuh — bukan hijau,
          agar tetap monokrom.
        </p>
      </div>
    </div>
  );
}
