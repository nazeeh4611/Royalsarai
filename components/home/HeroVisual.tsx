"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { MediaFrame } from "@/components/media/MediaFrame";
import {
  CyberSecurityIcon,
  NetworkIcon,
  SystemsIcon,
  WebDesignIcon,
} from "@/components/icons/ServiceIcons";
import type { MediaId } from "@/lib/media";
import type { SceneVariant } from "@/components/media/AbstractScene";

const slides: {
  mediaId: MediaId;
  scene: SceneVariant;
  tone: "indigo" | "gold" | "blue" | "violet";
  label: string;
  Icon: typeof WebDesignIcon;
}[] = [
  { mediaId: "service-web-hero", scene: "stack", tone: "indigo", label: "Web Design", Icon: WebDesignIcon },
  { mediaId: "service-cyber-hero", scene: "mesh", tone: "gold", label: "Cyber Security", Icon: CyberSecurityIcon },
  { mediaId: "service-systems-hero", scene: "stack", tone: "blue", label: "Systems & Software", Icon: SystemsIcon },
  { mediaId: "service-network-hero", scene: "mesh", tone: "violet", label: "IT Networks", Icon: NetworkIcon },
];

interface HeroVisualProps {
  activeIndex?: number;
}

export function HeroVisual({ activeIndex = 0 }: HeroVisualProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(badgeRef.current, { y: -10, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const active = slides[activeIndex % slides.length];

  return (
    <div ref={rootRef} className="relative mx-auto aspect-[4/5] w-full max-w-[520px]">
      <div className="relative h-full w-full overflow-hidden rounded-[var(--radius-lg)] border border-line bg-gradient-to-br from-gold/10 via-surface to-indigo-dark/25 shadow-[var(--shadow-lg)]">
        <AnimatePresence initial={false}>
          <motion.div
            key={active.mediaId}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-5 sm:inset-7"
          >
            <MediaFrame
              id={active.mediaId}
              scene={active.scene}
              tone={active.tone}
              rounded="md"
              className="h-full w-full"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div ref={badgeRef} className="absolute left-4 top-4 sm:left-6 sm:top-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-[var(--shadow-lg)] backdrop-blur-md"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-gold/15 text-gold">
                <active.Icon className="size-4" strokeWidth={1.75} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-ink">
                {active.label}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
