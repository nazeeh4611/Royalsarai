import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { servicesContent, getServiceBySlug } from "@/lib/services-content";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { AbstractScene } from "@/components/media/AbstractScene";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function generateStaticParams() {
  return servicesContent.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | ${siteConfig.shortName}`,
      description: service.metaDescription,
      url: `${siteConfig.siteUrl}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = servicesContent.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.name,
            description: service.metaDescription,
            slug: service.slug,
          }),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.shortLabel },
          ]),
          faqSchema(service.faqs),
        ]}
      />

      <PageHero
        eyebrow={service.eyebrow}
        title={service.headline}
        description={service.intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.shortLabel },
        ]}
        visual={<MediaFrame id={service.media.id} scene={service.media.scene} tone={service.media.tone} className="aspect-[4/3]" priority />}
      />

      <section className="border-y border-line bg-paper py-24 lg:py-28">
        <div className="edge container-max grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
              {service.problem.title}
            </span>
            <p className="mt-5 text-[clamp(1.3rem,2vw,1.6rem)] font-semibold leading-[1.4] text-ink text-balance">
              {service.problem.description}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
              {service.solution.title}
            </span>
            <p className="mt-5 text-[clamp(1.3rem,2vw,1.6rem)] font-semibold leading-[1.4] text-ink text-balance">
              {service.solution.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-28">
        <div className="edge container-max">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
              Capabilities
            </span>
            <h2 className="mt-5 max-w-lg text-[clamp(1.7rem,3vw,2.3rem)] font-extrabold leading-[1.15] tracking-[-0.01em] text-ink">
              What&rsquo;s included
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2">
            {service.capabilities.map((cap) => (
              <div key={cap.title} data-reveal className="bg-surface p-8">
                <h3 className="text-lg font-semibold text-ink">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {cap.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="on-dark relative overflow-hidden bg-paper py-24 text-ink lg:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <AbstractScene variant={service.media.scene} tone={service.media.tone} alt="" />
        </div>
        <div className="edge container-max relative">
          <Reveal className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
              Process
            </span>
            <h2 className="mt-5 text-[clamp(1.7rem,3vw,2.3rem)] font-extrabold leading-[1.15] tracking-[-0.01em]">
              How the engagement runs
            </h2>
          </Reveal>
          <div className="mt-14">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-28">
        <div className="edge container-max grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
              Technology
            </span>
            <h2 className="mt-5 text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink text-balance">
              What we build with
            </h2>
          </Reveal>
          <Stagger className="flex flex-wrap gap-3">
            {service.technology.map((tech) => (
              <span
                key={tech}
                data-reveal="fade"
                className="rounded-full border border-line-strong px-4 py-2 text-sm text-ink-soft"
              >
                {tech}
              </span>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-24 lg:py-28">
        <div className="edge container-max">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
              Business value
            </span>
          </Reveal>
          <Stagger className="mt-8 grid gap-10 sm:grid-cols-3">
            {service.businessValue.map((v) => (
              <div key={v.title} data-reveal>
                <Check className="size-5 text-indigo" strokeWidth={1.8} />
                <h3 className="mt-4 text-base font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {v.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-paper pb-24 lg:pb-28">
        <div className="edge container-max">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
              Frequently asked
            </span>
          </Reveal>
          <FAQAccordion items={service.faqs} className="mt-8" />
        </div>
      </section>

      <section className="border-t border-line bg-paper py-24 lg:py-28">
        <div className="edge container-max">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
              Related services
            </span>
          </Reveal>
          <Stagger className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-reveal
                className="group flex items-center justify-between gap-4 bg-surface p-6 transition-colors hover:bg-paper-dim"
              >
                <span className="text-sm font-semibold text-ink">{s.shortLabel}</span>
                <ArrowUpRight className="size-4 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo" />
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden bg-paper py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_100%,rgba(199,166,104,0.12),transparent)]" />
        <div className="edge container-max flex flex-col items-center text-center">
          <Reveal>
            <h2 className="max-w-2xl text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-[1.12] tracking-[-0.015em] text-ink text-balance">
              Ready to talk about a {service.shortLabel.toLowerCase()} project?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-9">
              <MagneticButton href={`/contact?service=${service.slug}`} cursorLabel="Go">
                Start the conversation
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
