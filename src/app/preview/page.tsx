import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PreviewHeader } from "@/components/app/app-shell";
import { learner } from "@/data/preview";

const screens = [
  {
    href: "/preview/learn",
    index: "01",
    title: "Peta belajar",
    description:
      "Jalur unit yang terbuka bertahap, status penyelesaian, dan misi harian di satu layar.",
    mark: "道",
  },
  {
    href: "/preview/lesson",
    index: "02",
    title: "Pelajaran",
    description:
      "Kartu soal, pilihan jawaban, nyawa, dan panel koreksi yang tidak menghakimi.",
    mark: "問",
  },
  {
    href: "/preview/writing",
    index: "03",
    title: "Lab menulis",
    description:
      "Kanvas sentuh dengan panduan urutan goresan, petunjuk, dan akurasi real-time.",
    mark: "書",
  },
  {
    href: "/preview/review",
    index: "04",
    title: "Ulangi",
    description:
      "Kartu SRS dengan empat tingkat kesulitan dan jadwal berikutnya.",
    mark: "繰",
  },
  {
    href: "/preview/sensei",
    index: "05",
    title: "Sensei",
    description:
      "Percakapan suara, transkrip dua bahasa, dan ringkasan koreksi setelah sesi.",
    mark: "声",
  },
  {
    href: "/preview/profile",
    index: "06",
    title: "Profil",
    description:
      "Statistik, peta kebiasaan, koleksi lencana, dan riwayat sesi.",
    mark: "記",
  },
];

export default function PreviewIndex() {
  return (
    <div>
      <PreviewHeader
        eyebrow="Pratinjau · fase desain"
        title="Enam layar inti, satu bahasa visual."
        description="Semua layar memakai data contoh dan belum terhubung ke database. Tujuannya mengunci hierarki, tipografi, dan gerak sebelum logika dibuat."
        action={
          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1 bg-accent" />
              {learner.name}
            </span>
            <span className="h-3 w-px bg-line" />
            <span>12 hari beruntun</span>
          </div>
        }
      />

      <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {screens.map((screen) => (
          <Link
            key={screen.href}
            href={screen.href}
            className="group relative flex min-h-[150px] flex-col justify-between bg-paper p-5 transition-colors duration-500 hover:bg-paper-raised sm:min-h-[210px]"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[9.5px] tracking-[0.18em] text-ink-faint">
                {screen.index}
              </span>
              <span
                aria-hidden="true"
                className="font-serif-jp text-[34px] leading-none text-ink opacity-[0.08] transition-all duration-500 group-hover:opacity-20 group-hover:-translate-y-0.5"
              >
                {screen.mark}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em]">
                {screen.title}
                <ArrowUpRight
                  className="size-3.5 text-ink-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  strokeWidth={1.5}
                />
              </h2>
              <p className="text-[12px] leading-[1.65] text-ink-muted">
                {screen.description}
              </p>
            </div>

            <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-sumi)] group-hover:scale-x-100" />
          </Link>
        ))}
      </div>

      <p className="mt-6 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.14em] text-ink-faint">
        Tipografi Noto/Zen Kaku · Shippori Mincho · Geist · Gerak 180–480ms ·
        Palet monokrom
      </p>
    </div>
  );
}
