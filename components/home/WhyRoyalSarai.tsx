"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Building2, Layers3, ShieldCheck } from "lucide-react";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

const points = [
  {
    Icon: Building2,
    title: "Dubai-licensed, globally minded",
    description:
      "Operating under a Dubai Department of Economy & Tourism license, structured to establish branches, offices and agencies inside the UAE and abroad as client needs grow.",
  },
  {
    Icon: Layers3,
    title: "One partner, four disciplines",
    description:
      "Web, security, systems and networks handled by a single accountable team — not four vendors passing responsibility between each other.",
  },
  {
    Icon: ShieldCheck,
    title: "Engineered, not templated",
    description:
      "Every engagement is scoped around how your business actually operates, from architecture decisions through to delivery.",
  },
];

export function WhyRoyalSarai() {
  const orbitRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(orbitRef.current, {
        rotate: 360,
        transformOrigin: "50% 50%",
        duration: 60,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-paper-dim py-24 lg:py-32">
      <svg
        viewBox="0 0 800 800"
        className="pointer-events-none absolute -right-40 top-1/2 hidden h-[720px] w-[720px] -translate-y-1/2 opacity-[0.35] text-line-strong lg:block"
        aria-hidden="true"
      >
        <g ref={orbitRef}>
          <circle cx="400" cy="400" r="220" stroke="currentColor" strokeOpacity="0.5" />
          <circle cx="400" cy="400" r="320" stroke="currentColor" strokeOpacity="0.35" />
          <circle cx="400" cy="400" r="140" style={{ stroke: "var(--blue)" }} strokeOpacity="0.4" />
          <circle cx="620" cy="400" r="5" style={{ fill: "var(--blue)" }} />
          <circle cx="400" cy="80" r="4" fill="currentColor" />
          <circle cx="180" cy="470" r="4" fill="currentColor" />
          <circle cx="500" cy="620" r="3.5" style={{ fill: "var(--blue)" }} />
        </g>
      </svg>

      <div className="edge container-max relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
              Why Royal Sarai Technologies
            </span>
            <h2 className="mt-5 text-[clamp(2rem,3.8vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink text-balance">
              Built in Dubai. Structured to work wherever your business does.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            {/* Two-panel real-photo collage, slightly offset/rotated —
                simplifies to a single stacked panel on mobile. */}
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
              <Parallax
                speed={0.08}
                className="absolute inset-0 h-[82%] w-[86%] rotate-2"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface shadow-[var(--shadow-lg)]">
                  <Image
                    src="/softwarehome.webp"
                    alt="Interconnected computer systems and custom software"
                    fill
                    sizes="(min-width: 1024px) 34vw, 80vw"
                    className="object-cover"
                  />
                </div>
              </Parallax>
              <Parallax
                speed={0.15}
                className="absolute bottom-0 right-0 hidden h-[52%] w-[46%] -rotate-3 sm:block"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[var(--radius-md)] border-[3px] border-paper shadow-[var(--shadow-lg)]">
                  <Image
                    src="/cyberhome.png"
                    alt="Data security operations and access control systems"
                    fill
                    sizes="(min-width: 1024px) 18vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </Parallax>
            </div>
          </Reveal>
        </div>

        <Stagger
          variant="pop"
          className="mt-16 grid gap-10 border-t border-line-strong pt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14"
        >
          {points.map((point) => (
            <div key={point.title} data-reveal="pop">
              <span className="flex size-11 items-center justify-center rounded-[var(--radius-sm)] bg-blue/10">
                <point.Icon className="size-5 text-blue" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">
                {point.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-ink-soft">
                {point.description}
              </p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
