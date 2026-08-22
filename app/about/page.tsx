import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { generalFAQs } from "@/lib/faq-general";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import {
  CyberSecurityIcon,
  NetworkIcon,
  SystemsIcon,
  WebDesignIcon,
} from "@/components/icons/ServiceIcons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Royal Sarai Technologies is a Dubai-licensed technology company delivering web design, cyber security, computer systems and IT network services under one accountable practice.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${siteConfig.shortName}`,
    description:
      "A Dubai-licensed technology company delivering web design, cyber security, computer systems and IT network services under one accountable practice.",
    url: `${siteConfig.siteUrl}/about`,
  },
};

const builds = [
  {
    label: "Web Design & Development",
    description: "Marketing sites, platforms and applications, designed and built together.",
    Icon: WebDesignIcon,
  },
  {
    label: "Data Management & Cyber Security",
    description: "Access control, data governance and security architecture built in from the start.",
    Icon: CyberSecurityIcon,
  },
  {
    label: "Computer Systems & Software",
    description: "Custom software and computer systems designed around how the business runs.",
    Icon: SystemsIcon,
  },
  {
    label: "IT Network Services",
    description: "Network design, deployment and monitoring that keeps everything connected.",
    Icon: NetworkIcon,
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "About" }])} />

      <PageHero
        eyebrow="About"
        title="A technology company built around four disciplines, not one specialty."
        description="Royal Sarai Technologies L.L.C. is a Dubai-licensed technology company delivering web design, cyber security, computer systems and IT network services under a single, accountable practice."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        visual={<MediaFrame id="about-hero" scene="skyline" tone="indigo" className="aspect-[4/3]" priority />}
      />

      <section className="border-t border-line bg-paper py-24 lg:py-28">
        <div className="edge container-max grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Who we are
            </span>
            <p className="mt-5 text-[clamp(1.15rem,1.8vw,1.4rem)] leading-[1.55] text-ink text-balance">
              Royal Sarai Technologies L.L.C. is registered in Dubai as a
              single-owner limited liability company, licensed by the
              Department of Economy &amp; Tourism to operate across four
              technology disciplines: web design, data management &amp;
              cyber security, computer systems &amp; software design, and IT
              network services.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              We work as one team across all four — not a web agency that
              outsources security, or a network integrator that treats the
              website as someone else&rsquo;s problem.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
              What we believe
            </span>
            <p className="mt-5 text-[clamp(1.15rem,1.8vw,1.4rem)] leading-[1.55] text-ink text-balance">
              Technology decisions compound. A web platform without proper
              security architecture is a liability waiting to surface. A
              network without a plan for growth becomes the reason a
              business can&rsquo;t scale.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              We believe those decisions should be made together, by people
              who understand how the pieces connect — not in isolation,
              discipline by discipline.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="on-dark bg-paper py-24 text-ink lg:py-28">
        <div className="edge container-max">
          <Reveal className="max-w-lg">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
              What we build
            </span>
            <h2 className="mt-5 text-[clamp(1.7rem,3vw,2.3rem)] font-extrabold leading-[1.15] tracking-[-0.01em]">
              Four licensed disciplines, one practice
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {builds.map((b) => (
              <div key={b.label} data-reveal>
                <b.Icon className="size-8 text-gold" />
                <p className="mt-5 text-sm font-semibold leading-snug">{b.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {b.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-b border-line bg-paper py-24 lg:py-28">
        <div className="edge container-max grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <MediaFrame id="about-approach" scene="grid" tone="blue" className="aspect-[4/3]" />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Dubai foundation, international outlook
            </span>
            <p className="mt-5 max-w-lg text-[clamp(1.15rem,1.8vw,1.4rem)] leading-[1.55] text-ink text-balance">
              We&rsquo;re registered and licensed in Dubai, and structured —
              under our memorandum of association — to establish branches,
              offices and agencies inside the UAE and abroad as client needs
              grow.
            </p>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft">
              That means a client based outside the UAE works with the same
              accountable team, the same process, and the same standard of
              delivery as a client based in Dubai.
            </p>
          </Reveal>
        </div>
      </section>

      <TestimonialsSection />

      <FAQSection items={generalFAQs} />

      <CTASection />
    </>
  );
}
