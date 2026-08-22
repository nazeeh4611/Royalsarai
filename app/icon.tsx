import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2a2e64",
          borderRadius: 8,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
          <path
            d="M11 27V16.5C11 13.5 13.2 11 17 11C20.8 11 23 13.2 23 16C23 18.5 21.2 20.2 18.5 20.6"
            stroke="#f9f6f0"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path d="M11 20.6H17.5" stroke="#f9f6f0" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M18.5 20.6L24 27" stroke="#f9f6f0" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="28.5" cy="12" r="2.6" fill="#c6a568" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
