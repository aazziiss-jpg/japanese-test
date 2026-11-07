import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { PreviewAuthGate } from "@/components/auth/preview-auth-gate";

export const metadata: Metadata = {
  title: "Pratinjau layar",
  description:
    "Pratinjau antarmuka Sumi: peta belajar, pelajaran, lab menulis, ulangan, sensei, dan profil.",
  robots: { index: false, follow: false },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <PreviewAuthGate>{children}</PreviewAuthGate>
    </AppShell>
  );
}
