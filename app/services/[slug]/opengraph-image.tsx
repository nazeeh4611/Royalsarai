import { ImageResponse } from "next/og";
import { getServiceBySlug } from "@/lib/services-content";
import { ogImageJsx, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  return new ImageResponse(
    ogImageJsx({ eyebrow: "Services", title: service?.name ?? "Services" }),
    { ...size }
  );
}
