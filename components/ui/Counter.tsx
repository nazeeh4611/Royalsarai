"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginRegistered = false;
function ensureScrollTrigger() {
  if (!pluginRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    pluginRegistered = true;
  }
}

interface CounterProps {
  to: number;
  duration?: number;
  pad?: boolean;
  className?: string;
}

/** Animates 0 → `to` once scrolled into view. Reduced-motion visitors see
 * the final value immediately. */
export function Counter({ to, duration = 1.4, pad = false, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const format = (n: number) => (pad ? String(n).padStart(2, "0") : String(n));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = format(to);
      return;
    }

    ensureScrollTrigger();
    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: to,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          if (el) el.textContent = format(Math.round(counter.value));
        },
      });
    });
    return () => ctx.revert();
  }, [to, duration, pad]);

  return (
    <span ref={ref} className={className}>
      {pad ? "00" : "0"}
    </span>
  );
}
