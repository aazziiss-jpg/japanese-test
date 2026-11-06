"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Check, Lock, Play } from "lucide-react";
import {
  defaultHiraganaRow,
  findKanaRow,
  learningLevels,
  type LearningLevel,
  type LearningUnit,
} from "@/data/preview";
import {
  getActiveKanaRowServerSnapshot,
  getActiveKanaRowSnapshot,
  getCompletedKanaRowsServerSnapshot,
  getCompletedKanaRowsSnapshot,
  parseCompletedKanaRows,
  subscribeKanaProgress,
  writeActiveKanaRow,
} from "@/lib/preview-progress";
import { cn } from "@/lib/cn";

function isUnitDone(unit: LearningUnit, completedRows: string[]) {
  return (
    unit.status === "done" ||
    Boolean(unit.lessonRow && completedRows.includes(unit.lessonRow))
  );
}

function levelStats(level: LearningLevel, completedRows: string[]) {
  const units = level.sections.flatMap((section) => section.units);
  return {
    total: units.length,
    done: units.filter((unit) => isUnitDone(unit, completedRows)).length,
  };
}

export function LearnMap() {
  const [activeLevel, setActiveLevel] = useState<LearningLevel["id"]>("n5");
  const storedActiveRow = useSyncExternalStore(
    subscribeKanaProgress,
    getActiveKanaRowSnapshot,
    getActiveKanaRowServerSnapshot,
  );
  const completedRaw = useSyncExternalStore(
    subscribeKanaProgress,
    getCompletedKanaRowsSnapshot,
    getCompletedKanaRowsServerSnapshot,
  );
  const completedRows = useMemo(
    () => parseCompletedKanaRows(completedRaw),
    [completedRaw],
  );
  const activeRow =
    storedActiveRow === null ? defaultHiraganaRow : storedActiveRow;
  const level =
    learningLevels.find((item) => item.id === activeLevel) ?? learningLevels[0];

  return (
    <div>
      <div
        className="mb-8 grid grid-cols-2 gap-px border border-line bg-line"
        role="group"
        aria-label="Pilih level JLPT"
      >
        {learningLevels.map((item) => {
          const selected = item.id === level.id;
          const stats = levelStats(item, completedRows);

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActiveLevel(item.id)}
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
                  {item.mark}
                </span>
              </div>

              <div className="flex w-full items-center gap-3">
                <div
                  className={cn(
                    "h-px flex-1",
                    selected ? "bg-paper/20" : "bg-line",
                  )}
                  aria-hidden="true"
                >
                  <div
                    className={cn("h-full", selected ? "bg-paper" : "bg-ink")}
                    style={{ width: `${(stats.done / stats.total) * 100}%` }}
                  />
                </div>
                <span
                  className={cn(
                    "shrink-0 font-mono text-[8.5px] uppercase tracking-[0.12em]",
                    selected ? "text-paper/50" : "text-ink-faint",
                  )}
                >
                  {stats.done}/{stats.total} unit
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-10">
        {level.sections.map((section) => {
          const done = section.units.filter((unit) =>
            isUnitDone(unit, completedRows),
          ).length;

          return (
            <section key={section.id}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif-jp text-[22px] leading-none text-ink-muted">
                    {section.mark}
                  </span>
                  <h2 className="text-[15px] font-medium tracking-[-0.01em]">
                    {section.title}
                  </h2>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">
                    {section.caption}
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">
                  {done}/{section.units.length} unit
                </span>
              </div>

              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute left-[19px] top-4 bottom-10 w-px bg-line"
                />
                <ol className="flex flex-col gap-3">
                  {section.units.map((unit) => {
                    const locked = unit.status === "locked";
                    const active = unit.lessonRow
                      ? unit.lessonRow === activeRow
                      : unit.status === "active";
                    const unitDone = isUnitDone(unit, completedRows);
                    const row = unit.lessonRow
                      ? findKanaRow(unit.lessonRow)
                      : undefined;
                    const unitProgress = unitDone ? 100 : unit.progress;
                    const unitMeta =
                      unitDone && row
                        ? `${row.characters.length}/${row.characters.length}`
                        : unit.meta;

                    return (
                      <li key={unit.id} className="relative pl-12">
                        <span
                          className={cn(
                            "absolute left-0 top-5 grid size-10 place-items-center border font-mono text-[10px]",
                            unitDone && "border-ink bg-ink text-paper",
                            active && "border-ink bg-paper text-ink",
                            !unitDone &&
                              !active &&
                              !locked &&
                              "border-line bg-paper text-ink-muted",
                            locked && "border-line bg-paper text-ink-faint",
                          )}
                        >
                          {unitDone ? (
                            <Check className="size-4" strokeWidth={2} />
                          ) : locked ? (
                            <Lock className="size-3.5" strokeWidth={1.5} />
                          ) : (
                            unit.index
                          )}
                        </span>

                        <div
                          className={cn(
                            "flex items-center justify-between gap-4 border p-4 transition-colors duration-300",
                            active
                              ? "border-ink bg-paper-raised"
                              : "border-line bg-paper-raised/50",
                            locked && "opacity-55",
                          )}
                        >
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-[14px] font-medium tracking-[-0.01em]">
                                {unit.title}
                              </h3>
                              {active ? (
                                <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-accent-foreground">
                                  lanjutkan
                                </span>
                              ) : null}
                            </div>
                            <p className="font-jp text-[11.5px] tracking-wide text-ink-muted">
                              {unit.caption}
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                              <div
                                className="h-px w-24 bg-line"
                                aria-hidden="true"
                              >
                                <div
                                  className="h-full bg-ink"
                                  style={{ width: `${unitProgress}%` }}
                                />
                              </div>
                              <span className="font-mono text-[9px] tabular text-ink-faint">
                                {unitMeta}
                              </span>
                            </div>
                          </div>

                          {locked ? (
                            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                              terkunci
                            </span>
                          ) : (
                            <Link
                              href={
                                unit.lessonRow
                                  ? `/preview/lesson?row=${unit.lessonRow}`
                                  : "/preview/lesson"
                              }
                              onClick={() => {
                                if (unit.lessonRow) {
                                  writeActiveKanaRow(unit.lessonRow);
                                }
                              }}
                              className={cn(
                                "grid size-9 shrink-0 place-items-center rounded-[3px] border transition-colors",
                                active
                                  ? "border-ink bg-ink text-paper hover:bg-ink-soft"
                                  : "border-line text-ink-muted hover:border-ink hover:text-ink",
                              )}
                              aria-label={`Buka pelajaran ${unit.title}`}
                            >
                              <Play className="size-3.5" strokeWidth={1.5} />
                            </Link>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
