import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { insightsArticles } from "@/lib/insights-content";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Stagger } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { InsightCard } from "@/components/insights/InsightCard";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical technology, cyber security and web development insights from Royal Sarai Technologies.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: `Insights | ${siteConfig.shortName}`,
    description:
      "Practical technology, cyber security and web development insights from Royal Sarai Technologies.",
    url: `${siteConfig.siteUrl}/insights`,
  },
};

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Insights" }])} />

      <PageHero
        eyebrow="Insights"
        title="Practical thinking on technology, security and the web."
        description="Notes from the four disciplines we practice — written for people making real decisions, not for search engines."
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        visual={<MediaFrame id="insights-hero" scene="grid" tone="blue" className="aspect-[4/3]" priority />}
      />

      <section className="border-t border-line bg-paper py-24 lg:py-28">
        <div className="edge container-max">
          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {insightsArticles.map((article) => (
              <InsightCard key={article.slug} article={article} />
            ))}
          </Stagger>
        </div>
      </section>

      <CTASection />
    </>
  );
}
