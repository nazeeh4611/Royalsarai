import { ImageResponse } from "next/og";
import { ogImageJsx, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    ogImageJsx({
      eyebrow: "Industries",
      title: "Technology built for financial services, retail, real estate, logistics and more.",
    }),
    { ...size }
  );
}
