import type { Metadata } from "next";
import { Globe2, Clock, FileSignature } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { NetworkGlobe } from "@/components/global/NetworkGlobe";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Global Presence",
  description:
    "Royal Sarai Technologies is based and licensed in Dubai, structured to establish branches and agencies inside the UAE and abroad, and built for cross-border technology delivery.",
  alternates: { canonical: "/global-presence" },
  openGraph: {
    title: `Global Presence | ${siteConfig.shortName}`,
    description:
      "From Dubai to global markets — technology delivery without borders.",
    url: `${siteConfig.siteUrl}/global-presence`,
  },
};

const globalFAQs = [
  {
    question: "Do we need to be in Dubai to work with you?",
    answer:
      "No. Delivery is fully digital — design reviews, engineering, and project management all run through standard remote tools, regardless of where the client is based.",
  },
  {
    question: "How do you handle time zone differences?",
    answer:
      "We agree a shared working window with every international client during scoping, and default to asynchronous updates outside of it so progress doesn't stall between overlap hours.",
  },
  {
    question: "Can you contract with a company registered outside the UAE?",
    answer:
      "Yes. Our memorandum of association permits us to establish branches, offices and agencies abroad, and we structure engagements and agreements accordingly on a case-by-case basis.",
  },
];

export default function GlobalPresencePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Global Presence" }]),
          faqSchema(globalFAQs),
        ]}
      />

      <PageHero
        eyebrow="Global Presence"
        title="From Dubai to global markets."
        description="Royal Sarai Technologies is based and licensed in Dubai. Our memorandum of association allows us to establish branches, offices and agencies inside the UAE and abroad — and our delivery model is built to work with clients wherever they are."
        crumbs={[{ label: "Home", href: "/" }, { label: "Global Presence" }]}
      />

      <section className="on-dark relative overflow-hidden bg-paper py-4 text-ink">
        <div className="mx-auto aspect-[4/3] max-w-3xl text-ink-faint">
          <NetworkGlobe />
        </div>
      </section>

      <section className="border-t border-line bg-paper py-24 lg:py-28">
        <div className="edge container-max max-w-2xl">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
              Structured for cross-border delivery
            </span>
            <p className="mt-6 text-[clamp(1.3rem,2vw,1.7rem)] font-semibold leading-[1.45] text-ink text-balance">
              Technology delivery without borders. Built in the UAE,
              designed for global business.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-ink-soft">
              We don&rsquo;t claim offices we don&rsquo;t have. What we do
              have is a legal structure that permits international
              expansion as client needs grow, and a delivery model — cloud
              based, remote-first — that already works across time zones
              today.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-24 lg:py-28">
        <div className="edge container-max">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
              How we work across borders
            </span>
          </Reveal>
          <Stagger className="mt-10 grid gap-10 sm:grid-cols-3">
            <div data-reveal>
              <Globe2 className="size-6 text-indigo" strokeWidth={1.6} />
              <h3 className="mt-4 text-base font-semibold text-ink">Remote-first delivery</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Design, engineering and project management run through
                standard cloud tools — no requirement to be on-site in Dubai.
              </p>
            </div>
            <div data-reveal>
              <Clock className="size-6 text-indigo" strokeWidth={1.6} />
              <h3 className="mt-4 text-base font-semibold text-ink">Time-zone aware scheduling</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                A shared working window is agreed with every international
                client, with async updates outside of it.
              </p>
            </div>
            <div data-reveal>
              <FileSignature className="size-6 text-indigo" strokeWidth={1.6} />
              <h3 className="mt-4 text-base font-semibold text-ink">Structured agreements</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Engagements and contracts are scoped to fit a client&rsquo;s
                own jurisdiction and requirements wherever possible.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      <FAQSection items={globalFAQs} eyebrow="Working with us" title="Cross-border, practically speaking" />

      <CTASection />
    </>
  );
}
