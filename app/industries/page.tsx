import type { Metadata } from "next";
import Link from "next/link";
import {
  Landmark,
  ShoppingBag,
  Briefcase,
  Building2,
  Truck,
  HeartPulse,
  Hotel,
  Cpu,
  Users,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "How Royal Sarai Technologies' web design, cyber security, systems and network services apply across financial services, retail, real estate, logistics, healthcare, hospitality and more.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: `Industries | ${siteConfig.shortName}`,
    description:
      "Web design, cyber security, systems and network services applied across a range of industries.",
    url: `${siteConfig.siteUrl}/industries`,
  },
};

const industries = [
  {
    name: "Financial Services",
    Icon: Landmark,
    description:
      "Security architecture and data governance built for the compliance and trust requirements financial services demand.",
  },
  {
    name: "Retail & E-commerce",
    Icon: ShoppingBag,
    description:
      "Web platforms and systems built to handle catalogue, checkout and customer data at retail scale.",
  },
  {
    name: "Professional Services",
    Icon: Briefcase,
    description:
      "Websites and internal systems that reflect the credibility a professional practice depends on.",
  },
  {
    name: "Real Estate",
    Icon: Building2,
    description:
      "Web platforms and data systems built around listings, transactions and client records.",
  },
  {
    name: "Logistics",
    Icon: Truck,
    description:
      "Network infrastructure and systems that keep tracking, routing and inventory data connected.",
  },
  {
    name: "Healthcare",
    Icon: HeartPulse,
    description:
      "Security and data governance built around the sensitivity of health information.",
  },
  {
    name: "Hospitality",
    Icon: Hotel,
    description:
      "Web platforms and systems designed around booking, guest experience and operations.",
  },
  {
    name: "Technology",
    Icon: Cpu,
    description:
      "Systems and network infrastructure built to the standard a technology-first business expects of its own vendors.",
  },
  {
    name: "SMEs & Enterprises",
    Icon: Users,
    description:
      "The same four disciplines, scoped to the size of the business — from a single growing company to a multi-site enterprise.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Industries" }])} />

      <PageHero
        eyebrow="Industries"
        title="Built for how different industries actually operate."
        description="Our technology capabilities can support organizations across the industries below. This reflects where our licensed services typically apply, not a list of confirmed clients."
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        visual={<MediaFrame id="industries-hero" scene="waves" tone="gold" className="aspect-[4/3]" priority />}
      />

      <section className="border-t border-line bg-paper py-24 lg:py-28">
        <div className="edge container-max">
          <Stagger className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <div key={industry.name} data-reveal className="bg-surface p-8">
                <industry.Icon className="size-6 text-indigo" strokeWidth={1.6} />
                <h2 className="mt-5 text-base font-semibold text-ink">
                  {industry.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {industry.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16">
        <div className="edge container-max">
          <Reveal>
            <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
              Don&rsquo;t see your industry listed? Our four licensed
              disciplines — web design, cyber security, systems and networks
              — apply broadly beyond this list. See the full{" "}
              <Link href="/services" className="font-semibold text-ink underline underline-offset-4 hover:text-indigo">
                service breakdown
              </Link>{" "}
              or get in touch to discuss your specific context.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
