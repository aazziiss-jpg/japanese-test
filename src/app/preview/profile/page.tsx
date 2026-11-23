import { PreviewHeader } from "@/components/app/app-shell";
import { ProfileDashboard } from "@/components/preview/profile-dashboard";

export default function ProfilePage() {
  return (
    <div>
      <PreviewHeader
        eyebrow="Profil"
        title="Progres pribadi."
        description="Peta kebiasaan dan riwayat belajar yang tersimpan di perangkat ini."
      />

      <ProfileDashboard />

      <div className="mt-6 border border-line bg-paper-sunken p-4">
        <p className="max-w-2xl text-[11.5px] leading-relaxed text-ink-muted">
          <span className="font-medium text-ink">Catatan desain.</span> Peta
          kebiasaan hanya menyala pada hari kamu benar-benar menyelesaikan
          aktivitas — bukan dari data contoh. Profil tidak menampilkan peringkat
          global, agar fokus tetap pada progres pribadi.
        </p>
      </div>
    </div>
  );
}
