"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Volume2, X } from "lucide-react";
import { findKanaRow, getKanaQuestions, kanaRowsForScript } from "@/data/preview";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  clearActiveKanaRow,
  completeKanaRow,
  writeActiveKanaRow,
} from "@/lib/preview-progress";
import { cn } from "@/lib/cn";
import { EASE_SUMI } from "@/lib/motion";

export function LessonPlayer({ rowId }: { rowId: string }) {
  const row = findKanaRow(rowId) ?? kanaRowsForScript("hiragana")[0];
  const questions = getKanaQuestions(row.id);
  const scriptRows = kanaRowsForScript(row.script);
  const rowIndex = scriptRows.findIndex((item) => item.id === row.id);
  const nextRow = rowIndex >= 0 ? scriptRows[rowIndex + 1] : undefined;
  const scriptName = row.script === "katakana" ? "Katakana" : "Hiragana";
  const scriptNameLower = row.script === "katakana" ? "katakana" : "hiragana";

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = questions[index];
  const selectedOption = question.options.find((option) => option.id === selected);
  const correct = Boolean(checked && selectedOption?.correct);
  const lastQuestion = index === questions.length - 1;

  useEffect(() => {
    writeActiveKanaRow(row.id);
  }, [row.id]);

  const selectOption = (optionId: string) => {
    setSelected(optionId);
    setChecked(true);
  };

  const next = () => {
    if (lastQuestion) {
      completeKanaRow(row.id);
      setFinished(true);
      if (nextRow) {
        writeActiveKanaRow(nextRow.id);
      } else {
        clearActiveKanaRow();
      }
      return;
    }

    setChecked(false);
    setSelected(null);
    setIndex((value) => value + 1);
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
          {questions.map((_, segment) => (
            <span
              key={segment}
              className={cn(
                "h-[3px] flex-1",
                segment < index + 1 ? "bg-ink" : "bg-line",
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
        <span>{scriptName} · {row.title}</span>
        <span>
          {finished
            ? `${questions.length}/${questions.length} selesai`
            : `Soal ${index + 1} dari ${questions.length}`}
        </span>
      </div>

      {finished ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_SUMI }}
          className="mt-4 border border-line bg-paper-raised p-6 sm:p-9"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
            {row.title} · selesai
          </span>
          <h2 className="mt-3 text-balance text-[clamp(1.8rem,4vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.03em]">
            {questions.length}/{questions.length} soal selesai.
          </h2>
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink-muted">
            {nextRow
              ? "Baris ini sudah kamu lewati. Lanjut ke baris berikutnya, atau kembali ke peta belajar."
              : row.script === "hiragana"
                ? "Semua baris hiragana sudah kamu lewati. Kembali ke peta untuk melanjutkan ke katakana."
                : "Semua baris katakana sudah kamu lewati. Kembali ke peta belajar."}
          </p>

          <div className="mt-8 border-t border-line pt-6">
            {nextRow ? (
              <>
                <p className="text-[13px] font-medium">
                  Lanjut ke huruf {nextRow.label}?
                </p>
                <p className="mt-1 font-jp text-[12px] tracking-wide text-ink-muted">
                  {nextRow.characters
                    .map((character) => character.kana)
                    .join(" ")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <ButtonLink
                    href={`/preview/lesson?row=${nextRow.id}`}
                    size="sm"
                  >
                    Iya, lanjut
                    <ArrowRight className="size-3.5" strokeWidth={1.5} />
                  </ButtonLink>
                  <ButtonLink
                    href="/preview/learn"
                    variant="outline"
                    size="sm"
                  >
                    Tidak
                  </ButtonLink>
                </div>
              </>
            ) : (
              <>
                <p className="text-[13px] font-medium">
                  Semua baris {scriptNameLower} selesai.
                </p>
                <div className="mt-4">
                  <ButtonLink href="/preview/learn" size="sm">
                    Kembali ke peta
                  </ButtonLink>
                </div>
              </>
            )}
          </div>
        </motion.div>
      ) : (
        <>
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
                      onClick={() => selectOption(option.id)}
                      className={cn(
                        "group flex items-center justify-between border px-4 py-4 text-left transition-[border-color,background-color] duration-300",
                        isSelected
                          ? "border-ink bg-ink/[0.03] dark:bg-paper/[0.05]"
                          : "border-line hover:border-line-strong",
                        showCorrect &&
                          "border-ink bg-ink/[0.06] dark:bg-paper/[0.08]",
                        showWrong && "border-accent bg-accent-soft",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                          {String.fromCharCode(65 + optionIndex)}
                        </span>
                        <span
                          className={cn(
                            "text-xl",
                            /^[a-z]+$/.test(option.label)
                              ? "font-sans text-[17px]"
                              : "font-jp",
                          )}
                        >
                          {option.label}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "size-3.5 rounded-full border",
                          isSelected
                            ? "border-ink bg-ink"
                            : "border-line-strong",
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
                        {lastQuestion ? "Selesai" : "Lanjut"}
                        <ArrowRight className="size-3.5" strokeWidth={1.5} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>

          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
            Pratinjau · progres tersimpan di perangkat ini
          </p>

          <div className="mt-8 flex items-start gap-3 border border-dashed border-line p-4">
            <span className="font-serif-jp text-lg leading-none text-ink-faint">
              {row.characters[0].kana}
            </span>
            <p className="text-[11.5px] leading-relaxed text-ink-muted">
              <span className="font-medium text-ink">Catatan desain.</span>{" "}
              Jawaban langsung dinilai saat dipilih. Panel koreksi muncul dari
              bawah kartu, bukan menutupi soal. Warna salah memakai aksen
              vermilion, benar memakai tinta penuh — bukan hijau, agar tetap
              monokrom.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
