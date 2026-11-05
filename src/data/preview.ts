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

export type HiraganaCharacter = {
  kana: string;
  romaji: string;
  note?: string;
};

export type HiraganaRow = {
  id: string;
  label: string;
  title: string;
  characters: HiraganaCharacter[];
};

export const hiraganaRows: HiraganaRow[] = [
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

const hiraganaUnits: LearningUnit[] = hiraganaRows.map((row, index) => {
  const total = row.characters.length;
  const state = hiraganaProgress[row.id] ?? {
    status: "available",
    progress: 0,
  };

  return {
    id: `h-${row.id}`,
    index: String(index + 1).padStart(2, "0"),
    title: row.title,
    caption: row.characters.map((character) => character.kana).join(" "),
    status: state.status,
    progress: state.progress,
    meta: `${Math.round((state.progress / 100) * total)}/${total}`,
    lessonRow: row.id,
  };
});

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
        caption: "46 karakter",
        units: [
          {
            id: "k1",
            index: "01",
            title: "Katakana — vokal & baris K",
            caption: "ア イ ウ エ オ · カ キ ク ケ コ",
            status: "locked",
            progress: 0,
            meta: "0/10",
          },
          {
            id: "k2",
            index: "02",
            title: "Katakana — baris S & T",
            caption: "サ シ ス セ ソ · タ チ ツ テ ト",
            status: "locked",
            progress: 0,
            meta: "0/10",
          },
          {
            id: "k3",
            index: "03",
            title: "Katakana — baris N & H",
            caption: "ナ ニ ヌ ネ ノ · ハ ヒ フ ヘ ホ",
            status: "locked",
            progress: 0,
            meta: "0/10",
          },
          {
            id: "k4",
            index: "04",
            title: "Katakana — baris M, Y, R",
            caption: "マ ミ ム メ モ · ヤ ユ ヨ · ラ リ ル レ ロ",
            status: "locked",
            progress: 0,
            meta: "0/13",
          },
          {
            id: "k5",
            index: "05",
            title: "Katakana — baris W & N",
            caption: "ワ ヲ · ン",
            status: "locked",
            progress: 0,
            meta: "0/3",
          },
        ],
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

const hiraganaKana = hiraganaRows.flatMap((row) =>
  row.characters.map((character) => character.kana),
);
const hiraganaRomaji = hiraganaRows.flatMap((row) =>
  row.characters.map((character) => character.romaji),
);

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

export function getHiraganaQuestions(rowId: string): LessonQuestion[] {
  const row =
    hiraganaRows.find((item) => item.id === rowId) ?? hiraganaRows[0];

  return row.characters.map((character, index) => {
    const kanaToRomaji = index % 2 === 0;
    const correct = kanaToRomaji ? character.romaji : character.kana;
    const rowValues = row.characters.map((item) =>
      kanaToRomaji ? item.romaji : item.kana,
    );
    const allValues = kanaToRomaji ? hiraganaRomaji : hiraganaKana;

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

export function getHiraganaExamQuestions(): LessonQuestion[] {
  const characters = shuffle(
    hiraganaRows.flatMap((row) =>
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
