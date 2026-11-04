/**
 * Data goresan diturunkan dari KanjiVG (https://kanjivg.tagaini.net),
 * lisensi CC BY-SA 3.0. Hanya karakter yang dipakai di fase ini yang
 * disertakan agar bundle tetap kecil.
 *
 * Koordinat memakai ruang 0–109 (viewBox KanjiVG).
 */

export type Point = [number, number];

export type Glyph = {
  char: string;
  romaji: string;
  meaning: string;
  readings: string[];
  strokes: string[];
};

const KA = "か";
const A = "あ";
const HI = "日";

export const GLYPHS: Record<string, Glyph> = {
  a: {
    char: A,
    romaji: "a",
    meaning: "Vokal dasar",
    readings: ["あ"],
    strokes: [
      "M31.01,33c0.88,0.88,2.75,1.82,5.25,1.75c8.62-0.25,20-2.12,29.5-4.25c1.51-0.34,4.62-0.88,6.62-0.5",
      "M49.76,17.62c0.88,1,1.82,3.26,1.38,5.25c-3.75,16.75-6.25,38.13-5.13,53.63c0.41,5.7,1.88,10.88,3.38,13.62",
      "M65.63,44.12c0.75,1.12,1.16,4.39,0.5,6.12c-4.62,12.26-11.24,23.76-25.37,35.76c-6.86,5.83-15.88,3.75-16.25-8.38c-0.34-10.87,13.38-23.12,32.38-26.74c12.42-2.37,27,1.38,30.5,12.75c4.05,13.18-3.76,26.37-20.88,30.49",
    ],
  },
  ka: {
    char: KA,
    romaji: "ka",
    meaning: "Suku kata ka",
    readings: ["か"],
    strokes: [
      "M24.62,38.62c1.88,1.62,4.65,2.33,8.62,1c25.5-8.5,29.5-4.13,29.5,7.62c0,9.38-1.24,17.46-4.25,25.25c-7.62,19.76-10.87,17.39-16.12,10.89",
      "M48.5,17.5c1,1.38,1.29,4.7,0.5,7.12c-5,15.25-18.02,40.93-19.62,43.88c-3.12,5.75-6.38,11.88-9.38,16.25",
      "M77.37,31.62c7.5,6.88,13.25,15.75,15,24.88",
    ],
  },
  hi: {
    char: HI,
    romaji: "hi",
    meaning: "Matahari · hari",
    readings: ["ひ", "にち", "じつ"],
    strokes: [
      "M31.5,24.5c1.12,1.12,1.74,2.75,1.74,4.75c0,1.6-0.16,38.11-0.09,53.5c0.02,3.82,0.05,6.35,0.09,6.75",
      "M33.48,26c0.8-0.05,37.67-3.01,40.77-3.25c3.19-0.25,5,1.75,5,4.25c0,4-0.22,40.84-0.23,56c0,3.48,0,5.72,0,6",
      "M34.22,55.25c7.78-0.5,35.9-2.5,44.06-2.75",
      "M34.23,86.5c10.52-0.75,34.15-2.12,43.81-2.25",
    ],
  },
};

export const GLYPH_ORDER = ["a", "ka", "hi"] as const;

export const GLYPH_SPACE = 109;

/**
 * Ambil titik-titik di sepanjang SVG path dengan jarak busur merata.
 * Memakai API DOM, jadi hanya dipanggil di klien dan hasilnya di-cache.
 */
const sampleCache = new Map<string, Point[]>();

export function sampleStroke(d: string, count = 56): Point[] {
  const cacheKey = `${d}:${count}`;
  const cached = sampleCache.get(cacheKey);
  if (cached) return cached;

  if (typeof document === "undefined") return [];

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 109 109");
  svg.setAttribute("aria-hidden", "true");
  svg.style.position = "absolute";
  svg.style.width = "0";
  svg.style.height = "0";
  svg.style.overflow = "hidden";
  svg.style.opacity = "0";
  svg.style.pointerEvents = "none";

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  svg.appendChild(path);
  document.body.appendChild(svg);

  let points: Point[] = [];
  try {
    const total = path.getTotalLength();
    for (let i = 0; i <= count; i += 1) {
      const p = path.getPointAtLength((total * i) / count);
      points.push([p.x, p.y]);
    }
  } catch {
    points = [];
  }

  svg.remove();
  sampleCache.set(cacheKey, points);
  return points;
}

export function strokeLength(points: Point[]): number {
  let sum = 0;
  for (let i = 1; i < points.length; i += 1) {
    sum += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  }
  return sum;
}

/** Resample polyline menjadi `count` titik berjarak busur merata. */
export function resamplePolyline(points: Point[], count = 48): Point[] {
  if (points.length < 2) {
    return Array.from({ length: count }, () => points[0] ?? ([0, 0] as Point));
  }

  const cumulative: number[] = [0];
  for (let i = 1; i < points.length; i += 1) {
    cumulative[i] =
      cumulative[i - 1] +
      Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  }

  const total = cumulative[cumulative.length - 1];
  if (total === 0) return Array.from({ length: count }, () => points[0]);

  const out: Point[] = [];
  let index = 0;

  for (let step = 0; step < count; step += 1) {
    const target = (total * step) / (count - 1);
    while (index < cumulative.length - 2 && cumulative[index + 1] < target) {
      index += 1;
    }
    const segmentLength = cumulative[index + 1] - cumulative[index];
    const ratio = segmentLength === 0 ? 0 : (target - cumulative[index]) / segmentLength;
    const a = points[index];
    const b = points[index + 1] ?? a;
    out.push([a[0] + (b[0] - a[0]) * ratio, a[1] + (b[1] - a[1]) * ratio]);
  }

  return out;
}

function centroid(points: Point[]): Point {
  let x = 0;
  let y = 0;
  for (const [px, py] of points) {
    x += px;
    y += py;
  }
  return [x / points.length, y / points.length];
}

export type MatchResult = {
  ok: boolean;
  score: number;
  distance: number;
  startDistance: number;
  lengthRatio: number;
};

/**
 * Pembanding longgar untuk latihan menulis:
 * - toleran terhadap geseran posisi (translasi bebas)
 * - sensitif terhadap bentuk, panjang, dan titik awal
 * - tidak memutar/menskalakan, karena pengguna menjiplak panduan
 */
export function matchStroke(user: Point[], reference: Point[]): MatchResult {
  if (user.length < 3 || reference.length < 3) {
    return { ok: false, score: 0, distance: 999, startDistance: 999, lengthRatio: 0 };
  }

  const u = resamplePolyline(user, 48);
  const r = resamplePolyline(reference, 48);
  const uc = centroid(u);
  const rc = centroid(r);
  const dx = rc[0] - uc[0];
  const dy = rc[1] - uc[1];

  let distance = 0;
  for (let i = 0; i < u.length; i += 1) {
    distance += Math.hypot(u[i][0] + dx - r[i][0], u[i][1] + dy - r[i][1]);
  }
  distance /= u.length;

  const startDistance = Math.hypot(u[0][0] + dx - r[0][0], u[0][1] + dy - r[0][1]);
  const userLength = strokeLength(u);
  const refLength = strokeLength(r);
  const lengthRatio = refLength === 0 ? 0 : userLength / refLength;

  const score = Math.max(
    0,
    Math.round(
      100 -
        distance * 5.2 -
        startDistance * 1.6 -
        Math.abs(1 - lengthRatio) * 26,
    ),
  );

  const ok =
    distance < 10.5 &&
    startDistance < 19 &&
    lengthRatio > 0.34 &&
    lengthRatio < 2.8 &&
    score > 34;

  return { ok, score, distance, startDistance, lengthRatio };
}
