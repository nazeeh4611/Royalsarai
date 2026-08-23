import { siteConfig } from "@/lib/site-config";

export const ogImageSize = { width: 1200, height: 630 };

/**
 * Shared visual template behind every route's opengraph-image.tsx — same
 * gradient/wordmark treatment as the site-wide app/opengraph-image.tsx,
 * parameterised so each page's social preview shows its own title instead
 * of the generic homepage tagline. Kept here (not a page file itself) so
 * next/og's ImageResponse only ever needs to be constructed once per route,
 * right next to that route's `size`/`contentType` exports.
 */
export function ogImageJsx({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #171a3c 0%, #2a2e64 55%, #37448f 100%)",
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
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 2 }}>ROYAL SARAI</span>
          <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 6, opacity: 0.6 }}>
            TECHNOLOGIES
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {eyebrow && (
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: 4, opacity: 0.6, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
        )}
        <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1, maxWidth: 980 }}>{title}</div>
        <div style={{ fontSize: 22, opacity: 0.75 }}>
          {`${siteConfig.location.city}, ${siteConfig.location.country}`}
        </div>
      </div>
    </div>
  );
}
