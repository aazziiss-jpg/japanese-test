import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";

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
  return <AppShell>{children}</AppShell>;
}
