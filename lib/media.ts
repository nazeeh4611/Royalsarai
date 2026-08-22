/**
 * Central image registry.
 *
 * No stock-photo API key is available in this environment (Unsplash and
 * Pexels both require one; Unsplash's old key-free "Source" endpoint was
 * shut down in 2022). Every slot below therefore renders through
 * <MediaFrame>, which falls back to a custom abstract illustration
 * (see components/media/AbstractScene.tsx) instead of a broken <img>.
 *
 * TO SWAP IN REAL PHOTOGRAPHY LATER: fill in `src` (a local file under
 * /public or a configured remote domain) and `credit` on the relevant
 * entry below. MediaFrame automatically renders a real Next/Image once
 * `src` is present — no component changes required.
 */

export type MediaCategory =
  | "dubai-architecture"
  | "modern-office"
  | "enterprise-technology"
  | "cybersecurity"
  | "network-infrastructure"
  | "software-interface"
  | "abstract-technology"
  | "global-business";

export interface MediaCredit {
  name: string;
  href: string;
}

export interface MediaEntry {
  category: MediaCategory;
  alt: string;
  src?: string;
  credit?: MediaCredit;
  /** "cover" (default) crops to fill the frame — right for photography.
   * "contain" shows the whole image letterboxed — right for a mockup/
   * illustration where content near the edges matters. */
  fit?: "cover" | "contain";
}

function slot(entry: MediaEntry): MediaEntry {
  return entry;
}

export const mediaLibrary = {
  "home-hero-inset": slot({
    category: "dubai-architecture",
    alt: "Dubai skyline, viewed from a modern office",
  }),
  "home-why-royal-sarai": slot({
    category: "modern-office",
    alt: "A technology team collaborating across web, security and infrastructure work",
  }),
  "services-overview-hero": slot({
    category: "enterprise-technology",
    alt: "Editorial view of an enterprise technology workspace",
  }),
  "service-web-hero": slot({
    category: "software-interface",
    alt: "A Royal Sarai Technologies web platform shown across desktop, tablet and mobile, with deployment status, analytics and technology stack panels",
    src: "/webhome.png",
    fit: "contain",
  }),
  "service-cyber-hero": slot({
    category: "cybersecurity",
    src: "/cyberhome.png",
    fit: "cover",
    alt: "Data security operations and access control systems",
  }),
  "service-systems-hero": slot({
    category: "enterprise-technology",
    src: "/softwarehome.webp",
    fit: "contain",
    alt: "Interconnected computer systems and custom software",
  }),
  "service-network-hero": slot({
    category: "network-infrastructure",
    src: "/networkhome.webp",
    fit: "cover",
    alt: "Structured network infrastructure and connectivity hardware",
  }),
  "about-hero": slot({
    category: "dubai-architecture",
    alt: "Modern Dubai architecture and skyline",
  }),
  "about-approach": slot({
    category: "modern-office",
    alt: "A focused technology team at work",
  }),
  "industries-hero": slot({
    category: "global-business",
    alt: "Cross-industry enterprise technology in use",
  }),
  "global-presence-hero": slot({
    category: "global-business",
    alt: "Abstract global network connecting Dubai to international markets",
  }),
  "insights-hero": slot({
    category: "abstract-technology",
    alt: "Abstract technology and data visualisation",
  }),
  "contact-hero": slot({
    category: "dubai-architecture",
    alt: "Dubai business district at dusk",
  }),
} satisfies Record<string, MediaEntry>;

export type MediaId = keyof typeof mediaLibrary;
