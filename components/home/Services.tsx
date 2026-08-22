"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Modal } from "@/components/ui/Modal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { servicesContent } from "@/lib/services-content";
import {
  CyberSecurityIcon,
  NetworkIcon,
  SystemsIcon,
  WebDesignIcon,
} from "@/components/icons/ServiceIcons";

const presentation: Record<string, { Icon: typeof WebDesignIcon; description: string }> = {
  "web-design-development": {
    Icon: WebDesignIcon,
    description:
      "Marketing sites, web platforms and custom applications — designed and engineered as one connected system, not handed off between teams.",
  },
  "data-management-cyber-security": {
    Icon: CyberSecurityIcon,
    description:
      "Security architecture, access control and data governance built in from day one, not bolted on after something goes wrong.",
  },
  "computer-systems-software": {
    Icon: SystemsIcon,
    description:
      "Custom software and computer systems designed around how your business actually operates.",
  },
  "it-network-services": {
    Icon: NetworkIcon,
    description:
      "Network design, deployment and management that keeps every system your business depends on connected.",
  },
};

const cards = servicesContent.map((service) => ({
  ...service,
  ...presentation[service.slug],
}));

export function Services() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const titleId = useId();
  const openService = cards.find((c) => c.slug === openSlug) ?? null;

  return (
    <section id="services" className="bg-paper py-24 lg:py-32">
      <div className="edge container-max">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal as="div">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">
              Core Services
            </span>
            <h2 className="mt-4 max-w-xl text-[clamp(2rem,3.8vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink text-balance">
              Four capabilities. One accountable technology partner.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/services"
              className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-blue"
            >
              View all services
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {cards.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.06} variant="pop" className="h-full">
              <button
                type="button"
                onClick={() => setOpenSlug(service.slug)}
                aria-haspopup="dialog"
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface p-0 text-left shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-blue/25 hover:shadow-[var(--shadow-lg)]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <MediaFrame
                    id={service.media.id}
                    scene={service.media.scene}
                    tone={service.media.tone}
                    rounded="none"
                    className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <div className="flex size-12 items-center justify-center rounded-[var(--radius-sm)] bg-gradient-tile text-white shadow-[var(--shadow-sm)]">
                    <service.Icon className="size-5.5" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold tracking-[-0.01em] text-ink">
                    {service.name}
                  </h3>
                  <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-ink-soft">
                    {service.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue">
                    Learn more
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal open={openService !== null} onClose={() => setOpenSlug(null)} labelledBy={titleId}>
        {openService && (
          <div>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue/10 text-blue">
              <openService.Icon className="size-6" />
            </div>
            <h3 id={titleId} className="mt-6 max-w-md text-2xl font-extrabold tracking-[-0.01em] text-ink">
              {openService.headline}
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">
              {openService.intro}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {openService.capabilities.map((cap) => (
                <div key={cap.title} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-blue" />
                  <span className="text-sm text-ink-soft">{cap.title}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {openService.technology.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line-strong px-3 py-1.5 text-xs text-ink-soft"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={`/services/${openService.slug}`}
                className="link-underline inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-ink hover:text-blue"
              >
                View full service page
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href={`/contact?service=${openService.slug}`}
                className="link-underline inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-ink-soft hover:text-blue"
              >
                Start a project
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
