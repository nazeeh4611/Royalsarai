import { siteConfig } from "@/lib/site-config";
import type { Crumb } from "@/components/ui/Breadcrumbs";
import type { FAQItem } from "@/components/ui/FAQAccordion";

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${siteConfig.siteUrl}${item.href}` } : {}),
    })),
  };
}

export function faqSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${siteConfig.siteUrl}/services/${slug}`,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.legalName,
    },
    areaServed: "Worldwide",
  };
}
