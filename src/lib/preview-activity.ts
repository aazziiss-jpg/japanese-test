// Riwayat aktivitas belajar yang disimpan di perangkat. Dipakai oleh peta
// kebiasaan (ala GitHub contributions) dan daftar riwayat di halaman profil.

export const ACTIVITY_LOG_KEY = "sumi.preview.activity-log";

const MAX_EVENTS = 400;

export type ActivityKind = "lesson" | "exam" | "writing" | "review" | "sensei";

export type ActivityEvent = {
  id: string;
  kind: ActivityKind;
  title: string;
  detail: string;
  /** Epoch milidetik saat aktivitas selesai. */
  at: number;
  /** Perkiraan durasi dalam menit; dipakai untuk statistik waktu belajar. */
  minutes: number;
};

export type ActivityInput = {
  kind: ActivityKind;
  title: string;
  detail?: string;
  minutes?: number;
  at?: number;
  /** Bila diisi, aktivitas dengan id sama tidak dicatat dua kali. */
  dedupeKey?: string;
};

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeActivityLog(listener: () => void) {
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

/** Snapshot berupa string mentah agar referensinya stabil untuk useSyncExternalStore. */
export function getActivityLogSnapshot(): string {
  if (typeof window === "undefined") return "";

  try {
    return window.localStorage.getItem(ACTIVITY_LOG_KEY) ?? "";
  } catch {
    return "";
  }
}

export function getActivityLogServerSnapshot(): string {
  return "";
}

function isActivityEvent(value: unknown): value is ActivityEvent {
  if (!value || typeof value !== "object") return false;

  const event = value as Record<string, unknown>;

  return (
    typeof event.id === "string" &&
    typeof event.kind === "string" &&
    typeof event.title === "string" &&
    typeof event.detail === "string" &&
    typeof event.at === "number" &&
    Number.isFinite(event.at) &&
    typeof event.minutes === "number" &&
    Number.isFinite(event.minutes)
  );
}

export function parseActivityLog(raw: string): ActivityEvent[] {
  if (!raw) return [];

  try {
    const value: unknown = JSON.parse(raw);

    if (!Array.isArray(value)) return [];

    return value
      .filter(isActivityEvent)
      .map((event) => ({
        ...event,
        minutes: Math.max(0, event.minutes),
      }))
      .sort((a, b) => b.at - a.at);
  } catch {
    return [];
  }
}

export function recordActivity(input: ActivityInput) {
  if (typeof window === "undefined") return;

  try {
    const at = input.at ?? Date.now();
    const existing = parseActivityLog(
      window.localStorage.getItem(ACTIVITY_LOG_KEY) ?? "",
    );

    if (
      input.dedupeKey &&
      existing.some((event) => event.id === input.dedupeKey)
    ) {
      return;
    }

    const event: ActivityEvent = {
      id:
        input.dedupeKey ??
        `${at}-${Math.random().toString(36).slice(2, 8)}`,
      kind: input.kind,
      title: input.title,
      detail: input.detail ?? "",
      at,
      minutes: Math.max(0, input.minutes ?? 0),
    };

    window.localStorage.setItem(
      ACTIVITY_LOG_KEY,
      JSON.stringify([event, ...existing].slice(0, MAX_EVENTS)),
    );
    emit();
  } catch {
    // localStorage bisa tidak tersedia (mode privat); pratinjau tetap jalan.
  }
}

export function clearActivityLog() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(ACTIVITY_LOG_KEY);
    emit();
  } catch {
    // abaikan
  }
}

/* ----------------------------- turunan data ----------------------------- */

export function startOfDay(value: Date | number): Date {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function addDays(value: Date | number, amount: number): Date {
  const date = new Date(value);
  date.setDate(date.getDate() + amount);
  return date;
}

/** Kunci hari dalam zona waktu lokal, misalnya "2026-11-23". */
export function dayKey(value: Date | number): string {
  const date = new Date(value);
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export type ActivitySummary = {
  total: number;
  activeDays: number;
  streak: number;
  minutes: number;
  counts: Map<string, number>;
};

export function summarizeActivity(events: ActivityEvent[]): ActivitySummary {
  const counts = new Map<string, number>();
  let minutes = 0;

  for (const event of events) {
    const key = dayKey(event.at);
    counts.set(key, (counts.get(key) ?? 0) + 1);
    minutes += event.minutes;
  }

  let streak = 0;
  const today = startOfDay(Date.now());
  let cursor = today;

  if (!counts.has(dayKey(cursor))) {
    cursor = addDays(cursor, -1);
  }

  while (counts.has(dayKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return {
    total: events.length,
    activeDays: counts.size,
    streak,
    minutes: Math.round(minutes),
    counts,
  };
}

export type HeatmapDay = {
  key: string;
  at: number;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  future: boolean;
};

export function heatmapLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count <= 4) return 3;
  return 4;
}

/**
 * Menyusun sel peta kebiasaan layaknya GitHub contributions.
 * Grid dimulai hari Senin agar label Sen–Min sejajar dengan barisnya.
 */
export function buildHeatmap(
  events: ActivityEvent[],
  weeks = 27,
): HeatmapDay[] {
  const { counts } = summarizeActivity(events);
  const today = startOfDay(Date.now());
  const weekdayOffset = (today.getDay() + 6) % 7; // Senin = 0, Minggu = 6
  const currentWeekStart = addDays(today, -weekdayOffset);
  const start = addDays(currentWeekStart, -(weeks - 1) * 7);

  return Array.from({ length: weeks * 7 }, (_, index) => {
    const date = addDays(start, index);
    const key = dayKey(date);
    const count = counts.get(key) ?? 0;

    return {
      key,
      at: date.getTime(),
      count,
      level: heatmapLevel(count),
      future: date.getTime() > today.getTime(),
    };
  });
}

export type ActivityHistoryItem = ActivityEvent & {
  /** Jumlah kartu bila beberapa aktivitas ulangi digabung dalam satu baris. */
  mergedCount?: number;
};

/**
 * Menggabungkan aktivitas "ulangi" berurutan pada hari yang sama supaya
 * riwayat tidak dipenuhi satu baris per kartu.
 */
export function buildHistory(events: ActivityEvent[]): ActivityHistoryItem[] {
  const items: ActivityHistoryItem[] = [];

  for (const event of events) {
    const previous = items[items.length - 1];

    if (
      previous &&
      previous.kind === "review" &&
      event.kind === "review" &&
      dayKey(previous.at) === dayKey(event.at)
    ) {
      const mergedCount = (previous.mergedCount ?? 1) + 1;
      items[items.length - 1] = {
        ...previous,
        detail: `${mergedCount} kartu · terakhir ${event.detail || "dinilai"}`,
        mergedCount,
      };
      continue;
    }

    items.push({ ...event });
  }

  return items;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

function clock(value: Date) {
  const hours = `${value.getHours()}`.padStart(2, "0");
  const minutes = `${value.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
}

/** Label waktu lokal: "Hari ini · 20:14", "Kemarin · 21:03", "12 Nov · 09:40". */
export function formatActivityTime(value: number, now = Date.now()): string {
  const date = new Date(value);
  const today = startOfDay(now);
  const target = startOfDay(value);
  const diffDays = Math.round(
    (today.getTime() - target.getTime()) / 86_400_000,
  );

  if (diffDays === 0) return `Hari ini · ${clock(date)}`;
  if (diffDays === 1) return `Kemarin · ${clock(date)}`;

  return `${date.getDate()} ${MONTHS[date.getMonth()]} · ${clock(date)}`;
}

/** Label singkat dari nilai menit, misalnya "1j 24m" atau "18m". */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  return rest === 0 ? `${hours}j` : `${hours}j ${rest}m`;
}
