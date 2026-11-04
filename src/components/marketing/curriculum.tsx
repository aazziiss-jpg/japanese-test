import { Reveal, Section, SectionHeading } from "@/components/ui/section";
import { curriculum } from "@/content/landing";
import { cn } from "@/lib/cn";

export function Curriculum() {
  return (
    <Section id="kurikulum" className="border-t border-line bg-paper-sunken">
      <Reveal>
        <SectionHeading
          eyebrow={curriculum.eyebrow}
          title={curriculum.title}
          description={curriculum.description}
        />
      </Reveal>

      <div className="relative mt-14">
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-2 bottom-2 w-px bg-line-strong"
        />

        <div className="flex flex-col gap-14">
          {curriculum.levels.map((level, levelIndex) => (
            <Reveal key={level.level} delay={levelIndex * 0.08}>
              <div className="relative pl-10">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-2 size-[11px] border",
                    levelIndex === 0
                      ? "border-ink bg-ink"
                      : "border-line-strong bg-paper",
                  )}
                />

                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[clamp(2rem,5vw,3rem)] leading-[0.85] tracking-[-0.05em]">
                        {level.level}
                      </span>
                      <h3 className="text-title">{level.title}</h3>
                    </div>
                    <p className="max-w-md text-[13px] text-ink-muted">
                      {level.caption}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em]",
                      level.state === "Tersedia"
                        ? "border-ink/20 text-ink"
                        : "border-line-strong text-ink-faint",
                    )}
                  >
                    {level.state}
                  </span>
                </div>

                <div className="mt-px grid gap-px bg-line sm:grid-cols-2">
                  {level.units.map((unit) => (
                    <div
                      key={unit.index}
                      className="group flex items-center justify-between gap-4 bg-paper p-5 transition-colors duration-400 hover:bg-paper-raised"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-[10px] text-ink-faint">
                          {unit.index}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <h4 className="text-[14px] font-medium tracking-[-0.01em]">
                            {unit.title}
                          </h4>
                          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                            {unit.meta}
                          </p>
                        </div>
                      </div>
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
