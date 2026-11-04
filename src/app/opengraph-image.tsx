import { ImageResponse } from "next/og";

export const alt = "Sumi — Belajar bahasa Jepang N5 & N4";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#f6f4ef",
          color: "#0a0a0b",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: "1px solid #d8d4c9",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 56,
                height: 56,
                backgroundColor: "#0a0a0b",
                color: "#f6f4ef",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}
            >
              墨
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 26, letterSpacing: -0.5 }}>Sumi</span>
              <span style={{ fontSize: 13, letterSpacing: 6, color: "#74747c" }}>
                SUMI
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span style={{ fontSize: 15, letterSpacing: 4, color: "#74747c" }}>
              JLPT N5 — N4
            </span>
            <span style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -2.5 }}>
              Belajar Jepang,
            </span>
            <span style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -2.5 }}>
              satu goresan setiap hari.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 16,
              color: "#74747c",
            }}
          >
            <span>Menulis · Mengulang · Berbicara</span>
            <span style={{ color: "#c8352b" }}>●</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
