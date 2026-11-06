"use client";

import { useSyncExternalStore } from "react";
import { PreviewHeader } from "@/components/app/app-shell";
import { defaultHiraganaRow, findKanaRow } from "@/data/preview";
import {
  getActiveKanaRowServerSnapshot,
  getActiveKanaRowSnapshot,
  subscribeKanaProgress,
} from "@/lib/preview-progress";

export function LearnHeader() {
  const stored = useSyncExternalStore(
    subscribeKanaProgress,
    getActiveKanaRowSnapshot,
    getActiveKanaRowServerSnapshot,
  );
  const activeRowId = stored === null ? defaultHiraganaRow : stored;
  const activeRow = findKanaRow(activeRowId);

  return (
    <PreviewHeader
      eyebrow="Peta belajar · N5 & N4"
      title="Selamat malam."
      description={
        activeRow
          ? `Lanjutkan sesi ${activeRow.script} di ${activeRow.title.replace(
              "Baris",
              "baris",
            )}.`
          : "Pilih baris hiragana atau katakana untuk mulai belajar."
      }
    />
  );
}
