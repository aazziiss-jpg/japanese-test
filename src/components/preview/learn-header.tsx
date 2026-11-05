"use client";

import { useSyncExternalStore } from "react";
import { MiniStat, PreviewHeader } from "@/components/app/app-shell";
import { defaultHiraganaRow, hiraganaRows, learner } from "@/data/preview";
import {
  getActiveHiraganaRowServerSnapshot,
  getActiveHiraganaRowSnapshot,
  subscribeActiveHiraganaRow,
} from "@/lib/preview-progress";

export function LearnHeader() {
  const stored = useSyncExternalStore(
    subscribeActiveHiraganaRow,
    getActiveHiraganaRowSnapshot,
    getActiveHiraganaRowServerSnapshot,
  );
  const activeRowId = stored === null ? defaultHiraganaRow : stored;
  const activeRow = hiraganaRows.find((row) => row.id === activeRowId);

  return (
    <PreviewHeader
      eyebrow="Peta belajar · N5 & N4"
      title="Selamat malam."
      description={
        activeRow
          ? `Lanjutkan sesi hiragana di ${activeRow.title.replace(
              "Baris",
              "baris",
            )}.`
          : "Pilih baris hiragana untuk mulai belajar."
      }
      action={
        <div className="flex flex-wrap gap-2">
          <MiniStat icon="sparkles" label="XP" value={`${learner.xp}`} />
        </div>
      }
    />
  );
}
