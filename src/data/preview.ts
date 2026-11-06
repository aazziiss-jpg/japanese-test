export const learner = {
  xp: 1240,
  accuracy: 92,
  minutes: 184,
  cardsLearned: 214,
  characters: 58,
};

export type UnitStatus = "done" | "active" | "available" | "locked";

export type LearningUnit = {
  id: string;
  index: string;
  title: string;
  caption: string;
  status: UnitStatus;
  progress: number;
  meta: string;
  lessonRow?: string;
};

export type LearningSection = {
  id: string;
  mark: string;
  title: string;
  caption: string;
  units: LearningUnit[];
};

export type LearningLevel = {
  id: "n5" | "n4";
  label: string;
  title: string;
  caption: string;
  mark: string;
  sections: LearningSection[];
};

export type KanaScript = "hiragana" | "katakana";

export type KanaCharacter = {
  kana: string;
  romaji: string;
  note?: string;
};

export type KanaRow = {
  id: string;
  label: string;
  title: string;
  script: KanaScript;
  characters: KanaCharacter[];
};

const hiraganaRowSeeds: Omit<KanaRow, "script">[] = [
  {
    id: "a",
    label: "A",
    title: "Baris A",
    characters: [
      { kana: "あ", romaji: "a" },
      { kana: "い", romaji: "i" },
      { kana: "う", romaji: "u" },
      { kana: "え", romaji: "e" },
      { kana: "お", romaji: "o" },
    ],
  },
  {
    id: "ka",
    label: "K",
    title: "Baris K",
    characters: [
      { kana: "か", romaji: "ka" },
      { kana: "き", romaji: "ki" },
      { kana: "く", romaji: "ku" },
      { kana: "け", romaji: "ke" },
      { kana: "こ", romaji: "ko" },
    ],
  },
  {
    id: "sa",
    label: "S",
    title: "Baris S",
    characters: [
      { kana: "さ", romaji: "sa" },
      { kana: "し", romaji: "shi", note: "Ditulis “shi”, bukan “si”." },
      { kana: "す", romaji: "su" },
      { kana: "せ", romaji: "se" },
      { kana: "そ", romaji: "so" },
    ],
  },
  {
    id: "ta",
    label: "T",
    title: "Baris T",
    characters: [
      { kana: "た", romaji: "ta" },
      { kana: "ち", romaji: "chi", note: "Ditulis “chi”, bukan “ti”." },
      { kana: "つ", romaji: "tsu", note: "Ditulis “tsu”, bukan “tu”." },
      { kana: "て", romaji: "te" },
      { kana: "と", romaji: "to" },
    ],
  },
  {
    id: "na",
    label: "N",
    title: "Baris N",
    characters: [
      { kana: "な", romaji: "na" },
      { kana: "に", romaji: "ni" },
      { kana: "ぬ", romaji: "nu" },
      { kana: "ね", romaji: "ne" },
      { kana: "の", romaji: "no" },
    ],
  },
  {
    id: "ha",
    label: "H",
    title: "Baris H",
    characters: [
      { kana: "は", romaji: "ha" },
      { kana: "ひ", romaji: "hi" },
      { kana: "ふ", romaji: "fu", note: "Diucapkan antara “fu” dan “hu”." },
      { kana: "へ", romaji: "he" },
      { kana: "ほ", romaji: "ho" },
    ],
  },
  {
    id: "ma",
    label: "M",
    title: "Baris M",
    characters: [
      { kana: "ま", romaji: "ma" },
      { kana: "み", romaji: "mi" },
      { kana: "む", romaji: "mu" },
      { kana: "め", romaji: "me" },
      { kana: "も", romaji: "mo" },
    ],
  },
  {
    id: "ya",
    label: "Y",
    title: "Baris Y",
    characters: [
      { kana: "や", romaji: "ya" },
      { kana: "ゆ", romaji: "yu" },
      { kana: "よ", romaji: "yo" },
    ],
  },
  {
    id: "ra",
    label: "R",
    title: "Baris R",
    characters: [
      { kana: "ら", romaji: "ra" },
      { kana: "り", romaji: "ri" },
      { kana: "る", romaji: "ru" },
      { kana: "れ", romaji: "re" },
      { kana: "ろ", romaji: "ro" },
    ],
  },
  {
    id: "wa",
    label: "W",
    title: "Baris W & ん",
    characters: [
      { kana: "わ", romaji: "wa" },
      { kana: "を", romaji: "wo", note: "Dibaca “o” saat menjadi partikel." },
      { kana: "ん", romaji: "n", note: "Tidak memiliki vokal." },
    ],
  },
  {
    id: "ga",
    label: "G",
    title: "Baris G",
    characters: [
      { kana: "が", romaji: "ga" },
      { kana: "ぎ", romaji: "gi" },
      { kana: "ぐ", romaji: "gu" },
      { kana: "げ", romaji: "ge" },
      { kana: "ご", romaji: "go" },
    ],
  },
  {
    id: "za",
    label: "Z",
    title: "Baris Z",
    characters: [
      { kana: "ざ", romaji: "za" },
      { kana: "じ", romaji: "ji" },
      { kana: "ず", romaji: "zu" },
      { kana: "ぜ", romaji: "ze" },
      { kana: "ぞ", romaji: "zo" },
    ],
  },
  {
    id: "da",
    label: "D",
    title: "Baris D",
    characters: [
      { kana: "だ", romaji: "da" },
      { kana: "ぢ", romaji: "ji", note: "Varian dari じ; jarang dipakai." },
      { kana: "づ", romaji: "zu", note: "Varian dari ず; jarang dipakai." },
      { kana: "で", romaji: "de" },
      { kana: "ど", romaji: "do" },
    ],
  },
  {
    id: "ba",
    label: "B",
    title: "Baris B",
    characters: [
      { kana: "ば", romaji: "ba" },
      { kana: "び", romaji: "bi" },
      { kana: "ぶ", romaji: "bu" },
      { kana: "べ", romaji: "be" },
      { kana: "ぼ", romaji: "bo" },
    ],
  },
  {
    id: "pa",
    label: "P",
    title: "Baris P",
    characters: [
      { kana: "ぱ", romaji: "pa" },
      { kana: "ぴ", romaji: "pi" },
      { kana: "ぷ", romaji: "pu" },
      { kana: "ぺ", romaji: "pe" },
      { kana: "ぽ", romaji: "po" },
    ],
  },
];

export const hiraganaRows: KanaRow[] = hiraganaRowSeeds.map((row) => ({
  ...row,
  script: "hiragana",
}));

const katakanaRowSeeds: Omit<KanaRow, "script">[] = [
  {
    id: "kata-a",
    label: "A",
    title: "Baris A",
    characters: [
      { kana: "ア", romaji: "a" },
      { kana: "イ", romaji: "i" },
      { kana: "ウ", romaji: "u" },
      { kana: "エ", romaji: "e" },
      { kana: "オ", romaji: "o" },
    ],
  },
  {
    id: "kata-ka",
    label: "K",
    title: "Baris K",
    characters: [
      { kana: "カ", romaji: "ka" },
      { kana: "キ", romaji: "ki" },
      { kana: "ク", romaji: "ku" },
      { kana: "ケ", romaji: "ke" },
      { kana: "コ", romaji: "ko" },
    ],
  },
  {
    id: "kata-sa",
    label: "S",
    title: "Baris S",
    characters: [
      { kana: "サ", romaji: "sa" },
      { kana: "シ", romaji: "shi", note: "Ditulis “shi”, bukan “si”." },
      { kana: "ス", romaji: "su" },
      { kana: "セ", romaji: "se" },
      { kana: "ソ", romaji: "so" },
    ],
  },
  {
    id: "kata-ta",
    label: "T",
    title: "Baris T",
    characters: [
      { kana: "タ", romaji: "ta" },
      { kana: "チ", romaji: "chi", note: "Ditulis “chi”, bukan “ti”." },
      { kana: "ツ", romaji: "tsu", note: "Ditulis “tsu”, bukan “tu”." },
      { kana: "テ", romaji: "te" },
      { kana: "ト", romaji: "to" },
    ],
  },
  {
    id: "kata-na",
    label: "N",
    title: "Baris N",
    characters: [
      { kana: "ナ", romaji: "na" },
      { kana: "ニ", romaji: "ni" },
      { kana: "ヌ", romaji: "nu" },
      { kana: "ネ", romaji: "ne" },
      { kana: "ノ", romaji: "no" },
    ],
  },
  {
    id: "kata-ha",
    label: "H",
    title: "Baris H",
    characters: [
      { kana: "ハ", romaji: "ha" },
      { kana: "ヒ", romaji: "hi" },
      { kana: "フ", romaji: "fu", note: "Diucapkan antara “fu” dan “hu”." },
      { kana: "ヘ", romaji: "he" },
      { kana: "ホ", romaji: "ho" },
    ],
  },
  {
    id: "kata-ma",
    label: "M",
    title: "Baris M",
    characters: [
      { kana: "マ", romaji: "ma" },
      { kana: "ミ", romaji: "mi" },
      { kana: "ム", romaji: "mu" },
      { kana: "メ", romaji: "me" },
      { kana: "モ", romaji: "mo" },
    ],
  },
  {
    id: "kata-ya",
    label: "Y",
    title: "Baris Y",
    characters: [
      { kana: "ヤ", romaji: "ya" },
      { kana: "ユ", romaji: "yu" },
      { kana: "ヨ", romaji: "yo" },
    ],
  },
  {
    id: "kata-ra",
    label: "R",
    title: "Baris R",
    characters: [
      { kana: "ラ", romaji: "ra" },
      { kana: "リ", romaji: "ri" },
      { kana: "ル", romaji: "ru" },
      { kana: "レ", romaji: "re" },
      { kana: "ロ", romaji: "ro" },
    ],
  },
  {
    id: "kata-wa",
    label: "W",
    title: "Baris W & ン",
    characters: [
      { kana: "ワ", romaji: "wa" },
      { kana: "ヲ", romaji: "wo", note: "Dibaca “o” saat menjadi partikel." },
      { kana: "ン", romaji: "n", note: "Tidak memiliki vokal." },
    ],
  },
  {
    id: "kata-ga",
    label: "G",
    title: "Baris G",
    characters: [
      { kana: "ガ", romaji: "ga" },
      { kana: "ギ", romaji: "gi" },
      { kana: "グ", romaji: "gu" },
      { kana: "ゲ", romaji: "ge" },
      { kana: "ゴ", romaji: "go" },
    ],
  },
  {
    id: "kata-za",
    label: "Z",
    title: "Baris Z",
    characters: [
      { kana: "ザ", romaji: "za" },
      { kana: "ジ", romaji: "ji" },
      { kana: "ズ", romaji: "zu" },
      { kana: "ゼ", romaji: "ze" },
      { kana: "ゾ", romaji: "zo" },
    ],
  },
  {
    id: "kata-da",
    label: "D",
    title: "Baris D",
    characters: [
      { kana: "ダ", romaji: "da" },
      { kana: "ヂ", romaji: "ji", note: "Varian dari ジ; jarang dipakai." },
      { kana: "ヅ", romaji: "zu", note: "Varian dari ズ; jarang dipakai." },
      { kana: "デ", romaji: "de" },
      { kana: "ド", romaji: "do" },
    ],
  },
  {
    id: "kata-ba",
    label: "B",
    title: "Baris B",
    characters: [
      { kana: "バ", romaji: "ba" },
      { kana: "ビ", romaji: "bi" },
      { kana: "ブ", romaji: "bu" },
      { kana: "ベ", romaji: "be" },
      { kana: "ボ", romaji: "bo" },
    ],
  },
  {
    id: "kata-pa",
    label: "P",
    title: "Baris P",
    characters: [
      { kana: "パ", romaji: "pa" },
      { kana: "ピ", romaji: "pi" },
      { kana: "プ", romaji: "pu" },
      { kana: "ペ", romaji: "pe" },
      { kana: "ポ", romaji: "po" },
    ],
  },
];

export const katakanaRows: KanaRow[] = katakanaRowSeeds.map((row) => ({
  ...row,
  script: "katakana",
}));

export const allKanaRows: KanaRow[] = [...hiraganaRows, ...katakanaRows];

export function kanaRowsForScript(script: KanaScript): KanaRow[] {
  return script === "katakana" ? katakanaRows : hiraganaRows;
}

export function findKanaRow(rowId: string | undefined): KanaRow | undefined {
  return allKanaRows.find((row) => row.id === rowId);
}

const hiraganaProgress: Record<
  string,
  { status: UnitStatus; progress: number }
> = {
  a: { status: "done", progress: 100 },
  ka: { status: "done", progress: 100 },
  sa: { status: "active", progress: 60 },
};

export const defaultHiraganaRow =
  Object.entries(hiraganaProgress).find(
    ([, value]) => value.status === "active",
  )?.[0] ?? hiraganaRows[0].id;

export const initiallyCompletedHiraganaRows = Object.entries(hiraganaProgress)
  .filter(([, value]) => value.status === "done")
  .map(([rowId]) => rowId);

const katakanaProgress: Record<
  string,
  { status: UnitStatus; progress: number }
> = {};

export const initiallyCompletedKatakanaRows = Object.entries(katakanaProgress)
  .filter(([, value]) => value.status === "done")
  .map(([rowId]) => rowId);

function buildKanaUnits(
  rows: KanaRow[],
  idPrefix: string,
  progress: Record<string, { status: UnitStatus; progress: number }>,
): LearningUnit[] {
  return rows.map((row, index) => {
    const total = row.characters.length;
    const state = progress[row.id] ?? {
      status: "available",
      progress: 0,
    };

    return {
      id: `${idPrefix}-${row.id}`,
      index: String(index + 1).padStart(2, "0"),
      title: row.title,
      caption: row.characters.map((character) => character.kana).join(" "),
      status: state.status,
      progress: state.progress,
      meta: `${Math.round((state.progress / 100) * total)}/${total}`,
      lessonRow: row.id,
    };
  });
}

const hiraganaUnits = buildKanaUnits(hiraganaRows, "h", hiraganaProgress);
const katakanaUnits = buildKanaUnits(katakanaRows, "k", katakanaProgress);

export const learningLevels: LearningLevel[] = [
  {
    id: "n5",
    label: "N5",
    title: "Dasar",
    caption: "Hiragana · Katakana · Kanji",
    mark: "五",
    sections: [
      {
        id: "hiragana",
        mark: "あ",
        title: "Hiragana",
        caption: "46 dasar + 25 turunan",
        units: hiraganaUnits,
      },
      {
        id: "katakana",
        mark: "ア",
        title: "Katakana",
        caption: "46 dasar + 25 turunan",
        units: katakanaUnits,
      },
      {
        id: "kanji-n5",
        mark: "漢",
        title: "Kanji",
        caption: "Kanji dasar",
        units: [
          {
            id: "kn1",
            index: "01",
            title: "Kanji — angka & waktu",
            caption: "一 二 三 · 日 月 火",
            status: "locked",
            progress: 0,
            meta: "0/12",
          },
          {
            id: "kn2",
            index: "02",
            title: "Kanji — alam & benda",
            caption: "山 川 田 · 木 林 森",
            status: "locked",
            progress: 0,
            meta: "0/12",
          },
          {
            id: "kn3",
            index: "03",
            title: "Kanji — tubuh & arah",
            caption: "人 口 目 · 上 下 中",
            status: "locked",
            progress: 0,
            meta: "0/12",
          },
        ],
      },
    ],
  },
  {
    id: "n4",
    label: "N4",
    title: "Menengah",
    caption: "Kanji · Kosakata · Tata bahasa",
    mark: "四",
    sections: [
      {
        id: "kanji-n4",
        mark: "漢",
        title: "Kanji",
        caption: "Kanji lanjutan",
        units: [
          {
            id: "kn4-1",
            index: "01",
            title: "Kanji — verba sehari-hari",
            caption: "働 休 使 · 住 待 通",
            status: "locked",
            progress: 0,
            meta: "0/16",
          },
          {
            id: "kn4-2",
            index: "02",
            title: "Kanji — masyarakat & abstrak",
            caption: "心 体 力 · 場 合 意見",
            status: "locked",
            progress: 0,
            meta: "0/16",
          },
        ],
      },
      {
        id: "kosakata-n4",
        mark: "語",
        title: "Kosakata",
        caption: "Kosakata N4",
        units: [
          {
            id: "ko4-1",
            index: "01",
            title: "Kosakata — rumah & kota",
            caption: "Transportasi, arah, tempat umum",
            status: "locked",
            progress: 0,
            meta: "0/40",
          },
          {
            id: "ko4-2",
            index: "02",
            title: "Kosakata — pekerjaan & waktu",
            caption: "Kantor, jadwal, aktivitas harian",
            status: "locked",
            progress: 0,
            meta: "0/40",
          },
        ],
      },
      {
        id: "tata-bahasa-n4",
        mark: "文",
        title: "Tata bahasa",
        caption: "Tata bahasa N4",
        units: [
          {
            id: "tb4-1",
            index: "01",
            title: "Pola — sebab & akibat",
            caption: "から · ので · ために",
            status: "locked",
            progress: 0,
            meta: "0/10",
          },
          {
            id: "tb4-2",
            index: "02",
            title: "Pola — syarat & dugaan",
            caption: "と · ば · たら · なら",
            status: "locked",
            progress: 0,
            meta: "0/10",
          },
        ],
      },
    ],
  },
];

export const todayQuests = [
  { label: "Selesaikan 2 pelajaran", progress: 1, target: 2, xp: 30 },
  { label: "Tulis 20 karakter", progress: 14, target: 20, xp: 20 },
  { label: "Ulangi 15 kartu", progress: 15, target: 15, xp: 25, done: true },
];

export const reviewQueue = [
  { id: "r1", term: "食べる", reading: "たべる", meaning: "makan", type: "Kosakata · N5", due: "sekarang" },
  { id: "r2", term: "日", reading: "ひ / にち", meaning: "hari · matahari", type: "Kanji · N5", due: "3 mnt" },
  { id: "r3", term: "あ", reading: "a", meaning: "vokal a", type: "Hiragana", due: "8 mnt" },
  { id: "r4", term: "学校", reading: "がっこう", meaning: "sekolah", type: "Kosakata · N5", due: "besok" },
];

export const reviewIntervals = [
  { label: "Lagi", detail: "1 mnt", tone: "muted" as const },
  { label: "Sulit", detail: "6 mnt", tone: "muted" as const },
  { label: "Bagus", detail: "10 mnt", tone: "ink" as const },
  { label: "Mudah", detail: "4 jam", tone: "ink" as const },
];

export const heatmap: number[] = Array.from({ length: 182 }, (_, index) => {
  if (index < 26) return 0;
  if (index >= 170) return index % 4 === 0 ? 2 : 3;
  const seed = (index * 37) % 13;
  if (seed < 3) return 0;
  if (seed < 6) return 1;
  if (seed < 10) return 2;
  return 3;
});

export const badges = [
  { mark: "初", title: "Goresan pertama", note: "1 karakter selesai", unlocked: true, date: "2 Sep" },
  { mark: "七", title: "Tujuh hari", note: "Belajar 7 hari", unlocked: true, date: "8 Sep" },
  { mark: "漢", title: "Penjaga kanji", note: "50 kanji dikuasai", unlocked: true, date: "21 Sep" },
  { mark: "声", title: "Suara pertama", note: "Sesi sensei 1 menit", unlocked: true, date: "24 Sep" },
  { mark: "百", title: "Seratus kartu", note: "100 kartu diulang", unlocked: false, date: "—" },
  { mark: "完", title: "N5 lengkap", note: "Semua unit N5", unlocked: false, date: "—" },
];

export type LessonOption = {
  id: string;
  label: string;
  correct: boolean;
};

export type LessonQuestion = {
  prompt: string;
  character: string;
  hint: string;
  options: LessonOption[];
  explanation: string;
};

const scriptKana: Record<KanaScript, string[]> = {
  hiragana: hiraganaRows.flatMap((row) =>
    row.characters.map((character) => character.kana),
  ),
  katakana: katakanaRows.flatMap((row) =>
    row.characters.map((character) => character.kana),
  ),
};

const scriptRomaji: Record<KanaScript, string[]> = {
  hiragana: hiraganaRows.flatMap((row) =>
    row.characters.map((character) => character.romaji),
  ),
  katakana: katakanaRows.flatMap((row) =>
    row.characters.map((character) => character.romaji),
  ),
};

function buildOptions(
  correct: string,
  rowValues: string[],
  allValues: string[],
  position: number,
): LessonOption[] {
  const seen = new Set([correct]);
  const distractors: string[] = [];

  for (const value of [...rowValues, ...allValues]) {
    if (distractors.length === 3) break;
    if (seen.has(value)) continue;
    seen.add(value);
    distractors.push(value);
  }

  const labels = [correct, ...distractors];
  const shift = position % labels.length;
  const ordered = labels.map(
    (_, index) => labels[(index + shift) % labels.length],
  );

  return ordered.map((label) => ({
    id: label,
    label,
    correct: label === correct,
  }));
}

export function getKanaQuestions(rowId: string): LessonQuestion[] {
  const row = findKanaRow(rowId) ?? hiraganaRows[0];

  return row.characters.map((character, index) => {
    const kanaToRomaji = index % 2 === 0;
    const correct = kanaToRomaji ? character.romaji : character.kana;
    // Variants such as じ/ぢ (ji) share a romaji; don't offer them as
    // distractors when the question asks which kana is read that way.
    const sameRomajiKana = new Set(
      kanaRowsForScript(row.script)
        .flatMap((item) => item.characters)
        .filter(
          (item) =>
            item.romaji === character.romaji && item.kana !== character.kana,
        )
        .map((item) => item.kana),
    );
    const isDistractor = (value: string) =>
      kanaToRomaji || !sameRomajiKana.has(value);
    const rowValues = row.characters
      .map((item) => (kanaToRomaji ? item.romaji : item.kana))
      .filter(isDistractor);
    const allValues = (
      kanaToRomaji ? scriptRomaji[row.script] : scriptKana[row.script]
    ).filter(isDistractor);

    return {
      prompt: kanaToRomaji
        ? "Manakah bacaan yang benar dari karakter ini?"
        : `Karakter mana yang dibaca “${character.romaji}”?`,
      character: kanaToRomaji ? character.kana : "?",
      hint: `${row.title}: ${row.characters
        .map((item) => item.kana)
        .join(" ")}.`,
      options: buildOptions(correct, rowValues, allValues, index),
      explanation: `${character.kana} dibaca “${character.romaji}”.${
        character.note ? ` ${character.note}` : ""
      }`,
    };
  });
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

export function getKanaExamQuestions(script: KanaScript): LessonQuestion[] {
  const characters = shuffle(
    kanaRowsForScript(script).flatMap((row) =>
      row.characters.map((character) => ({ ...character, row })),
    ),
  );

  return characters.map((character, index) => {
    const kanaToRomaji = index % 2 === 0;
    const correct = kanaToRomaji ? character.romaji : character.kana;
    const candidates = kanaToRomaji
      ? characters.map((item) => item.romaji)
      : characters
          .filter((item) => item.romaji !== character.romaji)
          .map((item) => item.kana);

    return {
      prompt: kanaToRomaji
        ? "Manakah bacaan yang benar dari karakter ini?"
        : `Karakter mana yang dibaca “${character.romaji}”?`,
      character: kanaToRomaji ? character.kana : "?",
      hint: `${character.row.title}: ${character.row.characters
        .map((item) => item.kana)
        .join(" ")}.`,
      options: buildOptions(correct, candidates, candidates, index),
      explanation: `${character.kana} dibaca “${character.romaji}”.${
        character.note ? ` ${character.note}` : ""
      }`,
    };
  });
}

export const senseiModes = [
  { title: "Percakapan bebas", note: "Topik apa saja, level N5", active: true },
  { title: "Roleplay kafe", note: "Memesan makanan", active: false },
  { title: "Latih pelafalan", note: "Kata yang sering salah", active: false },
];

export const senseiTranscript = [
  { role: "sensei" as const, jp: "こんばんは。今日は何をしましたか。", id: "Selamat malam. Hari ini melakukan apa?" },
  { role: "user" as const, jp: "日本語を勉強しました。", id: "Saya belajar bahasa Jepang." },
  { role: "sensei" as const, jp: "すごいですね。何時間勉強しましたか。", id: "Hebat. Berapa jam belajar?" },
  { role: "user" as const, jp: "一時間です。", id: "Satu jam." },
];
