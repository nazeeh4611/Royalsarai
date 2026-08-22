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

function FeatureService({
  service,
  index,
  priority,
  onOpen,
}: {
  service: (typeof cards)[number];
  index: number;
  priority?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group relative flex aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-lg)] text-left sm:aspect-[21/9]"
    >
      <MediaFrame
        id={service.media.id}
        scene={service.media.scene}
        tone={service.media.tone}
        rounded="none"
        className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-7 sm:p-10">
        <span className="font-mono text-sm text-white/60">0{index}</span>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="max-w-xl text-2xl font-bold leading-tight text-white sm:text-4xl">
            {service.name}
          </h3>
          <span className="mb-1 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
            Explore
            <ArrowUpRight className="size-4" />
          </span>
        </div>
        <p className="mt-1 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
          {service.description}
        </p>
      </div>
      <span className="absolute left-7 top-7 h-px w-10 bg-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:left-10 sm:top-10" />
    </button>
  );
}

function PairService({
  service,
  index,
  onOpen,
}: {
  service: (typeof cards)[number];
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface text-left transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <MediaFrame
          id={service.media.id}
          scene={service.media.scene}
          tone={service.media.tone}
          rounded="none"
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <span className="font-mono text-sm text-ink-faint">0{index}</span>
        <h3 className="mt-2 text-xl font-bold tracking-[-0.01em] text-ink sm:text-2xl">
          {service.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {service.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
          Learn more
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </button>
  );
}

export function Services() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const titleId = useId();
  const openService = cards.find((c) => c.slug === openSlug) ?? null;
  const [web, cyber, systems, network] = cards;

  return (
    <section id="services" className="bg-paper py-16 lg:py-24">
      <div className="edge container-max">
        <Reveal as="div" className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
            Core Services
          </span>
          <h2 className="mt-5 text-[clamp(2.2rem,4.2vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ink text-balance">
            Technology built around how your business works.
          </h2>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-md text-lg leading-relaxed text-ink-soft">
              We don&rsquo;t hand engagements between vendors. One team owns
              web, security, systems and networks — end to end.
            </p>
            <Link
              href="/services"
              className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-ink/70"
            >
              View all services
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-5">
          <Reveal variant="pop">
            <FeatureService
              service={web}
              index={1}
              priority
              onOpen={() => setOpenSlug(web.slug)}
            />
          </Reveal>

          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
            <Reveal variant="pop" delay={0.06} className="w-[82vw] shrink-0 snap-start sm:w-auto">
              <PairService service={cyber} index={2} onOpen={() => setOpenSlug(cyber.slug)} />
            </Reveal>
            <Reveal variant="pop" delay={0.12} className="w-[82vw] shrink-0 snap-start sm:w-auto">
              <PairService service={systems} index={3} onOpen={() => setOpenSlug(systems.slug)} />
            </Reveal>
          </div>

          <Reveal variant="pop" delay={0.18}>
            <FeatureService
              service={network}
              index={4}
              onOpen={() => setOpenSlug(network.slug)}
            />
          </Reveal>
        </div>
      </div>

      <Modal open={openService !== null} onClose={() => setOpenSlug(null)} labelledBy={titleId}>
        {openService && (
          <div>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-ink/5 text-ink">
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
                  <Check className="mt-0.5 size-4 shrink-0 text-ink" />
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
                className="link-underline inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-ink"
              >
                View full service page
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href={`/contact?service=${openService.slug}`}
                className="link-underline inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-ink-soft hover:text-ink"
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
