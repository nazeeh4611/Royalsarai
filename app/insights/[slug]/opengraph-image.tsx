import { ImageResponse } from "next/og";
import { getInsightBySlug } from "@/lib/insights-content";
import { ogImageJsx, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  return new ImageResponse(
    ogImageJsx({ eyebrow: "Insights", title: article?.title ?? "Insights" }),
    { ...size }
  );
}
