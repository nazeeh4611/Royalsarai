"use client";

import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import { sampleTestimonials, type TestimonialItem } from "@/lib/testimonials";

interface TestimonialsProps {
  items?: TestimonialItem[];
  placeholder?: boolean;
  className?: string;
}

function TestimonialCard({ t, duplicate }: { t: TestimonialItem; duplicate?: boolean }) {
  return (
    <figure
      aria-hidden={duplicate || undefined}
      className="flex h-full w-[300px] shrink-0 snap-start flex-col justify-between rounded-[var(--radius-md)] border border-line bg-surface p-8 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:border-ink-faint/40 hover:shadow-[var(--shadow-lg)] sm:w-[360px]"
    >
      <Quote className="size-6 text-ink-faint" strokeWidth={1.5} />
      <blockquote className="mt-6 flex-1 text-sm leading-relaxed text-ink-soft">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-7 border-t border-line pt-5 text-sm">
        <span className="block font-semibold text-ink">{t.name}</span>
        <span className="text-ink-faint">
          {t.role}, {t.company}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Auto-scrolling loop driven by rAF nudging `scrollLeft` on a real
 * `overflow-x-auto` track (not a CSS transform) so a visitor can drag/swipe
 * through the cards at any time — any pointer/touch/focus interaction pauses
 * the autoplay, which resumes after a short idle period. The card set is
 * duplicated once for a seamless loop; the duplicate is `aria-hidden` so
 * screen readers only encounter each testimonial once.
 */
export function Testimonials({ items, placeholder = false, className }: TestimonialsProps) {
  const data = items ?? sampleTestimonials;
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pxPerSecond = 26;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) {
        const half = el.scrollWidth / 2;
        el.scrollLeft += pxPerSecond * dt;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [data]);

  const pause = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const scheduleResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, 2600);
  };

  return (
    <div className={className}>
      {placeholder && (
        <p className="mb-8 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
          Sample layout — real client testimonials will replace this copy as
          projects launch.
        </p>
      )}

      <div
        ref={trackRef}
        onPointerDown={pause}
        onPointerUp={scheduleResume}
        onPointerCancel={scheduleResume}
        onMouseEnter={pause}
        onMouseLeave={scheduleResume}
        onFocus={pause}
        onBlur={scheduleResume}
        className="scrollbar-hide testimonial-mask -mx-[var(--edge)] flex snap-x snap-proximity gap-5 overflow-x-auto px-[var(--edge)]"
      >
        {data.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
        {data.map((t, i) => (
          <TestimonialCard key={`dup-${i}`} t={t} duplicate />
        ))}
      </div>
    </div>
  );
}
