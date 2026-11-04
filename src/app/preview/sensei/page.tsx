import { PreviewHeader } from "@/components/app/app-shell";
import { SenseiStudio } from "@/components/preview/sensei-studio";

export default function SenseiPage() {
  return (
    <div>
      <PreviewHeader
        eyebrow="AI Sensei · Gemini Live"
        title="Bicara pelan-pelan. Tidak apa-apa."
        description="Sensei membaca progres terakhir sebelum sesi dimulai, jadi latihan otomatis menyasar pola yang belum stabil. Tekan tombol untuk mencoba alurnya."
        action={
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
            <span className="size-1.5 bg-accent" />
            Kuota 5 menit/hari
          </div>
        }
      />
      <SenseiStudio />
    </div>
  );
}
