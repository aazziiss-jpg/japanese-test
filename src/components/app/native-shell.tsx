"use client";

import { useEffect } from "react";

/**
 * Penyesuaian kecil yang hanya relevan di dalam shell Capacitor:
 * status bar mengikuti tema dan tombol kembali Android memakai riwayat WebView.
 */
export function NativeShell() {
  useEffect(() => {
    let disposed = false;
    const cleanups: Array<() => void> = [];

    async function setUp() {
      const { Capacitor } = await import("@capacitor/core");
      if (!Capacitor.isNativePlatform()) return;

      const [{ App }, { StatusBar, Style }] = await Promise.all([
        import("@capacitor/app"),
        import("@capacitor/status-bar"),
      ]);

      if (disposed) return;

      const applyTheme = () => {
        const dark = document.documentElement.classList.contains("dark");
        StatusBar.setStyle({
          style: dark ? Style.Dark : Style.Light,
        }).catch(() => {});
        StatusBar.setBackgroundColor({
          color: dark ? "#0a0a0b" : "#f6f4ef",
        }).catch(() => {});
      };

      applyTheme();
      StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {});

      const observer = new MutationObserver(applyTheme);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      cleanups.push(() => observer.disconnect());

      // `canGoBack` dari native hanya menghitung navigasi dokumen penuh.
      // Navigasi App Router memakai pushState, jadi Navigation API browser
      // adalah sumber yang benar untuk riwayat SPA.
      type NavigationLike = { canGoBack: boolean };
      const historyApi = (window as Window & { navigation?: NavigationLike })
        .navigation;

      const back = await App.addListener("backButton", ({ canGoBack }) => {
        const canNavigateBack =
          historyApi?.canGoBack ?? (canGoBack || window.history.length > 1);

        if (canNavigateBack) window.history.back();
        else App.exitApp();
      });
      cleanups.push(() => {
        back.remove();
      });
    }

    setUp().catch(() => {
      // Berjalan sebagai web biasa: tidak ada yang perlu dilakukan.
    });

    return () => {
      disposed = true;
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
