/**
 * Central, editable source of truth for business-facing content.
 * Sourced from the Dubai DET trade licence (No. 1642077) and Chamber of
 * Commerce membership certificate (No. 696416). Placeholder fields are
 * marked explicitly — replace them once the client confirms final values.
 */

export const siteConfig = {
  legalName: "ROYAL SARAI TECHNOLOGIES L.L.C",
  legalNameArabic: "رويال سراي للتكنولوجيا ش.ذ.م.م",
  shortName: "Royal Sarai Technologies",
  legalStructure: "Limited Liability Company – Single Owner (LLC-SO)",

  location: {
    city: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
  },

  registration: {
    licenseNumber: "1642077",
    commercialRegisterNumber: "2903403",
    chamberMembershipNumber: "696416",
  },

  licensedActivities: [
    {
      name: "Web-Design",
      slug: "web-design-development",
      label: "Web Design & Development",
    },
    {
      name: "Data Management & Cyber Security Services",
      slug: "data-management-cyber-security",
      label: "Data Management & Cyber Security",
    },
    {
      name: "Computer Systems & Communication Equipment Software Design",
      slug: "computer-systems-software",
      label: "Computer Systems & Software",
    },
    {
      name: "Information Technology Network Services",
      slug: "it-network-services",
      label: "IT Network Services",
    },
  ],

  contact: {
    phoneDisplay: "+971 55 413 7228",
    phoneHref: "tel:+971554137228",
    email: "info@royalsaraitechnologies.com",
    // PLACEHOLDER — digits only (country code, no "+", no spaces), used to
    // build the wa.me deep link in the WhatsApp widget. This is not a real,
    // monitored WhatsApp Business number yet — replace before launch.
    whatsappNumber: "971500000000",
  },

  siteUrl: "https://royalsarai.ae",

  nav: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Global", href: "/global-presence" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],

  socialLinks: [] as { label: string; href: string }[],
};

export type SiteConfig = typeof siteConfig;
