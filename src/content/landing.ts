export const site = {
  name: "Sumi",
  mark: "墨",
  reading: "すみ",
  year: 2026,
  tagline: "Menulis. Mengulang. Berbicara.",
  description:
    "Belajar bahasa Jepang N5 dan N4 dengan latihan menulis di layar, pengulangan pintar, dan sensei AI yang bisa diajak bicara.",
};

export const navLinks = [
  { href: "#menulis", label: "Menulis" },
  { href: "#sensei", label: "Sensei" },
  { href: "#kurikulum", label: "Kurikulum" },
  { href: "#kebiasaan", label: "Kebiasaan" },
];

export const hero = {
  eyebrow: "JLPT N5 — N4",
  title: ["Belajar Jepang,", "satu goresan", "setiap hari."],
  description:
    "Hiragana, katakana, kanji, kosakata, dan tata bahasa. Latih menulis langsung di layar, ulangi dengan sistem yang mengingat kelemahanmu, lalu berbicara dengan sensei AI.",
  primaryCta: { href: "/preview", label: "Mulai belajar" },
  secondaryCta: { href: "#menulis", label: "Coba menulis あ" },
  note: "Mulai dari N5 · Tanpa instalasi · Gratis untuk 1.000 goresan pertama",
  vertical: "にほんごを、かく。",
};

export const stats = [
  { value: 92, suffix: "", label: "kana" },
  { value: 103, suffix: "", label: "kanji N5" },
  { value: 800, suffix: "+", label: "kosakata" },
  { value: 80, suffix: "", label: "pola tata bahasa" },
];

export const pillars = [
  {
    number: "01",
    title: "Menulis",
    jp: "書く",
    description:
      "Bukan pilihan ganda. Latih urutan dan arah setiap goresan, dengan umpan balik yang sabar dan panduan yang bisa diulang.",
    detail: "Kanvas sentuh · validasi per goresan",
  },
  {
    number: "02",
    title: "Mengulang",
    jp: "繰り返す",
    description:
      "Kartu yang hampir kamu lupakan muncul kembali tepat sebelum hilang. Tidak ada daftar hafalan yang menumpuk.",
    detail: "FSRS · jadwal harian adaptif",
  },
  {
    number: "03",
    title: "Berbicara",
    jp: "話す",
    description:
      "Sensei AI mendengar pelafalanmu, mengoreksi dengan lembut, dan menyesuaikan percakapan dengan level yang sedang kamu pelajari.",
    detail: "Voice chat · transkrip & koreksi",
  },
];

export const trace = {
  eyebrow: "01 — Menulis",
  title: "Menulis, bukan menghafal.",
  description:
    "Setiap karakter punya urutan. Kami memandu goresan pertama sampai terakhir, lalu membiarkanmu mencoba sendiri. Salah satu goresan? Panduan muncul lagi tanpa menghakimi.",
  character: "日",
  reading: "ひ / にち",
  meaning: "matahari · hari",
  steps: [
    {
      title: "Ikuti panduan",
      description:
        "Garis tipis menunjukkan goresan berikutnya. Mulai dari titik yang benar, bukan sekadar bentuk akhirnya.",
    },
    {
      title: "Dapatkan koreksi",
      description:
        "Arah, panjang, dan titik awal dibandingkan secara lokal di perangkatmu. Tidak perlu menunggu server.",
    },
    {
      title: "Ulangi sampai lancar",
      description:
        "Karakter yang sama kembali muncul di sesi ulangan, tepat saat kamu mulai melupakannya.",
    },
  ],
  cta: { href: "/preview/writing", label: "Buka lab menulis" },
};

export const sensei = {
  eyebrow: "02 — Sensei",
  title: "Sensei yang ingat kelemahanmu.",
  description:
    "Bukan chatbot umum. Sebelum sesi dimulai, sensei membaca progresmu: karakter yang sering salah, kosakata yang belum stabil, dan pola tata bahasa yang baru dipelajari.",
  bullets: [
    "Percakapan 5 menit per hari, cukup untuk membangun keberanian.",
    "Koreksi pelafalan dan pilihan kata, tanpa memotong percakapan.",
    "Transkrip dan ringkasan koreksi tersimpan setelah sesi.",
  ],
  transcript: [
    {
      role: "sensei" as const,
      jp: "こんにちは。今日は何を食べましたか。",
      id: "Halo. Hari ini makan apa?",
    },
    {
      role: "user" as const,
      jp: "ラーメンを食べました。",
      id: "Saya makan ramen.",
    },
    {
      role: "sensei" as const,
      jp: "いいですね。もう一度、ゆっくり言ってみましょう。",
      id: "Bagus. Coba ucapkan sekali lagi, pelan-pelan.",
    },
  ],
  correction: {
    label: "Koreksi",
    before: "ラーメン",
    after: "らーめん",
    note: "Katakana sudah tepat. Latih panjang vokal 「らー」 agar tidak menjadi 「ら」.",
  },
  caption: "Sesi contoh · N5 · Percakapan sehari-hari",
};

export const curriculum = {
  eyebrow: "03 — Kurikulum",
  title: "Dari N5 ke N4, tanpa lompatan.",
  description:
    "Setiap unit dibangun dari karakter, kosakata, dan pola yang sudah kamu kuasai. Tidak ada materi yang muncul entah dari mana.",
  levels: [
    {
      level: "N5",
      title: "Fondasi",
      caption: "Membaca kana, memperkenalkan diri, percakapan sehari-hari.",
      state: "Tersedia",
      units: [
        { index: "01", title: "Hiragana & Katakana", meta: "92 karakter" },
        { index: "02", title: "Kanji dasar", meta: "103 kanji" },
        { index: "03", title: "Kosakata sehari-hari", meta: "800 kata" },
        { index: "04", title: "Tata bahasa dasar", meta: "80 pola" },
      ],
    },
    {
      level: "N4",
      title: "Perluasan",
      caption: "Kanji majemuk, percakapan kantor, membaca teks pendek.",
      state: "Segera",
      units: [
        { index: "05", title: "Kanji lanjutan", meta: "181 kanji" },
        { index: "06", title: "Kosakata & kanji majemuk", meta: "1.500 kata" },
        { index: "07", title: "Tata bahasa menengah", meta: "90 pola" },
        { index: "08", title: "Membaca & percakapan", meta: "24 teks" },
      ],
    },
  ],
};

export const habit = {
  eyebrow: "04 — Kebiasaan",
  title: "Kebiasaan yang bertahan.",
  description:
    "Streak yang jujur, target harian yang masuk akal, dan hadiah yang tidak mengganggu belajar. Tidak ada nyawa yang habis, tidak ada rasa bersalah.",
  xp: { current: 1240, target: 1500, level: 7, title: "Pemula Tekun" },
  streak: { days: 12, best: 21, week: "Minggu ini" },
  badges: [
    { mark: "初", title: "Goresan pertama", note: "Selesaikan 1 karakter" },
    { mark: "七", title: "Tujuh hari", note: "Streak 7 hari" },
    { mark: "漢", title: "Penjaga kanji", note: "50 kanji dikuasai" },
    { mark: "声", title: "Suara pertama", note: "Sesi sensei 1 menit" },
  ],
  quests: [
    { label: "Selesaikan 2 pelajaran", progress: 1, target: 2, xp: 30 },
    { label: "Tulis 20 karakter", progress: 14, target: 20, xp: 20 },
    { label: "Ulangi 15 kartu", progress: 15, target: 15, xp: 25, done: true },
  ],
};

export const finalCta = {
  eyebrow: "Mulai hari ini",
  title: "Mulai dari satu karakter hari ini.",
  description:
    "Tidak perlu menunggu motivasi besar. Satu goresan, satu kartu, satu kalimat — setiap hari.",
  cta: { href: "/login", label: "Masuk" },
  secondary: { href: "#kurikulum", label: "Lihat kurikulum" },
};

export const footer = {
  columns: [
    {
      title: "Produk",
      links: [
        { label: "Belajar", href: "/preview/learn" },
        { label: "Lab menulis", href: "/preview/writing" },
        { label: "Ulangi", href: "/preview/review" },
        { label: "Sensei", href: "/preview/sensei" },
      ],
    },
    {
      title: "Kurikulum",
      links: [
        { label: "JLPT N5", href: "#kurikulum" },
        { label: "JLPT N4", href: "#kurikulum" },
        { label: "Metode", href: "#menulis" },
        { label: "Pratinjau layar", href: "/preview" },
      ],
    },
    {
      title: "Tentang",
      links: [
        { label: "Filosofi", href: "#kebiasaan" },
        { label: "Atribusi data", href: "#atribusi" },
        { label: "Kontak", href: "mailto:halo@sumi.example" },
      ],
    },
  ],
  attribution:
    "Data goresan diturunkan dari KanjiVG (CC BY-SA 3.0). Kosakata dan contoh kalimat mengacu pada JMdict dan Tatoeba dengan atribusi.",
};
