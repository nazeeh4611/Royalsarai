"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/cn";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BrandMark } from "@/components/icons/BrandMark";

const HERO_VIDEO = {
  webm: "/hero-video/695f8c.webm",
  mp4: "/hero-video/695f8c.mp4",
  poster: "/hero-video/695f8c-poster.jpg",
};

const words = [
  { label: "web presence" },
  { label: "cyber security" },
  { label: "core systems" },
  { label: "networks" },
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoUnavailable, setVideoUnavailable] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(reduced);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCycle(!reduced);

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
        { opacity: 1, duration: 1, delay: 0.15, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (!cycle) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 4200);
    return () => clearInterval(id);
  }, [cycle]);

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

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Full-bleed visual panel — pinned to the true right edge of the
         viewport (not the max-width container) at lg+, matching the
         reference's edge-to-edge treatment. Stacks as a normal in-flow
         block above the fold on mobile instead. */}
      <div
        ref={visualRef}
        className="relative order-first h-[280px] w-full sm:h-[360px] lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:h-full lg:w-[45%]"
      >
        {showVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
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
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        )}
        {/* Protects navbar legibility: the fixed navbar's dark text sits
           over this panel pre-scroll, and the photo's tone varies too much
           to guarantee contrast on its own. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-28 bg-gradient-to-b from-white/80 via-white/30 to-transparent lg:block"
        />
        <BrandMark className="pointer-events-none absolute -bottom-10 -left-10 hidden h-40 w-40 text-white/80 sm:block lg:h-52 lg:w-52" />
      </div>

      <div className="edge container-max relative">
        <div className="flex min-h-0 flex-col justify-center py-14 lg:min-h-[100svh] lg:max-w-[52%] lg:py-28">
          {/* Decorative word backdrop — large-screen editorial flourish
             behind the heading, echoing the active cycling word. Purely
             decorative: aria-hidden, hidden below lg for the compact
             mobile view. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 left-[var(--edge)] -z-10 hidden select-none lg:block"
          >
            {words.map((w, i) => (
              <div
                key={w.label}
                className={cn(
                  "text-[3.2rem] font-extrabold uppercase leading-[1.05] tracking-tight text-ink transition-opacity duration-700 xl:text-[3.8rem]",
                  i === index ? "opacity-[0.06]" : "opacity-[0.03]"
                )}
              >
                {w.label}
              </div>
            ))}
          </div>

          <div
            ref={eyebrowRef}
            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint"
          >
            <span className="h-px w-8 bg-line-strong" />
            Dubai, United Arab Emirates
          </div>

          <h1 className="relative mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[clamp(2.2rem,6.2vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em] text-ink">
            <span ref={line1Ref} className="block">
              Technology,
            </span>
            <div className="block h-[1.15em] overflow-hidden">
              <span key={index} className="hero-word-in block text-blue">
                {words[index].label}.
              </span>
            </div>
          </h1>

          <p
            ref={subRef}
            className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            A Dubai-based technology company delivering web design, cyber
            security, computer systems and IT network services — built
            locally, engineered for businesses that operate across borders.
          </p>

          <div ref={ctaRef} className="mt-9">
            <MagneticButton
              href="/contact"
              variant="outline"
              cursorLabel="Go"
              className="!rounded-full !border-ink/80 !px-6 !py-3.5"
            >
              Start a Project
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
