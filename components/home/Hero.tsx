"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { siteConfig } from "@/lib/site-config";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HERO_VIDEO = {
  webm: "/hero-video/hero-loop.webm",
  mp4: "/hero-video/hero-loop.mp4",
  poster: "/hero-video/hero-poster.jpg",
};

const words = [
  { label: "web presence.", className: "text-white" },
  { label: "cyber security.", className: "text-white" },
  { label: "core systems.", className: "text-white" },
  { label: "networks.", className: "text-white" },
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
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
    }
  }, []);

  useEffect(() => {
    if (!cycle) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 4200);
    return () => clearInterval(id);
  }, [cycle]);

  useEffect(() => {
    if (reducedMotion) return;
    const el = wordRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [index, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const el = videoRef.current;
    if (!el) return;
    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => setVideoUnavailable(true));
    }
  }, [reducedMotion]);

  const showVideo = !reducedMotion && !videoUnavailable;

  return (
    <section className="hero-viewport relative isolate flex items-center overflow-hidden bg-indigo pt-24 pb-14">
      <div className="absolute inset-0 -z-20 overflow-hidden">
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
            <source src={HERO_VIDEO.webm} type="video/webm" />
            <source src={HERO_VIDEO.mp4} type="video/mp4" />
          </video>
        ) : (
          <div className="hero-ken-burns absolute inset-0">
            <Image
              src={HERO_VIDEO.poster}
              alt="Network engineers connecting structured cabling into a network switch"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-overlay" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-text-scrim lg:block" />

      <div className="edge container-max relative w-full">
        <div className="max-w-2xl">
          <div
            ref={eyebrowRef}
            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/60"
          >
            <span className="h-px w-8 bg-white/30" />
            Dubai, United Arab Emirates
          </div>

          <h1 className="mt-6 text-[clamp(2.6rem,6.2vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.025em] text-white">
            <span ref={line1Ref} className="block text-balance">
              Technology, engineered for
            </span>
            <div className="mt-1 block h-[1.15em] overflow-hidden">
              <span ref={wordRef} className={`block ${words[index].className}`}>
                {words[index].label}
              </span>
            </div>
          </h1>

          <p
            ref={subRef}
            className="mt-7 max-w-lg text-lg leading-relaxed text-white/72"
          >
            Royal Sarai Technologies is a Dubai-based technology company
            delivering web design, cyber security, computer systems and IT
            network services — built locally, engineered for businesses that
            operate across borders.
          </p>

          <div ref={ctaRef} className="mt-7 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="/contact"
              variant="solid"
              cursorLabel="Go"
              className="!bg-white !text-ink shadow-[var(--shadow-lg)] hover:!bg-ink hover:!text-white"
            >
              Start a Project
            </MagneticButton>
            <MagneticButton
              href="#services"
              variant="ghost"
              showArrow={false}
              cursorLabel="View"
              className="!text-white hover:!text-white/65"
            >
              Explore Services
            </MagneticButton>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {siteConfig.licensedActivities.map((activity) => (
              <Link
                key={activity.slug}
                href={`/services/${activity.slug}`}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {activity.label}
              </Link>
            ))}
          </div>

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.12em] text-white/45">
            Licensed by the Dubai Department of Economy &amp; Tourism ·
            License No. {siteConfig.registration.licenseNumber}
          </p>
        </div>
      </div>
    </section>
  );
}
