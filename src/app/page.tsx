import { SiteHeader } from "@/components/marketing/site-header";
import { Hero } from "@/components/marketing/hero";
import { Ticker } from "@/components/marketing/ticker";
import { Pillars } from "@/components/marketing/pillars";
import { TraceSection } from "@/components/marketing/trace-section";
import { SenseiSection } from "@/components/marketing/sensei-section";
import { Curriculum } from "@/components/marketing/curriculum";
import { HabitSection } from "@/components/marketing/habit";
import { FinalCta } from "@/components/marketing/final-cta";
import { SiteFooter } from "@/components/marketing/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Ticker />
        <Pillars />
        <TraceSection />
        <SenseiSection />
        <Curriculum />
        <HabitSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
