"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  FileText,
  PenTool,
  Cpu,
  Rocket,
  RefreshCw,
} from "lucide-react";
import { Stagger } from "@/components/ui/Reveal";

const steps = [
  {
    n: "01",
    title: "Discover",
    description: "Understand the business, its constraints and what success looks like.",
    Icon: Compass,
  },
  {
    n: "02",
    title: "Define",
    description: "Scope the engagement — architecture, requirements and a concrete plan.",
    Icon: FileText,
  },
  {
    n: "03",
    title: "Design",
    description: "Design the experience and the system behind it, together.",
    Icon: PenTool,
  },
  {
    n: "04",
    title: "Engineer",
    description: "Build on production-grade foundations, tested as we go.",
    Icon: Cpu,
  },
  {
    n: "05",
    title: "Deploy",
    description: "Ship with monitoring, security and handover documentation in place.",
    Icon: Rocket,
  },
  {
    n: "06",
    title: "Evolve",
    description: "Support, iterate and scale the system as the business grows.",
    Icon: RefreshCw,
  },
];

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="relative mb-10 hidden h-px w-full bg-line lg:block">
        <div
          ref={lineRef}
          className="absolute inset-y-0 left-0 w-full origin-left bg-ink"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <Stagger className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:overflow-visible sm:pb-0 lg:grid-cols-3 xl:grid-cols-6">
        {steps.map((step) => (
          <div
            key={step.n}
            data-reveal
            className="relative w-[82vw] shrink-0 snap-start rounded-[var(--radius-lg)] border border-line p-6 sm:w-auto sm:shrink sm:snap-align-none sm:rounded-none sm:border-0 sm:border-t sm:border-line sm:p-0 sm:pt-6 lg:border-t-0 lg:pt-0"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-3 right-0 text-6xl font-extrabold leading-none text-ink/[0.06] sm:text-7xl"
            >
              {step.n}
            </span>
            <span className="relative flex size-12 items-center justify-center rounded-full border border-line-strong">
              <step.Icon className="size-5 text-ink" strokeWidth={1.6} />
            </span>
            <h3 className="relative mt-5 text-xl font-extrabold tracking-[-0.01em] text-ink">
              {step.title}
            </h3>
            <p className="relative mt-2 max-w-[22ch] text-sm leading-relaxed text-ink-soft">
              {step.description}
            </p>
          </div>
        ))}
      </Stagger>
    </div>
  );
}
