import { PreviewHeader } from "@/components/app/app-shell";
import { WritingLab } from "@/components/preview/writing-lab";

export default function WritingPage() {
  return (
    <div>
      <PreviewHeader
        eyebrow="Lab menulis · N5"
        title="Satu goresan, satu keputusan."
        description="Pilih karakter, ikuti garis tipis, dan biarkan validasi lokal menilai bentuk serta urutannya. Coba dengan mouse atau jari."
      />
      <WritingLab />
    </div>
  );
}
