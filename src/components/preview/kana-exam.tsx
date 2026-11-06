"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { ArrowRight, Clock, Lock, RotateCcw, X } from "lucide-react";
import {
  getKanaExamQuestions,
  initiallyCompletedHiraganaRows,
  initiallyCompletedKatakanaRows,
  kanaRowsForScript,
  type KanaScript,
  type LessonQuestion,
} from "@/data/preview";
import { Button } from "@/components/ui/button";
import {
  getCompletedKanaRowsServerSnapshot,
  getCompletedKanaRowsSnapshot,
  parseCompletedKanaRows,
  subscribeKanaProgress,
} from "@/lib/preview-progress";
import { cn } from "@/lib/cn";

const EXAM_SECONDS = 10 * 60;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function KanaExam({ script }: { script: KanaScript }) {
  const rows = kanaRowsForScript(script);
  const scriptName = script === "katakana" ? "katakana" : "hiragana";
  const mark = script === "katakana" ? "ア" : "あ";
  const totalCharacters = rows.reduce(
    (total, row) => total + row.characters.length,
    0,
  );
  const initiallyCompleted =
    script === "katakana"
      ? initiallyCompletedKatakanaRows
      : initiallyCompletedHiraganaRows;

  const completedRaw = useSyncExternalStore(
    subscribeKanaProgress,
    getCompletedKanaRowsSnapshot,
    getCompletedKanaRowsServerSnapshot,
  );
  const completedRows = useMemo(
    () => parseCompletedKanaRows(completedRaw),
    [completedRaw],
  );
  const completedSet = useMemo(
    () => new Set([...initiallyCompleted, ...completedRows]),
    [completedRows, initiallyCompleted],
  );
  const completedCount = rows.filter((row) => completedSet.has(row.id)).length;
  const unlocked = completedCount === rows.length;

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState<LessonQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [remaining, setRemaining] = useState(EXAM_SECONDS);

  const finishedExam = started && (finished || remaining === 0);

  useEffect(() => {
    if (!started || finishedExam) return;

    const interval = window.setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [started, finishedExam]);

  const startExam = () => {
    setQuestions(getKanaExamQuestions(script));
    setIndex(0);
    setAnswers({});
    setRemaining(EXAM_SECONDS);
    setFinished(false);
    setStarted(true);
  };

  const closeExam = () => {
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setIndex(0);
    setAnswers({});
    setRemaining(EXAM_SECONDS);
  };

  const correctCount = useMemo(() => {
    if (!finishedExam) return 0;

    return questions.reduce((total, question, questionIndex) => {
      const selectedId = answers[questionIndex];
      const selectedOption = question.options.find(
        (option) => option.id === selectedId,
      );
      return selectedOption?.correct ? total + 1 : total;
    }, 0);
  }, [answers, finishedExam, questions]);

  if (!started) {
    return (
      <div className="border border-line bg-paper-raised">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
            Ujian {scriptName}
          </span>
          <span className="font-mono text-[9px] tabular text-ink-muted">
            {unlocked ? "10 menit" : `${completedCount}/${rows.length} baris`}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-start gap-3">
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center border",
                unlocked
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-faint",
              )}
            >
              {unlocked ? (
                <span className="font-serif-jp text-lg leading-none">
                  {mark}
                </span>
              ) : (
                <Lock className="size-4" strokeWidth={1.5} />
              )}
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-[12.5px] font-medium">
                Ujian akhir {scriptName}
              </p>
              <p className="text-[10.5px] leading-relaxed text-ink-muted">
                {unlocked
                  ? `${totalCharacters} huruf · soal acak · 10 menit`
                  : `Selesaikan seluruh baris ${scriptName} untuk membuka ujian.`}
              </p>
            </div>
          </div>

          <div className="mt-4 h-px bg-line" aria-hidden="true">
            <div
              className="h-full bg-ink"
              style={{ width: `${(completedCount / rows.length) * 100}%` }}
            />
          </div>

          <Button
            size="sm"
            className="mt-4 w-full"
            disabled={!unlocked}
            onClick={startExam}
          >
            {unlocked ? (
              <>
                Mulai ujian
                <ArrowRight className="size-3.5" strokeWidth={1.5} />
              </>
            ) : (
              "Ujian terkunci"
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (finishedExam) {
    const usedSeconds = EXAM_SECONDS - remaining;

    return (
      <div className="fixed inset-0 z-[80] overflow-y-auto bg-paper">
        <div className="mx-auto flex min-h-svh w-full max-w-3xl flex-col px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
              Ujian {scriptName} · selesai
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
              {remaining === 0 ? "Waktu habis" : "Selesai lebih awal"}
            </span>
          </div>

          <div className="mt-6 border border-line bg-paper-raised p-6 sm:p-9">
            <span className="font-serif-jp text-3xl leading-none">{mark}</span>
            <h2 className="mt-4 text-[clamp(1.8rem,4vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.03em]">
              {correctCount} / {questions.length} benar.
            </h2>
            <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink-muted">
              {remaining === 0
                ? "Waktu ujian habis. Jawaban yang sudah dipilih tetap dihitung."
                : "Ujian diakhiri lebih awal. Jawaban yang sudah dipilih tetap dihitung."}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-px border border-line bg-line">
              <div className="bg-paper p-4">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-faint">
                  Benar
                </span>
                <p className="mt-2 font-mono text-xl tabular">
                  {correctCount}/{questions.length}
                </p>
              </div>
              <div className="bg-paper p-4">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-faint">
                  Waktu terpakai
                </span>
                <p className="mt-2 font-mono text-xl tabular">
                  {formatTime(usedSeconds)}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <Button size="sm" onClick={startExam}>
                <RotateCcw className="size-3.5" strokeWidth={1.5} />
                Ulangi
              </Button>
              <Button size="sm" variant="outline" onClick={closeExam}>
                Tutup
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[index];
  const selectedId = answers[index];
  const isLastQuestion = index === questions.length - 1;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-paper">
      <div className="mx-auto flex min-h-svh w-full max-w-3xl flex-col px-4 py-6 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={closeExam}
            aria-label="Keluar dari ujian"
            className="grid size-9 shrink-0 place-items-center rounded-[3px] border border-line text-ink-muted transition-colors hover:text-ink"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>

          <div className="flex flex-1 gap-1" aria-hidden="true">
            <div className="h-[3px] flex-1 bg-line">
              <div
                className="h-full bg-ink"
                style={{
                  width: `${((index + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <span
            className={cn(
              "flex shrink-0 items-center gap-1.5 font-mono text-[10px] tabular",
              remaining <= 60 ? "text-accent" : "text-ink-muted",
            )}
          >
            <Clock className="size-3.5" strokeWidth={1.5} />
            {formatTime(remaining)}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
          <span>Ujian {scriptName}</span>
          <span>
            Soal {index + 1} dari {questions.length}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-8 border border-line bg-paper-raised p-6 sm:p-9">
          <div className="flex flex-col gap-6">
            <p className="max-w-lg text-[15px] leading-relaxed text-ink-soft">
              {question.prompt}
            </p>

            <span className="font-serif-jp text-[clamp(5rem,16vw,8rem)] leading-[0.9]">
              {question.character}
            </span>

            <div className="grid gap-2 sm:grid-cols-2">
              {question.options.map((option, optionIndex) => {
                const selected = selectedId === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setAnswers((value) => ({
                        ...value,
                        [index]: option.id,
                      }))
                    }
                    className={cn(
                      "group flex items-center justify-between border px-4 py-4 text-left transition-[border-color,background-color] duration-300",
                      selected
                        ? "border-ink bg-ink/[0.04] dark:bg-paper/[0.06]"
                        : "border-line hover:border-line-strong",
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
                        selected
                          ? "border-ink bg-ink"
                          : "border-line-strong",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
            Terjawab {answeredCount}/{questions.length}
          </p>

          <div className="flex flex-wrap gap-2">
            {isLastQuestion ? (
              <Button size="sm" onClick={() => setFinished(true)}>
                Selesai
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setFinished(true)}
                >
                  Selesai
                </Button>
                <Button
                  size="sm"
                  disabled={!selectedId}
                  onClick={() => setIndex((value) => value + 1)}
                >
                  Lanjut
                  <ArrowRight className="size-3.5" strokeWidth={1.5} />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
