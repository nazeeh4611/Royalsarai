import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { insightsArticles, getInsightBySlug } from "@/lib/insights-content";
import { getServiceBySlug } from "@/lib/services-content";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import type { MediaId } from "@/lib/media";
import { CTASection } from "@/components/home/CTASection";

export function generateStaticParams() {
  return insightsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `${siteConfig.siteUrl}/insights/${article.slug}`,
      publishedTime: article.publishedAt,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) notFound();

  const relatedService = getServiceBySlug(article.relatedServiceSlug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: siteConfig.legalName },
    publisher: { "@type": "Organization", name: siteConfig.legalName },
    mainEntityOfPage: `${siteConfig.siteUrl}/insights/${article.slug}`,
  };

  return (
    <>
      <JsonLd
        data={[
          articleSchema,
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Insights", href: "/insights" },
            { label: article.title },
          ]),
        ]}
      />

      <article className="pb-24 pt-40 lg:pt-48">
        <div className="edge container-max max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/insights" },
              { label: article.category },
            ]}
          />

          <Reveal>
            <span className="mt-8 block text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
              {article.category}
            </span>
            <h1 className="mt-4 text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink text-balance">
              {article.title}
            </h1>
            <p className="mt-5 text-xs font-medium uppercase tracking-[0.1em] text-ink-faint">
              {formatDate(article.publishedAt)} · {article.readingTime}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)]">
              <MediaFrame
                id={`insight-${article.slug}` as MediaId}
                scene={article.scene.variant}
                tone={article.scene.tone}
                rounded="none"
                className="h-full w-full"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="prose-insight mt-12 max-w-2xl">
              {article.body.map((block, i) =>
                block.type === "heading" ? (
                  <h2
                    key={i}
                    className="mt-10 mb-4 text-xl font-bold tracking-[-0.01em] text-ink first:mt-0"
                  >
                    {block.text}
                  </h2>
                ) : (
                  <p key={i} className="mb-5 text-[1.02rem] leading-[1.75] text-ink-soft">
                    {block.text}
                  </p>
                )
              )}
            </div>
          </Reveal>

          {relatedService && (
            <Reveal delay={0.2}>
              <div className="mt-14 rounded-[var(--radius-lg)] border border-line bg-surface p-8">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
                  Related service
                </span>
                <Link
                  href={`/services/${relatedService.slug}`}
                  className="mt-3 flex items-center justify-between gap-4 text-lg font-semibold text-ink transition-colors hover:text-indigo"
                >
                  {relatedService.name}
                  <ArrowUpRight className="size-5 shrink-0" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </article>

      <CTASection />
    </>
  );
}
