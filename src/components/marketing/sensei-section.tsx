import { Check, Mic } from "lucide-react";
import { Reveal, Section } from "@/components/ui/section";
import { sensei } from "@/content/landing";
import { cn } from "@/lib/cn";

const BAR_HEIGHTS = [10, 18, 26, 14, 34, 22, 40, 16, 30, 12, 24, 36, 18, 28, 10];

export function SenseiSection() {
  return (
    <Section id="sensei" className="border-t border-line">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <div className="flex flex-col gap-6">
            <p className="flex items-center gap-3 font-mono text-eyebrow uppercase text-ink-muted">
              <span className="inline-block size-1.5 bg-accent" aria-hidden="true" />
              {sensei.eyebrow}
            </p>
            <h2 className="max-w-lg text-balance text-display">{sensei.title}</h2>
            <p className="max-w-md text-pretty text-[15px] leading-[1.75] text-ink-muted">
              {sensei.description}
            </p>
            <ul className="flex flex-col gap-3 border-t border-line pt-6">
              {sensei.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-[13.5px] text-ink-soft">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-ink"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative border border-white/10 bg-[#08080a] p-1.5 text-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)]">
            <div className="border border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                  </span>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/50">
                    {sensei.caption}
                  </span>
                </div>
                <span className="font-mono text-[9.5px] tabular text-white/35">
                  00:42
                </span>
              </div>

              <div className="flex flex-col gap-3 px-5 py-6">
                {sensei.transcript.map((line, index) => (
                  <div
                    key={`${line.role}-${index}`}
                    className={cn(
                      "flex flex-col gap-1",
                      line.role === "user" && "items-end text-right",
                    )}
                  >
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-white/30">
                      {line.role === "sensei" ? "Sensei" : "Kamu"}
                    </span>
                    <div
                      className={cn(
                        "max-w-[86%] px-3.5 py-2.5",
                        line.role === "sensei"
                          ? "bg-white/[0.06]"
                          : "border border-white/20",
                      )}
                    >
                      <p className="font-jp text-[15px] leading-relaxed tracking-wide text-white/92">
                        {line.jp}
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-white/40">
                        {line.id}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="mt-1 border-l-2 border-accent bg-white/[0.04] px-4 py-3">
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-accent">
                    {sensei.correction.label}
                  </p>
                  <p className="mt-1.5 flex items-baseline gap-2 font-jp text-[13px] text-white/85">
                    <span className="text-white/35 line-through">
                      {sensei.correction.before}
                    </span>
                    <span className="text-white/35">→</span>
                    <span>{sensei.correction.after}</span>
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-white/45">
                    {sensei.correction.note}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t border-white/10 px-5 py-4">
                <button
                  type="button"
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#08080a] transition-transform duration-300 hover:scale-[1.04] active:scale-95"
                  aria-label="Mulai bicara (contoh)"
                >
                  <Mic className="size-[18px]" strokeWidth={1.5} />
                </button>
                <div className="flex h-10 flex-1 items-center gap-[3px]" aria-hidden="true">
                  {BAR_HEIGHTS.map((height, index) => (
                    <span
                      key={index}
                      className="w-full origin-center animate-[wave_1.25s_ease-in-out_infinite] bg-white/35"
                      style={{
                        height: `${height}px`,
                        animationDelay: `${index * 70}ms`,
                      }}
                    />
                  ))}
                </div>
                <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-white/30 sm:block">
                  tahan untuk bicara
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
