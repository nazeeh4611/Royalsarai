import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CTASection() {
  return (
    <section className="on-dark bg-paper py-24 text-ink lg:py-28">
      <div className="edge container-max flex flex-col items-center text-center">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">
            Start a project
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink text-balance">
            Have a technology project in mind? Let&rsquo;s scope it together.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-9">
            <MagneticButton href="/contact" cursorLabel="Go">
              Get in touch
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-col items-center gap-1 text-sm text-ink-soft">
            <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-ink">
              {siteConfig.contact.email}
            </a>
            <a href={siteConfig.contact.phoneHref} className="transition-colors hover:text-ink">
              {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
