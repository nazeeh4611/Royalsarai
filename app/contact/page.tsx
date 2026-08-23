import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
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
      />

      <section className="border-t border-line bg-paper-dim pb-28 pt-4">
        <div className="edge container-max grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-10">
          <Reveal>
            <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-8 shadow-[var(--shadow-sm)] lg:sticky lg:top-32">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
                Direct
              </span>
              <ul className="mt-6 space-y-5">
                <li className="flex items-center gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink/5">
                    <Mail className="size-4 text-indigo" />
                  </span>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-sm font-medium text-ink transition-colors hover:text-indigo">
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink/5">
                    <Phone className="size-4 text-indigo" />
                  </span>
                  <a href={siteConfig.contact.phoneHref} className="text-sm font-medium text-ink transition-colors hover:text-indigo">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink/5">
                    <MapPin className="size-4 text-indigo" />
                  </span>
                  <span className="text-sm font-medium text-ink">
                    {siteConfig.location.city}, {siteConfig.location.country}
                  </span>
                </li>
              </ul>

              <div className="mt-7 flex items-start gap-3 border-t border-line pt-6">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-ink-faint" />
                <p className="text-xs leading-relaxed text-ink-faint">
                  Licensed by the Dubai Department of Economy &amp; Tourism —
                  License No. {siteConfig.registration.licenseNumber}.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-8 shadow-[var(--shadow-sm)] sm:p-10">
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
