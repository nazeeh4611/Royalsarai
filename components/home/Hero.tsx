"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/cn";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HERO_VIDEO = {
  webm: "/hero-video/695f8c.webm",
  mp4: "/hero-video/695f8c.mp4",
  poster: "/hero-video/695f8c-poster.jpg",
};

// Single source of truth for the word system: drives the giant desktop
// stack and the headline's inline cycling word on mobile.
const words = ["Secure", "Connected", "Intelligent", "Automated", "Focused", "Scalable", "Responsive"];

// Every word in the stack — active or not — renders at this exact
// size/weight/leading/tracking. Only color differs, so the inactive words
// never read as a smaller "list" next to a bigger headline: they're the
// same scale as "Technology," itself.
const WORD_TYPE_CLASS =
  "block text-[clamp(2.6rem,6.2vw,5.5rem)] font-black leading-[1.05] tracking-[-0.025em] transition-colors duration-700 ease-out";

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

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [tick, setTick] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);
  const [listOffset, setListOffset] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoUnavailable, setVideoUnavailable] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(reduced);

    if (!reduced) {
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(
        line1Ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: "power3.out" }
      );
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.35, ease: "power3.out" }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.48, ease: "power3.out" }
      );
      gsap.fromTo(
        visualRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
      );
      gsap.fromTo(
        stackRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, delay: 0.1, ease: "power2.out" }
      );
    }
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

  useEffect(() => {
    if (reducedMotion) return;
    const el = videoRef.current;
    if (!el) return;
    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise.catch((err: unknown) => {
        // AbortError just means this particular play() call was interrupted
        // (e.g. React 18 Strict Mode's dev-only mount/unmount/remount cycle
        // tearing down the element mid-request) — not that playback is
        // actually unsupported. Only genuine failures should fall back.
        const isAbort = err instanceof DOMException && err.name === "AbortError";
        if (!isAbort) setVideoUnavailable(true);
      });
    }

    // Safety net: a source can stall indefinitely (buffering forever)
    // without ever firing an `error` event — the browser has no reason to
    // fall through to the next <source> if it never rejects. Fall back to
    // the static poster if no frame has actually decoded in time, instead
    // of leaving a video element stuck showing nothing.
    const stallTimer = setTimeout(() => {
      if (el.readyState < 2) setVideoUnavailable(true);
    }, 7000);
    const onPlaying = () => clearTimeout(stallTimer);
    el.addEventListener("playing", onPlaying);

    return () => {
      el.removeEventListener("playing", onPlaying);
      clearTimeout(stallTimer);
    };
  }, [reducedMotion]);

  const showVideo = !reducedMotion && !videoUnavailable;
  const activeWord = LOOP_WORDS[tick];

  return (
    <section className="relative overflow-hidden bg-white">
      {/* The outer row is unpadded vertically (only .edge's horizontal
         padding applies) and stretches to a full viewport height — that's
         what lets the video bleed truly edge-to-edge top-and-bottom.
         Deliberately NOT `container-max`: that class caps+centers content
         at 1400px, which would leave a dead gap between the video and the
         true right edge of the viewport on any screen wider than 1400px.
         The reference composition bleeds to the actual viewport edge at
         every width, matching the unscrolled navbar (also edge-only, no
         container-max — see Navbar.tsx). The text+stack block is a flex
         sibling that keeps its OWN generous top padding for navbar
         clearance, independent of the video. */}
      <div className="edge relative lg:flex lg:min-h-[100svh] lg:items-stretch">
        <div className="flex flex-1 flex-col justify-center gap-10 pb-16 pt-28 lg:gap-0 lg:pb-20 lg:pt-40">
          {/* Eyebrow sits ABOVE both the heading and the word stack (not
             just above the heading) so the text column and the stack
             column both start their content from the exact same shared
             top offset at lg+. That's what lets "Technology," and the
             stack's first line read as one continuous headline instead of
             two independently-centered blocks with a gap between them. */}
          <div
            ref={eyebrowRef}
            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#5D768B]"
          >
            <span className="h-px w-8 bg-[#C8D9E6]" />
            Dubai, United Arab Emirates
          </div>

          <div className="mt-6 grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start lg:gap-6">
            {/* 1. TEXT — static headline, description, CTA. No inline
               cycling word at lg+: the adjacent stack column carries that
               role instead, so nothing is duplicated. */}
            <div className="flex flex-col">
              <h1 className="text-[clamp(2.6rem,6.2vw,5.5rem)] font-black leading-[1.05] tracking-[-0.025em] text-[#13273F]">
                <span ref={line1Ref} className="block">
                  Technology,
                </span>
                <div className="block h-[1.15em] overflow-hidden lg:hidden">
                  <span key={tick} className="hero-word-in block text-blue">
                    {activeWord}
                  </span>
                </div>
              </h1>

              <p
                ref={subRef}
                className="mt-6 max-w-md text-lg leading-relaxed text-[#13273F]/65"
              >
                A Dubai-based technology company delivering web design, cyber
                security, computer systems and IT network services — built
                locally, engineered for businesses that operate across
                borders.
              </p>

              <div ref={ctaRef} className="mt-8">
                <MagneticButton
                  href="/contact"
                  variant="outline"
                  cursorLabel="Go"
                  className="!rounded-full !border-[#13273F]/70 !px-6 !py-3.5 !text-[#13273F]"
                >
                  Start a Project
                </MagneticButton>
              </div>
            </div>

            {/* 2. GIANT WORD STACK — desktop only. The blue slot is always
               the top of this block — permanently level with "Technology,"
               and never moving. LOOP_WORDS is rendered once, in full, in
               plain document flow (no per-row position math at all), and a
               SINGLE `translateY` transform on that list slides it upward
               so the active word's real, measured `offsetTop` (see
               `listOffset` above) always lands at y=0 — exact by
               construction, never estimated, so it can't drift out of sync
               with which word is actually colored blue. */}
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
                    className={cn(WORD_TYPE_CLASS, i === tick ? "text-blue" : "text-[#C8D9E6]")}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. VIDEO — mobile: a full-width block below the content, at
           the source's native 2:3 ratio so nothing is cropped away.
           Desktop: a flex sibling of the padded text+stack block above —
           so it stretches to the outer row's full unpadded height and
           bleeds truly edge-to-edge, top and bottom, past the content edge
           toward the viewport. A real part of the composition, not a card
           floating on the side. */}
        <div className="relative aspect-[2/3] w-full shrink-0 overflow-hidden sm:aspect-[4/3] lg:-mr-[var(--edge)] lg:aspect-auto lg:w-[27%] lg:self-stretch">
          <div ref={visualRef} className="relative h-full w-full">
            {showVideo ? (
              <video
                ref={videoRef}
                className="h-full w-full object-cover object-[50%_15%]"
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
                poster={HERO_VIDEO.poster}
                onError={() => setVideoUnavailable(true)}
              >
                <source src={HERO_VIDEO.mp4} type="video/mp4" />
                <source src={HERO_VIDEO.webm} type="video/webm" />
              </video>
            ) : (
              <Image
                src={HERO_VIDEO.poster}
                alt="A Royal Sarai Technologies team member"
                fill
                priority
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover object-[50%_15%]"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
