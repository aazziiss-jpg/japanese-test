import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { KanaExam } from "@/components/preview/kana-exam";
import { LearnHeader } from "@/components/preview/learn-header";
import { LearnMap } from "@/components/preview/learn-map";

export default function LearnPage() {
  return (
    <div>
      <LearnHeader />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <LearnMap />

        <aside className="flex flex-col gap-4">
          <KanaExam script="hiragana" />
          <KanaExam script="katakana" />

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
