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
      <div className="relative mb-2 hidden h-px w-full bg-line lg:block">
        <div
          ref={lineRef}
          className="absolute inset-y-0 left-0 w-full origin-left bg-indigo"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
        {steps.map((step) => (
          <div key={step.n} data-reveal className="lg:pt-8">
            <span className="font-mono text-xs text-ink-faint">{step.n}</span>
            <step.Icon className="mt-3 size-5 text-indigo" strokeWidth={1.6} />
            <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {step.description}
            </p>
          </div>
        ))}
      </Stagger>
    </div>
  );
}
