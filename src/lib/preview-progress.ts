export const ACTIVE_HIRAGANA_ROW_KEY = "sumi.preview.active-hiragana-row";
export const COMPLETED_HIRAGANA_ROWS_KEY =
  "sumi.preview.completed-hiragana-rows";

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribePreviewProgress(listener: () => void) {
  listeners.add(listener);

  if (typeof window !== "undefined") {
    window.addEventListener("storage", listener);
  }

  return () => {
    listeners.delete(listener);

    if (typeof window !== "undefined") {
      window.removeEventListener("storage", listener);
    }
  };
}

const subscribeActiveHiraganaRow = subscribePreviewProgress;
const subscribeHiraganaCompletion = subscribePreviewProgress;

export { subscribeActiveHiraganaRow, subscribeHiraganaCompletion };

export function getActiveHiraganaRowSnapshot(): string | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(ACTIVE_HIRAGANA_ROW_KEY);
  } catch {
    return null;
  }
}

export function getActiveHiraganaRowServerSnapshot(): string | null {
  return null;
}

export function getCompletedHiraganaRowsSnapshot(): string | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(COMPLETED_HIRAGANA_ROWS_KEY);
  } catch {
    return null;
  }
}

export function getCompletedHiraganaRowsServerSnapshot(): string | null {
  return null;
}

export function parseCompletedHiraganaRows(raw: string | null): string[] {
  if (!raw) return [];

  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function writeActiveHiraganaRow(rowId: string) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(ACTIVE_HIRAGANA_ROW_KEY, rowId);
    emit();
  } catch {
    // localStorage can be unavailable in private browsing; preview still works.
  }
}

export function clearActiveHiraganaRow() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(ACTIVE_HIRAGANA_ROW_KEY, "");
    emit();
  } catch {
    // localStorage can be unavailable in private browsing; preview still works.
  }
}

export function completeHiraganaRow(rowId: string) {
  if (typeof window === "undefined") return;

  try {
    const completed = parseCompletedHiraganaRows(
      window.localStorage.getItem(COMPLETED_HIRAGANA_ROWS_KEY),
    );

    if (completed.includes(rowId)) return;

    window.localStorage.setItem(
      COMPLETED_HIRAGANA_ROWS_KEY,
      JSON.stringify([...completed, rowId]),
    );
    emit();
  } catch {
    // localStorage can be unavailable in private browsing; preview still works.
  }
}
