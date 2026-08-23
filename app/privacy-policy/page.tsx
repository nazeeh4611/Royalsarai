import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.legalName} collects, uses and protects information submitted through this website.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Who we are",
    body: `${siteConfig.legalName} ("we", "us", "our") is a technology company registered and licensed in Dubai, United Arab Emirates (Licence No. ${siteConfig.registration.licenseNumber}). This policy explains how we handle information collected through this website.`,
  },
  {
    title: "2. Information we collect",
    body: "We collect information you provide directly, primarily through the contact form: your name, company name, email address, phone number (optional), the service you're enquiring about, an estimated budget (optional), and any project details you share. We do not currently use analytics, advertising or tracking cookies on this site.",
  },
  {
    title: "3. How we use it",
    body: "Information submitted through the contact form is used solely to respond to your enquiry, understand your project, and follow up about a potential engagement. We do not sell, rent or share this information with third parties for marketing purposes.",
  },
  {
    title: "4. Data retention",
    body: "We retain enquiry information for as long as reasonably necessary to respond to it and, where an engagement proceeds, for the duration of that relationship and any period required by applicable law or accounting obligations. You can request deletion at any time — see the contact details below.",
  },
  {
    title: "5. Data storage and security",
    body: "Information you submit is handled with reasonable technical and organisational safeguards appropriate to its sensitivity. As with any online form, no method of transmission or storage is completely secure, but we take reasonable steps to protect the information we hold.",
  },
  {
    title: "6. Your rights",
    body: "You may request access to, correction of, or deletion of the personal information we hold about you by contacting us using the details below. We will respond within a reasonable timeframe.",
  },
  {
    title: "7. Cookies",
    body: "This website does not currently set tracking or advertising cookies. Should that change — for example, if analytics are added in future — this policy will be updated accordingly.",
  },
  {
    title: "8. Children's privacy",
    body: "This website is intended for business enquiries and is not directed at children. We do not knowingly collect information from children.",
  },
  {
    title: "9. Changes to this policy",
    body: "We may update this policy from time to time to reflect changes in our practices or for legal reasons. The date of the most recent version will be reflected on this page.",
  },
  {
    title: "10. Contact",
    body: `For any privacy-related questions or requests, contact us at ${siteConfig.contact.email}.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Privacy Policy" }])} />

      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use and protect information submitted through this website."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <section className="border-t border-line bg-paper pb-28">
        <div className="edge container-max max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-ink-faint">
              Last updated: 22 August 2026
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col gap-10">
            {sections.map((s) => (
              <Reveal key={s.title}>
                <h2 className="text-lg font-bold text-ink">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
