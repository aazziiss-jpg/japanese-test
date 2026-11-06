import { PreviewHeader } from "@/components/app/app-shell";
import { WritingLab } from "@/components/preview/writing-lab";

export default function WritingPage() {
  return (
    <div>
      <PreviewHeader
        eyebrow="Lab menulis · N5 & N4"
        title="Satu goresan, satu keputusan."
        description="Pilih bab, subbab, lalu huruf. Ikuti garis tipis dan biarkan validasi lokal menilai bentuk serta urutan goresan. Coba dengan mouse atau jari."
      />
      <WritingLab />
    </div>
  );
}
