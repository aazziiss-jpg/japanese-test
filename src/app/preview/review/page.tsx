import { MiniStat, PreviewHeader } from "@/components/app/app-shell";
import { ReviewSession } from "@/components/preview/review-session";
import { learner, reviewQueue } from "@/data/preview";

export default function ReviewPage() {
  return (
    <div>
      <PreviewHeader
        eyebrow="Pengulangan berjarak"
        title="Ulangi sebelum lupa."
        description="Kartu yang muncul hari ini dipilih oleh penjadwal FSRS berdasarkan jawabanmu sebelumnya, bukan urutan acak."
        action={
          <div className="flex flex-wrap gap-2">
            <MiniStat icon="layers" label="Jatuh tempo" value="12" accent />
            <MiniStat icon="target" label="Retensi" value={`${learner.accuracy}%`} />
          </div>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <ReviewSession />

        <aside className="flex flex-col gap-4">
          <div className="border border-line bg-paper-raised">
            <div className="border-b border-line px-4 py-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                Antrean berikutnya
              </span>
            </div>
            <ul className="divide-y divide-line">
              {reviewQueue.map((card) => (
                <li
                  key={card.id}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-jp text-[15px]">{card.term}</span>
                    <span className="text-[10.5px] text-ink-muted">{card.meaning}</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-faint">
                    {card.due}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-line p-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
              Beban 7 hari
            </span>
            <div className="mt-4 flex items-end gap-1.5" aria-hidden="true">
              {[18, 26, 12, 34, 22, 40, 16].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 bg-ink"
                  style={{ height: `${height}px`, opacity: 0.25 + index * 0.1 }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[8px] uppercase tracking-[0.1em] text-ink-faint">
              <span>Sen</span>
              <span>Min</span>
            </div>
          </div>

          <div className="border border-line bg-paper-sunken p-4">
            <p className="text-[11.5px] leading-relaxed text-ink-muted">
              <span className="font-medium text-ink">Kenapa empat tombol?</span>{" "}
              Kamu menilai kesulitan, sistem menghitung interval. Tidak ada
              jawaban yang dihukum.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
