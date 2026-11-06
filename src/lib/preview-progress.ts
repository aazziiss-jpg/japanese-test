// Keys keep their original names so progress saved before katakana existed
// (and stored row ids such as "a" or "ka") continues to work.
export const ACTIVE_KANA_ROW_KEY = "sumi.preview.active-hiragana-row";
export const COMPLETED_KANA_ROWS_KEY = "sumi.preview.completed-hiragana-rows";

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeKanaProgress(listener: () => void) {
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

export function getActiveKanaRowSnapshot(): string | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(ACTIVE_KANA_ROW_KEY);
  } catch {
    return null;
  }
}

export function getActiveKanaRowServerSnapshot(): string | null {
  return null;
}

export function getCompletedKanaRowsSnapshot(): string | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(COMPLETED_KANA_ROWS_KEY);
  } catch {
    return null;
  }
}

export function getCompletedKanaRowsServerSnapshot(): string | null {
  return null;
}

export function parseCompletedKanaRows(raw: string | null): string[] {
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

export function writeActiveKanaRow(rowId: string) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(ACTIVE_KANA_ROW_KEY, rowId);
    emit();
  } catch {
    // localStorage can be unavailable in private browsing; preview still works.
  }
}

export function clearActiveKanaRow() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(ACTIVE_KANA_ROW_KEY, "");
    emit();
  } catch {
    // localStorage can be unavailable in private browsing; preview still works.
  }
}

export function completeKanaRow(rowId: string) {
  if (typeof window === "undefined") return;

  try {
    const completed = parseCompletedKanaRows(
      window.localStorage.getItem(COMPLETED_KANA_ROWS_KEY),
    );

    if (completed.includes(rowId)) return;

    window.localStorage.setItem(
      COMPLETED_KANA_ROWS_KEY,
      JSON.stringify([...completed, rowId]),
    );
    emit();
  } catch {
    // localStorage can be unavailable in private browsing; preview still works.
  }
}
