import type { CapacitorConfig } from "@capacitor/cli";

// Hanya dipakai saat debugging: arahkan WebView ke server `next dev`.
// Contoh: CAP_SERVER_URL="http://localhost:3000" pnpm app:live
const liveReloadUrl = process.env.CAP_SERVER_URL;

const config: CapacitorConfig = {
  appId: "id.sumi.app",
  appName: "Sumi",
  webDir: "out",
  server: {
    androidScheme: "https",
    ...(liveReloadUrl
      ? { url: liveReloadUrl, cleartext: liveReloadUrl.startsWith("http://") }
      : {}),
  },
  android: {
    allowMixedContent: false,
  },
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: "DEFAULT",
      backgroundColor: "#f6f4ef",
    },
  },
};

export default config;
