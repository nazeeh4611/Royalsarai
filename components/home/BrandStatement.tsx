import { Reveal } from "@/components/ui/Reveal";

/** Large editorial wordmark moment — a closing brand beat before the
 * footer, not a heading (kept as <p> so it doesn't compete with the page's
 * real heading hierarchy). */
export function BrandStatement() {
  return (
    <section className="on-dark bg-paper py-24 text-ink lg:py-36">
      <div className="edge container-max text-center">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
            Royal Sarai Technologies
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-[clamp(2.4rem,9vw,7rem)] font-bold uppercase leading-[0.94] tracking-[-0.02em] text-ink">
            Royal Sarai
            <br />
            Technologies
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-md text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
            Web Design &middot; Cyber Security &middot; Systems &middot; IT
            Networks &mdash; Dubai, UAE
          </p>
        </Reveal>
      </div>
    </section>
  );
}
