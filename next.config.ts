import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Aplikasi dibundel ke Capacitor, jadi seluruh rute harus bisa menjadi
  // berkas statis. Cache Components dan partial prerendering membutuhkan
  // runtime Node dan tidak dipakai di mode ini.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
