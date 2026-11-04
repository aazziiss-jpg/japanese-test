export const learner = {
  name: "Rani",
  handle: "@rani.n5",
  level: 7,
  levelTitle: "Pemula Tekun",
  xp: 1240,
  xpTarget: 1500,
  streak: 12,
  bestStreak: 21,
  hearts: 4,
  gems: 320,
  joined: "September 2026",
  accuracy: 92,
  minutes: 184,
  cardsLearned: 214,
  characters: 58,
};

export const units = [
  {
    id: "u1",
    index: "01",
    title: "Hiragana — baris dasar",
    caption: "あ い う え お · 10 karakter",
    status: "done" as const,
    progress: 100,
    meta: "10/10",
  },
  {
    id: "u2",
    index: "02",
    title: "Hiragana — baris K & S",
    caption: "か き く け こ · さ し す せ そ",
    status: "active" as const,
    progress: 60,
    meta: "6/10",
  },
  {
    id: "u3",
    index: "03",
    title: "Hiragana — baris T & N",
    caption: "た ち つ て と · な に ぬ ね の",
    status: "locked" as const,
    progress: 0,
    meta: "0/10",
  },
  {
    id: "u4",
    index: "04",
    title: "Hiragana — baris H & M",
    caption: "は ひ ふ へ ほ · ま み む め も",
    status: "locked" as const,
    progress: 0,
    meta: "0/10",
  },
  {
    id: "u5",
    index: "05",
    title: "Hiragana — Y, R, W, N",
    caption: "や ゆ よ · ら り る れ ろ · わ を ん",
    status: "locked" as const,
    progress: 0,
    meta: "0/12",
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
  { mark: "七", title: "Tujuh hari", note: "Streak 7 hari", unlocked: true, date: "8 Sep" },
  { mark: "漢", title: "Penjaga kanji", note: "50 kanji dikuasai", unlocked: true, date: "21 Sep" },
  { mark: "声", title: "Suara pertama", note: "Sesi sensei 1 menit", unlocked: true, date: "24 Sep" },
  { mark: "百", title: "Seratus kartu", note: "100 kartu diulang", unlocked: false, date: "—" },
  { mark: "完", title: "N5 lengkap", note: "Semua unit N5", unlocked: false, date: "—" },
];

export const lessonQuestions = [
  {
    prompt: "Manakah bacaan yang benar dari karakter ini?",
    character: "あ",
    hint: "Vokal terbuka, seperti 'a' pada kata 'ayah'.",
    options: [
      { id: "a", label: "a", correct: true },
      { id: "i", label: "i", correct: false },
      { id: "u", label: "u", correct: false },
      { id: "e", label: "e", correct: false },
    ],
    explanation:
      "あ dibaca “a”, vokal paling terbuka dalam bahasa Jepang. Bentuknya berasal dari kanji 安 yang disederhanakan.",
  },
  {
    prompt: "Karakter mana yang dibaca “ka”?",
    character: "?",
    hint: "Baris K: か き く け こ.",
    options: [
      { id: "ka", label: "か", correct: true },
      { id: "ki", label: "き", correct: false },
      { id: "sa", label: "さ", correct: false },
      { id: "ta", label: "た", correct: false },
    ],
    explanation: "か adalah karakter pertama baris K. Perhatikan goresan ketiga yang menyerupai kail.",
  },
];

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
