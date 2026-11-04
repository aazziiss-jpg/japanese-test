import { Reveal } from "@/components/ui/section";
import { ButtonLink, ArrowGlyph } from "@/components/ui/button";
import { Hanko } from "@/components/brand/logo";
import { finalCta } from "@/content/landing";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-line px-5 py-24 sm:px-8 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif-jp text-[17rem] leading-none text-ink opacity-[0.025] sm:text-[26rem] sm:opacity-[0.03] md:text-[36rem]"
      >
        書
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
        <Reveal>
          <p className="font-mono text-eyebrow uppercase text-ink-muted">
            {finalCta.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-balance text-display">{finalCta.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-lg text-pretty text-[15px] leading-[1.75] text-ink-muted">
            {finalCta.description}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={finalCta.cta.href} size="lg">
              {finalCta.cta.label}
              <ArrowGlyph />
            </ButtonLink>
            <ButtonLink href={finalCta.secondary.href} variant="outline" size="lg">
              {finalCta.secondary.label}
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex items-center gap-4">
            <Hanko mark="始" />
            <p className="max-w-[13rem] text-left font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.14em] text-ink-faint">
              はじめ — awal dari sesuatu
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
