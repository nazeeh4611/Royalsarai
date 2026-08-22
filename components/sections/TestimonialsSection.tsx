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
  className = "border-t border-line bg-paper py-24 lg:py-32",
}: TestimonialsSectionProps) {
  return (
    <section className={className}>
      <div className="edge container-max">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">
            {eyebrow}
          </span>
          <h2 className="mt-4 max-w-lg text-[clamp(1.9rem,3.2vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
            {title}
          </h2>
        </Reveal>
        <Reveal variant="fade" delay={0.15}>
          <Testimonials placeholder className="mt-10" />
        </Reveal>
      </div>
    </section>
  );
}
