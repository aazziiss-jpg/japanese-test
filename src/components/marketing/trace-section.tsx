import { ArrowUpRight } from "lucide-react";
import { TraceDemo } from "@/components/marketing/trace-demo";
import { Reveal, Section, SectionHeading } from "@/components/ui/section";
import { buttonClasses } from "@/components/ui/button";
import { trace } from "@/content/landing";

export function TraceSection() {
  return (
    <Section id="menulis" className="border-t border-line bg-paper-sunken">
      <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading
              eyebrow={trace.eyebrow}
              title={trace.title}
              description={trace.description}
            />
          </Reveal>

          <ol className="flex flex-col">
            {trace.steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <li className="group grid grid-cols-[auto_1fr] gap-5 border-t border-line py-5 last:border-b">
                  <span className="mt-0.5 font-mono text-[10px] text-ink-faint">
                    0{index + 1}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[15px] font-medium tracking-[-0.01em]">
                      {step.title}
                    </h3>
                    <p className="max-w-md text-[13px] leading-[1.7] text-ink-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <a
              href={trace.cta.href}
              className={buttonClasses({ variant: "outline", size: "md" })}
            >
              {trace.cta.label}
              <ArrowUpRight className="size-4" strokeWidth={1.4} />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="lg:sticky lg:top-24">
          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
              <div className="flex items-baseline gap-4">
                <span className="font-serif-jp text-6xl leading-none">
                  {trace.character}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    {trace.reading}
                  </span>
                  <span className="text-[13px] text-ink-muted">{trace.meaning}</span>
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                kanji · 4 goresan
              </span>
            </div>
            <TraceDemo glyphKey="hi" autoHintDelay={10000} />
            <p className="font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.14em] text-ink-faint">
              Validasi berjalan di perangkat · tanpa mengirim gambar ke server
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
