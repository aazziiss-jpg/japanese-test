import { PreviewHeader } from "@/components/app/app-shell";
import { badges, heatmap, learner } from "@/data/preview";
import { cn } from "@/lib/cn";

const dayLabels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const stats = [
  { label: "Karakter", value: learner.characters.toString(), unit: "dari 92 dikuasai" },
  { label: "Kartu diulang", value: learner.cardsLearned.toString(), unit: "total" },
  { label: "Akurasi menulis", value: `${learner.accuracy}%`, unit: "30 hari" },
  { label: "Waktu belajar", value: learner.minutes.toString(), unit: "menit" },
];

const activity = [
  { time: "Hari ini · 20:14", title: "Hiragana — baris K & S", meta: "6/10 · 84 XP" },
  { time: "Hari ini · 19:52", title: "Lab menulis · か", meta: "3 goresan · 94%" },
  { time: "Kemarin · 21:03", title: "Sensei · Percakapan bebas", meta: "4 menit · 3 koreksi" },
  { time: "Kemarin · 20:31", title: "Ulangi · 24 kartu", meta: "retensi 92%" },
];

export default function ProfilePage() {
  return (
    <div>
      <PreviewHeader
        eyebrow="Profil"
        title="Progres pribadi."
        description="Kebiasaan, statistik, dan lencana."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex min-w-0 flex-col gap-6">
          <div className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-paper p-4">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-faint">
                  {stat.label}
                </span>
                <p className="mt-2 font-mono text-[1.6rem] leading-none tabular">
                  {stat.value}
                </p>
                <span className="mt-1 block font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink-faint">
                  {stat.unit}
                </span>
              </div>
            ))}
          </div>

          <div className="border border-line bg-paper-raised p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                Peta kebiasaan · 6 bulan
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              <div className="flex shrink-0 flex-col gap-[3px] py-0.5 font-mono text-[7.5px] uppercase leading-none tracking-[0.08em] text-ink-faint">
                {dayLabels.map((day) => (
                  <span key={day} className="grid h-3 items-center">
                    {day}
                  </span>
                ))}
              </div>
              <div
                className="grid grid-flow-col grid-rows-7 gap-[3px]"
                aria-hidden="true"
              >
                {heatmap.map((level, index) => (
                  <span
                    key={index}
                    className={cn(
                      "size-3",
                      Math.floor(index / 7) < 10 && "hidden sm:block",
                      level === 0 && "bg-line",
                      level === 1 && "bg-ink/20",
                      level === 2 && "bg-ink/45",
                      level === 3 && "bg-ink",
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ink-faint">
              <span>sedikit</span>
              <span className="size-[9px] bg-line" />
              <span className="size-[9px] bg-ink/20" />
              <span className="size-[9px] bg-ink/45" />
              <span className="size-[9px] bg-ink" />
              <span>banyak</span>
            </div>
          </div>

          <div className="border border-line bg-paper-raised">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                Aktivitas terakhir
              </span>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink-faint">
                7 hari
              </span>
            </div>
            <ul className="divide-y divide-line">
              {activity.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3.5"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12.5px]">{item.title}</span>
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-ink-faint">
                      {item.time}
                    </span>
                  </div>
                  <span className="font-mono text-[9.5px] text-ink-muted">
                    {item.meta}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="border border-line bg-paper-raised">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                Lencana
              </span>
              <span className="font-mono text-[9px] text-ink-muted">
                {badges.filter((badge) => badge.unlocked).length}/{badges.length}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-px bg-line">
              {badges.map((badge) => (
                <div
                  key={badge.title}
                  className={cn(
                    "flex flex-col items-center gap-2 bg-paper px-2 py-4 text-center",
                    !badge.unlocked && "opacity-40",
                  )}
                  title={badge.note}
                >
                  <span
                    className={cn(
                      "grid size-10 place-items-center border font-serif-jp text-base",
                      badge.unlocked
                        ? "border-ink bg-ink text-paper"
                        : "border-line-strong text-ink-faint",
                    )}
                  >
                    {badge.mark}
                  </span>
                  <span className="text-[9.5px] leading-tight">{badge.title}</span>
                  <span className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-ink-faint">
                    {badge.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-line p-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
              Target mingguan
            </span>
            <div className="mt-3 flex flex-col gap-3">
              <div className="flex items-center justify-between text-[11.5px]">
                <span className="text-ink-muted">Pelajaran</span>
                <span className="font-mono">4 / 6</span>
              </div>
              <div className="flex items-center justify-between text-[11.5px]">
                <span className="text-ink-muted">Karakter baru</span>
                <span className="font-mono">12 / 20</span>
              </div>
              <div className="flex items-center justify-between text-[11.5px]">
                <span className="text-ink-muted">Sesi sensei</span>
                <span className="font-mono">2 / 3</span>
              </div>
            </div>
          </div>

          <div className="border border-line bg-paper-sunken p-4">
            <p className="text-[11.5px] leading-relaxed text-ink-muted">
              <span className="font-medium text-ink">Catatan desain.</span> Profil
              tidak menampilkan peringkat global secara default — hanya progres
              pribadi dan lencana, agar tidak mendorong belajar berlebihan.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
