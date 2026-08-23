import { ImageResponse } from "next/og";
import { ogImageJsx, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    ogImageJsx({
      eyebrow: "About",
      title: "A Dubai-licensed technology company, under one accountable practice.",
    }),
    { ...size }
  );
}
