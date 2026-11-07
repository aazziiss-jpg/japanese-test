import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/content/landing";
import { shipporiMincho, zenKakuGothic } from "./fonts";
import { NativeShell } from "@/components/app/native-shell";
import { NativeEntry } from "@/components/app/native-entry";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Belajar bahasa Jepang N5 & N4`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "belajar bahasa Jepang",
    "JLPT N5",
    "JLPT N4",
    "hiragana",
    "katakana",
    "kanji",
    "latihan menulis Jepang",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: site.name,
    title: `${site.name} — Belajar bahasa Jepang N5 & N4`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Belajar bahasa Jepang N5 & N4`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("sumi-theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch (error) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable} ${shipporiMincho.variable} ${zenKakuGothic.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans text-body antialiased">
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Lompat ke konten
        </a>
        {children}
        <NativeShell />
        <NativeEntry />
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
