import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Royal Sarai Technologies to discuss a web design, cyber security, systems or IT network project.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${siteConfig.shortName}`,
    description: "Get in touch to discuss a technology project.",
    url: `${siteConfig.siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Contact" }])} />

      <PageHero
        eyebrow="Contact"
        title="Tell us about the project."
        description="Share a few details and we'll follow up to scope the discovery phase — no obligation, no generic sales pitch."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        visual={<MediaFrame id="contact-hero" scene="skyline" tone="gold" className="aspect-[4/3]" priority />}
      />

      <section className="border-t border-line bg-paper pb-28">
        <div className="edge container-max grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
                Direct
              </span>
              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-indigo" />
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-ink hover:text-indigo">
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-indigo" />
                  <a href={siteConfig.contact.phoneHref} className="text-sm text-ink hover:text-indigo">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-indigo" />
                  <span className="text-sm text-ink-soft">
                    {siteConfig.location.city}, {siteConfig.location.country}
                  </span>
                </li>
              </ul>
              <p className="mt-8 max-w-xs text-xs leading-relaxed text-ink-faint">
                Licensed by the Dubai Department of Economy &amp; Tourism —
                License No. {siteConfig.registration.licenseNumber}.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </>
  );
}
