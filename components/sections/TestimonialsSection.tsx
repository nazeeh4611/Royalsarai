import { Reveal } from "@/components/ui/Reveal";
import { Testimonials } from "@/components/ui/Testimonials";

interface TestimonialsSectionProps {
  eyebrow?: string;
  title?: string;
  className?: string;
}

export function TestimonialsSection({
  eyebrow = "Client feedback",
  title = "What clients are saying",
  className = "border-t border-line bg-paper-dim py-16 lg:py-24",
}: TestimonialsSectionProps) {
  return (
    <section className={className}>
      <div className="edge container-max">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
            {eyebrow}
          </span>
          <h2 className="mt-4 max-w-lg text-[clamp(2.2rem,4.2vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink">
            {title}
          </h2>
        </Reveal>
        <Reveal variant="fade" delay={0.15}>
          <Testimonials placeholder className="mt-14" />
        </Reveal>
      </div>
    </section>
  );
}
