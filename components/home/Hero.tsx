"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/cn";
import { MagneticButton } from "@/components/ui/MagneticButton";

let pluginRegistered = false;
function ensureSplitText() {
  if (!pluginRegistered) {
    gsap.registerPlugin(SplitText);
    pluginRegistered = true;
  }
}

// Single source of truth for the word system: drives the giant desktop
// stack and the headline's inline cycling word on mobile. Each one reads
// as a compound phrase with the static "Technology" beside it — "Technology
// Secure", "Technology Ready", "Technology Scalable".
const words = ["Secure", "Connected", "Ready", "Automated", "Focused", "Scalable", "Responsive"];

// "Technology" and every word in the stack — active or not — render at
// this exact size/weight/leading/tracking, in the same heavy display face
// (Archivo Black — deliberately bolder than Manrope even at its own black
// weight). Only color differs, so the inactive words never read as a
// smaller "list" next to a bigger headline: they're the same scale as
// "Technology" itself. No side visual competes for width anymore, so this
// is deliberately large — the type IS the hero.
const HEADLINE_SIZE = "font-display text-[clamp(3.1rem,6.8vw,6.9rem)] font-normal leading-[0.94] tracking-[-0.01em]";
const WORD_TYPE_CLASS = cn(HEADLINE_SIZE, "block transition-colors duration-700 ease-out");

const CYCLE_MS = 1800;
// How many extra (grey) words trail below the fixed blue slot at lg+.
const TRAIL_COUNT = 6;
// Extra breathing room between rows, as a fraction of one row's own
// measured height — keeps rows from ever visually touching/overlapping.
const ROW_GAP_RATIO = 0.12;
// The stack renders this many full cycles of `words` back-to-back, in
// plain document flow, and a single `translateY` on the whole list slides
// it upward by one row per tick — so position math is never per-row, just
// one transform on one element. At CYCLE_MS=1800ms this covers ~13
// minutes of continuous cycling before gently holding on the last word,
// far beyond how long a hero section is realistically watched.
const CYCLE_REPEATS = 30;
const LOOP_WORDS = Array.from({ length: words.length * CYCLE_REPEATS }, (_, i) => words[i % words.length]);
const MAX_TICK = LOOP_WORDS.length - 1 - TRAIL_COUNT;

// Cursor tilt is capped to this many degrees either way — enough to feel
// alive, subtle enough that giant type never looks unstable.
const TILT_DEG = 5;

// Warm gold sampled from herobg.webp's light beams — the one accent color
// against the image's navy/black, used only for the active word so it
// still pops the way `text-blue` did on the old white background.
const ACCENT_GOLD = "#e3b567";

export function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineAccentRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [tick, setTick] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);
  const [listOffset, setListOffset] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Entrance choreography: eyebrow rule draws in, "Technology" reveals
  // letter by letter through a clipped mask, then sub/CTA/stack settle in
  // behind it.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(reduced);
    if (reduced) return;

    ensureSplitText();
    let split: SplitText | undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(
        lineAccentRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, delay: 0.05, ease: "power3.out", transformOrigin: "left center" }
      );

      if (line1Ref.current) {
        split = SplitText.create(line1Ref.current, { type: "chars", mask: "chars" });
        gsap.from(split.chars, {
          yPercent: 130,
          opacity: 0,
          duration: 0.9,
          stagger: 0.032,
          delay: 0.15,
          ease: "power4.out",
        });
      }

      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.55, ease: "power3.out" }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.68, ease: "power3.out" }
      );
      gsap.fromTo(
        stackRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, delay: 0.3, ease: "power2.out" }
      );
    });

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  // Word highlight is a plain timer, deliberately NOT scroll-driven —
  // it must keep cycling the instant the hero loads and for as long as it's
  // on screen, independent of whether/how far the visitor has scrolled.
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setTick((t) => Math.min(t + 1, MAX_TICK));
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  // The slide target is the CURRENT ACTIVE ROW's real `offsetTop` — a
  // browser-computed layout value, not an estimated `index * rowHeight`.
  // `offsetTop` ignores the list's own `transform` entirely (transform is
  // paint-only, never affects layout), so this is exact by construction —
  // there is no flat per-row constant that can drift out of sync with the
  // active word's actual position, however many ticks have passed.
  useLayoutEffect(() => {
    const target = itemRefs.current[tick];
    if (target) setListOffset(-target.offsetTop);
  }, [tick, rowHeight]);

  // rowHeight is only used to size the container's clipping window (how
  // many rows are visible before overflow-hidden crops the rest) — a rough
  // figure is fine there since it doesn't drive positioning. Re-measured on
  // resize since the stack's font-size is a `vw`-based clamp.
  useLayoutEffect(() => {
    const measure = () => {
      const row = itemRefs.current[0];
      if (row) setRowHeight(row.getBoundingClientRect().height * (1 + ROW_GAP_RATIO));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Each newly active row gets a soft focus-pull — scaling up from a
  // slight blur — layered on top of the plain colour transition and the
  // stack's own slide, so a word "arriving" reads as more than a repaint.
  useEffect(() => {
    if (reducedMotion) return;
    const el = itemRefs.current[tick];
    if (!el) return;
    gsap.fromTo(
      el,
      { scale: 0.92, filter: "blur(10px)" },
      { scale: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out" }
    );
  }, [tick, reducedMotion]);

  // Desktop-only cursor tilt: the whole headline+stack plane leans very
  // slightly toward the pointer, like a single tilted pane of glass.
  useEffect(() => {
    if (reducedMotion) return;
    const el = gridRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches) return;

    gsap.set(el, { transformPerspective: 1000, transformOrigin: "center" });
    const setX = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
    const setY = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = Math.max(-0.5, Math.min(0.5, (e.clientX - r.left) / r.width - 0.5));
      const py = Math.max(-0.5, Math.min(0.5, (e.clientY - r.top) / r.height - 0.5));
      setX(px * TILT_DEG);
      setY(-py * TILT_DEG);
    };
    const onLeave = () => {
      setX(0);
      setY(0);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  const activeWord = LOOP_WORDS[tick];

  return (
    <section className="on-dark relative isolate overflow-hidden bg-paper">
      <Image
        src="/herobg.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-55"
      />
      {/* Darkens the left/text half only — the image is already near-black
         there, this just guarantees contrast — and leaves the light beam
         and the word stack on the right untouched. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />

      <div className="edge relative flex min-h-[100svh] flex-col justify-center gap-10 pb-24 pt-32 lg:gap-0 lg:pb-28 lg:pt-36">
        {/* Eyebrow sits ABOVE both the heading and the word stack (not
           just above the heading) so the text column and the stack column
           both start their content from the exact same shared top offset
           at lg+. That's what lets "Technology" and the stack's first
           line read as one continuous headline instead of two
           independently-centered blocks with a gap between them. */}
        <div
          ref={eyebrowRef}
          className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint"
        >
          <span ref={lineAccentRef} className="h-px w-8" style={{ backgroundColor: ACCENT_GOLD }} />
          Dubai, United Arab Emirates
        </div>

        {/* lg+: the left track is fixed just wide enough for "Technology" (not
           an even split) and sits a tight gap-3 from the stack column, so
           "Technology" and the stack's active word land close together on
           one shared row and read as a single running phrase — "Technology
           Secure", "Technology Connected" — rather than two separate
           headline blocks. */}
        <div ref={gridRef} className="mt-6 grid gap-10 lg:grid-cols-[50rem_1fr] lg:items-start lg:gap-3">
          {/* 1. TEXT — static headline, description, CTA. No inline
             cycling word at lg+: the adjacent stack column carries that
             role instead, so nothing is duplicated. */}
          <div className="flex flex-col">
            <h1 className={cn(HEADLINE_SIZE, "text-ink")}>
              <span ref={line1Ref} className="block">
                Technology
              </span>
              <div className="block h-[1.15em] overflow-hidden lg:hidden">
                <span key={tick} className="hero-word-in block" style={{ color: ACCENT_GOLD }}>
                  {activeWord}
                </span>
              </div>
            </h1>

            <p ref={subRef} className="mt-7 max-w-xs text-xl leading-relaxed text-ink-soft">
              A Dubai-based technology company delivering web design, cyber
              security, computer systems and IT network services — built
              locally, engineered for businesses that operate across
              borders.
            </p>

            <div ref={ctaRef} className="mt-9">
              <MagneticButton
                href="/contact"
                variant="outline"
                cursorLabel="Go"
                className="!rounded-full !border-ink/70 !px-8 !py-4 !text-base !text-ink"
              >
                Start a Project
              </MagneticButton>
            </div>
          </div>

          {/* 2. GIANT WORD STACK — desktop only. The gold slot is always
             the top of this block — permanently level with "Technology"
             and never moving. LOOP_WORDS is rendered once, in full, in
             plain document flow (no per-row position math at all), and a
             SINGLE `translateY` transform on that list slides it upward so
             the active word's real, measured `offsetTop` (see
             `listOffset` above) always lands at y=0 — exact by
             construction, never estimated, so it can't drift out of sync
             with which word is actually the highlighted one. */}
          <div
            ref={stackRef}
            aria-hidden="true"
            className="pointer-events-none relative hidden max-h-[64vh] select-none overflow-hidden lg:block"
            style={rowHeight ? { height: (TRAIL_COUNT + 1) * rowHeight } : undefined}
          >
            <div
              className="flex flex-col will-change-transform"
              style={{
                transform: `translateY(${listOffset}px)`,
                transition: "transform 0.8s cubic-bezier(0.65,0,0.35,1)",
              }}
            >
              {LOOP_WORDS.map((word, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className={cn(WORD_TYPE_CLASS, i !== tick && "text-ink-faint")}
                  style={i === tick ? { color: ACCENT_GOLD } : undefined}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
