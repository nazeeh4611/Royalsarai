import { Quote } from "lucide-react";
import { sampleTestimonials, type TestimonialItem } from "@/lib/testimonials";

interface TestimonialsProps {
  items?: TestimonialItem[];
  placeholder?: boolean;
  className?: string;
}

function TestimonialCard({ t }: { t: TestimonialItem }) {
  return (
    <figure className="flex h-full w-[300px] shrink-0 flex-col justify-between rounded-[var(--radius-md)] border border-line bg-surface p-8 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:border-ink-faint/40 hover:shadow-[var(--shadow-lg)] sm:w-[360px]">
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
 * Slow, continuous auto-scrolling loop (pauses on hover/focus, respects
 * prefers-reduced-motion via CSS only — no client JS needed). The card set
 * is duplicated once for a seamless -50% loop; the duplicate is marked
 * aria-hidden so screen readers only encounter each testimonial once.
 */
export function Testimonials({ items, placeholder = false, className }: TestimonialsProps) {
  const data = items ?? sampleTestimonials;
  const duration = Math.max(data.length * 7, 24);

  return (
    <div className={className}>
      {placeholder && (
        <p className="mb-8 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
          Sample layout — real client testimonials will replace this copy as
          projects launch.
        </p>
      )}

      <div className="testimonial-mask -mx-[var(--edge)] overflow-hidden px-[var(--edge)]">
        <div
          className="testimonial-track flex w-max gap-5"
          style={{ animationDuration: `${duration}s` }}
        >
          <div className="flex shrink-0 gap-5">
            {data.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
          <div className="flex shrink-0 gap-5" aria-hidden="true">
            {data.map((t, i) => (
              <TestimonialCard key={`dup-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
