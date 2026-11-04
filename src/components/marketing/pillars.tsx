import { Reveal, Section, SectionHeading } from "@/components/ui/section";
import { pillars } from "@/content/landing";

export function Pillars() {
  return (
    <Section className="border-t border-line">
      <div className="flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Metode"
              title={
                <>
                  Bukan sekadar kuis
                  <span className="text-accent">.</span>
                </>
              }
              description="Tiga latihan yang saling menopang. Menulis membangun ingatan bentuk, ulangan menjaga ingatan itu tetap ada, percakapan mengubahnya menjadi kemampuan nyata."
            />
            <p className="hidden shrink-0 pb-1 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.14em] text-ink-faint md:block">
              sesi 5–10 menit
              <br />
              setiap hari
            </p>
          </div>
        </Reveal>

        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.number} delay={index * 0.07}>
              <div className="group relative flex h-full min-h-[260px] flex-col gap-5 bg-paper p-7 transition-colors duration-500 hover:bg-paper-raised">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-ink-faint">
                    {pillar.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-serif-jp text-4xl leading-none text-ink opacity-10 transition-opacity duration-500 group-hover:opacity-25"
                  >
                    {pillar.jp}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-title">{pillar.title}</h3>
                  <p className="max-w-sm text-[13.5px] leading-[1.75] text-ink-muted">
                    {pillar.description}
                  </p>
                </div>
                <p className="mt-auto pt-8 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
                  {pillar.detail}
                </p>
                <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-sumi)] group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
