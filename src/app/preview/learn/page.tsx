import Link from "next/link";
import {
  ArrowRight,
  Check,
  Lock,
  Play,
} from "lucide-react";
import { MiniStat, PreviewHeader } from "@/components/app/app-shell";
import { learner, todayQuests, units } from "@/data/preview";
import { cn } from "@/lib/cn";

export default function LearnPage() {
  return (
    <div>
      <PreviewHeader
        eyebrow="Peta belajar · JLPT N5"
        title={`Selamat malam, ${learner.name}.`}
        description="Lanjutkan dari tempat kamu berhenti. Dua pelajaran lagi untuk menyelesaikan baris K dan S."
        action={
          <div className="flex flex-wrap gap-2">
            <MiniStat icon="flame" label="Streak" value={`${learner.streak} hari`} accent />
            <MiniStat icon="heart" label="Nyawa" value={`${learner.hearts}/5`} />
            <MiniStat icon="sparkles" label="XP" value={`${learner.xp}`} />
          </div>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute left-[19px] top-4 bottom-10 w-px bg-line"
          />
          <ol className="flex flex-col gap-3">
            {units.map((unit) => {
              const locked = unit.status === "locked";
              const active = unit.status === "active";
              const done = unit.status === "done";

              return (
                <li key={unit.id} className="relative pl-12">
                  <span
                    className={cn(
                      "absolute left-0 top-5 grid size-10 place-items-center border font-mono text-[10px]",
                      done && "border-ink bg-ink text-paper",
                      active && "border-ink bg-paper text-ink",
                      locked && "border-line bg-paper text-ink-faint",
                    )}
                  >
                    {done ? (
                      <Check className="size-4" strokeWidth={2} />
                    ) : locked ? (
                      <Lock className="size-3.5" strokeWidth={1.5} />
                    ) : (
                      unit.index
                    )}
                  </span>

                  <div
                    className={cn(
                      "flex items-center justify-between gap-4 border p-4 transition-colors duration-300",
                      active
                        ? "border-ink bg-paper-raised"
                        : "border-line bg-paper-raised/50",
                      locked && "opacity-55",
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-[14px] font-medium tracking-[-0.01em]">
                          {unit.title}
                        </h2>
                        {active ? (
                          <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-accent-foreground">
                            lanjutkan
                          </span>
                        ) : null}
                      </div>
                      <p className="font-jp text-[11.5px] tracking-wide text-ink-muted">
                        {unit.caption}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-px w-24 bg-line" aria-hidden="true">
                          <div
                            className="h-full bg-ink"
                            style={{ width: `${unit.progress}%` }}
                          />
                        </div>
                        <span className="font-mono text-[9px] tabular text-ink-faint">
                          {unit.meta}
                        </span>
                      </div>
                    </div>

                    {locked ? (
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                        terkunci
                      </span>
                    ) : (
                      <Link
                        href="/preview/lesson"
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-[3px] border transition-colors",
                          active
                            ? "border-ink bg-ink text-paper hover:bg-ink-soft"
                            : "border-line text-ink-muted hover:border-ink hover:text-ink",
                        )}
                        aria-label={`Buka pelajaran ${unit.title}`}
                      >
                        <Play className="size-3.5" strokeWidth={1.5} />
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="border border-line bg-paper-raised">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                Misi hari ini
              </span>
              <span className="font-mono text-[9px] text-ink-muted">1/3</span>
            </div>
            <div className="flex flex-col gap-4 p-4">
              {todayQuests.map((quest) => (
                <div key={quest.label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-[12px]">
                      {quest.done ? (
                        <Check className="size-3.5" strokeWidth={2} />
                      ) : (
                        <span className="size-3.5 border border-line-strong" />
                      )}
                      {quest.label}
                    </span>
                    <span className="font-mono text-[9px] text-ink-faint">
                      +{quest.xp}
                    </span>
                  </div>
                  <div className="h-px bg-line" aria-hidden="true">
                    <div
                      className={cn(
                        "h-full",
                        quest.done ? "bg-ink" : "bg-ink-muted",
                      )}
                      style={{
                        width: `${(quest.progress / quest.target) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-ink bg-ink p-5 text-paper">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-paper/40">
              Antrean ulangan
            </span>
            <p className="mt-3 font-mono text-[2.2rem] leading-none tabular">
              12
            </p>
            <p className="mt-1 text-[11px] text-paper/50">
              kartu jatuh tempo hari ini
            </p>
            <Link
              href="/preview/review"
              className="mt-5 flex h-9 items-center justify-center gap-2 border border-paper/25 text-[11px] transition-colors hover:bg-paper hover:text-ink"
            >
              Mulai ulangi
              <ArrowRight className="size-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="border border-line p-4">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink-faint">
              Terakhir ditulis
            </span>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-serif-jp text-4xl leading-none">か</span>
              <div className="flex flex-col">
                <span className="text-[12px]">ka</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">
                  3 goresan · 94%
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
