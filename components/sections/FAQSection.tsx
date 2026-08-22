import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { FAQAccordion, type FAQItem } from "@/components/ui/FAQAccordion";

interface FAQSectionProps {
  items: FAQItem[];
  eyebrow?: string;
  title?: string;
  id?: string;
  /** "dark" flips this section onto the deep on-dark surface for rhythm
   * against neighbouring light sections. Defaults to "light" everywhere. */
  tone?: "light" | "dark";
}

export function FAQSection({
  items,
  eyebrow = "Frequently asked",
  title = "Questions worth answering up front",
  id,
  tone = "light",
}: FAQSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "border-t border-line bg-paper-dim py-16 text-ink lg:py-24",
        tone === "dark" && "on-dark"
      )}
    >
      <div className="edge container-max grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
            {eyebrow}
          </span>
          <h2 className="mt-4 max-w-sm text-[clamp(2.2rem,4vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink text-balance">
            {title}
          </h2>
        </Reveal>
        <FAQAccordion items={items} />
      </div>
    </section>
  );
}
