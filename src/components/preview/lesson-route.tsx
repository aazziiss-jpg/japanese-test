"use client";

import { useSearchParams } from "next/navigation";
import { findKanaRow, hiraganaRows } from "@/data/preview";
import { LessonPlayer } from "@/components/preview/lesson-player";

/**
 * Static export tidak punya `searchParams` di server, jadi baris pelajaran
 * dibaca dari query string di browser.
 */
export function LessonRoute() {
  const searchParams = useSearchParams();
  const rowId =
    findKanaRow(searchParams.get("row") ?? undefined)?.id ?? hiraganaRows[0].id;

  return <LessonPlayer key={rowId} rowId={rowId} />;
}
