import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CTASection() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-paper py-16 text-ink lg:py-24">
      <Image
        src="/cyberhome.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover opacity-[0.14]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/90" />

      <div className="edge container-max relative flex flex-col items-center text-center">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
            Start a project
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[1] tracking-[-0.025em] text-ink text-balance">
            Have a technology project in mind? Let&rsquo;s scope it together.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-11">
            <MagneticButton href="/contact" cursorLabel="Go">
              Get in touch
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-1 text-sm text-ink-soft">
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
