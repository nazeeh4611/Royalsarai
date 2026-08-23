import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { servicesContent } from "@/lib/services-content";
import { generalFAQs } from "@/lib/faq-general";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { AbstractScene } from "@/components/media/AbstractScene";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design, data management & cyber security, computer systems & software, and IT network services from Royal Sarai Technologies — a Dubai-licensed technology company.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services | ${siteConfig.shortName}`,
    description:
      "Web design, cyber security, computer systems and IT network services from a Dubai-licensed technology company.",
    url: `${siteConfig.siteUrl}/services`,
  },
};

export default function ServicesOverviewPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Services" },
        ])}
      />

      <PageHero
        eyebrow="Services"
        title="Four licensed disciplines. One accountable team."
        description="Royal Sarai Technologies is licensed by the Dubai Department of Economy & Tourism to deliver web design, data management & cyber security, computer systems & software, and IT network services — each detailed below."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        visual={
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)]">
            <video
              className="h-full w-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              poster="/b296ef-poster.jpg"
            >
              <source src="/b296ef.mp4" type="video/mp4" />
              <source src="/b296ef.webm" type="video/webm" />
            </video>
          </div>
        }
      />

      <section className="border-t border-line bg-paper">
        {servicesContent.map((service, i) => (
          <div
            key={service.slug}
            className={cn(
              "border-b border-line py-20 lg:py-24",
              i % 2 === 1 && "on-dark bg-paper text-ink"
            )}
          >
            <div className="edge container-max">
              <div
                className={cn(
                  "grid items-center gap-14 lg:grid-cols-2 lg:gap-20",
                  i % 2 === 1 && "lg:[&>*:first-child]:order-2"
                )}
              >
                <Reveal>
                  <span className="font-mono text-sm text-ink-faint">0{i + 1}</span>
                  <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-[1.14] tracking-[-0.01em] text-ink text-balance">
                    {service.name}
                  </h2>
                  <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-ink-soft">
                    {service.intro}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:text-indigo"
                  >
                    Explore {service.shortLabel}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Reveal>
                <Reveal delay={0.1}>
                  <MediaFrame
                    id={service.media.id}
                    scene={service.media.scene}
                    tone={service.media.tone}
                    className="aspect-[4/3]"
                  />
                </Reveal>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="relative overflow-hidden bg-paper py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]">
          <AbstractScene variant="grid" tone="indigo" alt="" />
        </div>
        <div className="edge container-max relative">
          <Reveal className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
              Process
            </span>
            <h2 className="mt-5 text-[clamp(1.7rem,3vw,2.3rem)] font-extrabold leading-[1.15] tracking-[-0.01em] text-ink">
              The same disciplined process, every time
            </h2>
          </Reveal>
          <div className="mt-14">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <FAQSection items={generalFAQs} />

      <CTASection />
    </>
  );
}
