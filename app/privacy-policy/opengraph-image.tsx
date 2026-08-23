import { ImageResponse } from "next/og";
import { ogImageJsx, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    ogImageJsx({
      eyebrow: "Privacy Policy",
      title: "How we collect, use and protect information submitted through this website.",
    }),
    { ...size }
  );
}
