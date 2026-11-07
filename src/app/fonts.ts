import localFont from "next/font/local";

/**
 * Font Jepang di-self-host agar aplikasi tetap tampil benar saat offline di
 * perangkat. Berkas di-subset ke karakter yang dipakai aplikasi + seluruh kana.
 */
export const shipporiMincho = localFont({
  src: [
    {
      path: "./fonts/shippori-mincho-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/shippori-mincho-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/shippori-mincho-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-shippori",
  display: "swap",
  preload: true,
  fallback: ["Yu Mincho", "Hiragino Mincho ProN", "Noto Serif JP", "serif"],
});

export const zenKakuGothic = localFont({
  src: [
    {
      path: "./fonts/zen-kaku-gothic-new-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/zen-kaku-gothic-new-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/zen-kaku-gothic-new-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-zen-kaku",
  display: "swap",
  preload: true,
  fallback: [
    "Hiragino Kaku Gothic ProN",
    "Yu Gothic",
    "Noto Sans JP",
    "sans-serif",
  ],
});
