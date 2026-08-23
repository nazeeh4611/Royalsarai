import { ImageResponse } from "next/og";
import { ogImageJsx, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    ogImageJsx({
      eyebrow: "Insights",
      title: "Practical technology, cyber security and web development insights.",
    }),
    { ...size }
  );
}
