"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginRegistered = false;
function ensureScrollTrigger() {
  if (!pluginRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    pluginRegistered = true;
  }
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type RevealVariant = "up" | "fade" | "pop";

function toVarsFor(variant: RevealVariant, duration: number, delay: number) {
  if (variant === "pop") {
    return {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: "back.out(1.6)",
    };
  }
  return {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease: "power3.out",
  };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  start?: string;
  as?: ElementType;
  variant?: RevealVariant;
}

/**
 * Scroll-triggered reveal. The wrapper starts hidden via the `[data-reveal]`
 * CSS rule in globals.css (no flash-of-visible-content), GSAP/ScrollTrigger
 * then animates it in once. Reduced-motion visitors get the final state
 * immediately. `variant="pop"` gives a subtle scale-up-with-overshoot
 * entrance instead of the default slide-up.
 */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
  duration = 1,
  start = "top 87%",
  as: Tag = "div",
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.removeAttribute("data-reveal");
      return;
    }

    ensureScrollTrigger();
    const ctx = gsap.context(() => {
      gsap.to(el, {
        ...toVarsFor(variant, duration, delay),
        scrollTrigger: { trigger: el, start, once: true },
      });
    });
    return () => ctx.revert();
  }, [delay, duration, start, variant]);

  const Component = Tag as unknown as "div";
  return (
    <Component ref={ref as never} data-reveal={variant} className={className} style={style}>
      {children}
    </Component>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  start?: string;
  as?: ElementType;
  variant?: RevealVariant;
  duration?: number;
}

/** Reveals every direct `[data-reveal]` child in sequence. `variant="pop"`
 * pops each child in with a scale overshoot instead of sliding up. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  start = "top 85%",
  as: Tag = "div",
  variant = "up",
  duration = 0.9,
}: StaggerProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");

    if (prefersReducedMotion()) {
      items.forEach((it) => it.removeAttribute("data-reveal"));
      return;
    }

    ensureScrollTrigger();
    const ctx = gsap.context(() => {
      gsap.to(items, {
        ...toVarsFor(variant, duration, 0),
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [stagger, start, variant, duration]);

  const Component = Tag as unknown as "div";
  return (
    <Component ref={ref as never} className={className}>
      {children}
    </Component>
  );
}
