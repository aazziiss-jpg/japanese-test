"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import {
  BookOpen,
  GraduationCap,
  Layers,
  Mic,
  Pencil,
  Sparkles,
} from "lucide-react";
import {
  buildHeatmap,
  buildHistory,
  formatActivityTime,
  formatMinutes,
  getActivityLogServerSnapshot,
  getActivityLogSnapshot,
  parseActivityLog,
  subscribeActivityLog,
  summarizeActivity,
  type ActivityKind,
} from "@/lib/preview-activity";
import { cn } from "@/lib/cn";

const dayLabels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const kindMeta: Record<
  ActivityKind,
  { label: string; icon: typeof BookOpen }
> = {
  lesson: { label: "Pelajaran", icon: BookOpen },
  exam: { label: "Ujian", icon: GraduationCap },
  writing: { label: "Menulis", icon: Pencil },
  review: { label: "Ulangi", icon: Layers },
  sensei: { label: "Sensei", icon: Mic },
};

const levelClasses = [
  "bg-line",
  "bg-ink/15",
  "bg-ink/35",
  "bg-ink/60",
  "bg-ink",
] as const;

const quickLinks = [
  { href: "/preview/learn", label: "Mulai pelajaran" },
  { href: "/preview/writing", label: "Latihan menulis" },
  { href: "/preview/review", label: "Ulangi kartu" },
];

export function ProfileDashboard() {
  const raw = useSyncExternalStore(
    subscribeActivityLog,
    getActivityLogSnapshot,
    getActivityLogServerSnapshot,
  );

  const events = useMemo(() => parseActivityLog(raw), [raw]);
  const summary = useMemo(() => summarizeActivity(events), [events]);
  const heatmap = useMemo(() => buildHeatmap(events), [events]);
  const history = useMemo(() => buildHistory(events).slice(0, 30), [events]);

  const stats = [
    {
      label: "Aktivitas",
      value: summary.total.toString(),
      unit: "sesi selesai",
    },
    {
      label: "Hari aktif",
      value: summary.activeDays.toString(),
      unit: "hari menyala",
    },
    {
      label: "Runtutan",
      value: summary.streak.toString(),
      unit: summary.streak > 0 ? "hari beruntun" : "mulai hari ini",
    },
    {
      label: "Waktu belajar",
      value: formatMinutes(summary.minutes),
      unit: "estimasi",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
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

      {events.length === 0 ? (
        <div className="flex flex-col gap-3 border border-dashed border-line bg-paper-sunken p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center border border-line bg-paper text-ink-faint">
              <Sparkles className="size-3.5" strokeWidth={1.5} />
            </span>
            <p className="max-w-xl text-[11.5px] leading-relaxed text-ink-muted">
              <span className="font-medium text-ink">Peta masih gelap.</span>{" "}
              Setiap pelajaran, latihan menulis, kartu ulangan, atau sesi sensei
              yang selesai akan menyalakan hari ini secara otomatis.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 pl-10 sm:justify-end sm:pl-0">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="border border-line bg-paper-raised p-5">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
            Peta kebiasaan · 27 minggu
          </span>
          <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink-faint">
            {summary.activeDays} hari aktif
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
            role="img"
            aria-label={`Peta kebiasaan ${summary.activeDays} hari aktif dalam 27 minggu terakhir`}
          >
            {heatmap.map((day, index) => (
              <span
                key={day.key}
                title={
                  day.future
                    ? undefined
                    : `${day.count} aktivitas · ${day.key}`
                }
                className={cn(
                  "size-3 rounded-[1px]",
                  index < 56 && "hidden sm:block",
                  day.future ? "bg-transparent" : levelClasses[day.level],
                )}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ink-faint">
          <span>sedikit</span>
          {levelClasses.map((level) => (
            <span key={level} className={cn("size-[9px]", level)} />
          ))}
          <span>banyak</span>
        </div>
      </div>

      <div className="border border-line bg-paper-raised">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
            Riwayat aktivitas
          </span>
          <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink-faint">
            {events.length} catatan
          </span>
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-start gap-2 px-5 py-8">
            <p className="text-[12.5px] text-ink-muted">
              Belum ada yang selesai. Riwayat akan terisi otomatis setelah kamu
              belajar.
            </p>
            <Link
              href="/preview/learn"
              className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink underline decoration-line underline-offset-4"
            >
              Buka peta belajar
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {history.map((item) => {
              const meta = kindMeta[item.kind];
              const Icon = meta.icon;

              return (
                <li
                  key={item.id}
                  className="flex items-start justify-between gap-3 px-4 py-3.5 sm:px-5"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center border border-line text-ink-muted">
                      <Icon className="size-3.5" strokeWidth={1.5} />
                    </span>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="truncate text-[12.5px]">{item.title}</span>
                      <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-ink-faint">
                        {meta.label} · {formatActivityTime(item.at)}
                      </span>
                    </div>
                  </div>
                  {item.detail ? (
                    <span className="shrink-0 pt-0.5 text-right font-mono text-[9.5px] leading-relaxed text-ink-muted">
                      {item.detail}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
