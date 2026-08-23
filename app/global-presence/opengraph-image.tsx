import { ImageResponse } from "next/og";
import { ogImageJsx, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    ogImageJsx({
      eyebrow: "Global Presence",
      title: "From Dubai to global markets — technology delivery without borders.",
    }),
    { ...size }
  );
}
