import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #171a3c 0%, #2a2e64 55%, #37448f 100%)",
          padding: 80,
          color: "#f9f6f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: "1.5px solid rgba(249,246,240,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 4, background: "#c6a568" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 2 }}>
              ROYAL SARAI
            </span>
            <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 6, opacity: 0.6 }}>
              TECHNOLOGIES
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
            Technology, engineered for your web, security, systems and networks.
          </div>
          <div style={{ fontSize: 22, opacity: 0.75 }}>
            {`${siteConfig.location.city}, ${siteConfig.location.country}`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
