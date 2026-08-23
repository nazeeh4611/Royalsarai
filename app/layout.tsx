import type { Metadata, Viewport } from "next";
import { Archivo_Black, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CallWidget } from "@/components/widgets/CallWidget";
import { JsonLd } from "@/components/seo/JsonLd";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// A single, unapologetically heavy display face reserved for the hero's
// kinetic headline/word stack — noticeably bolder than Manrope even at its
// own black weight, so the giant type reads as intentional, not just big.
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.shortName} | Technology Company in Dubai, UAE`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description:
    "Royal Sarai Technologies is a Dubai-based technology company delivering web design, cyber security, computer systems and IT network services for businesses operating across borders.",
  keywords: [
    "technology company Dubai",
    "web design Dubai",
    "cyber security Dubai",
    "IT network services Dubai",
    "data management UAE",
    "computer systems Dubai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.siteUrl,
    siteName: siteConfig.shortName,
    title: `${siteConfig.shortName} | Technology Company in Dubai, UAE`,
    description:
      "Web design, cyber security, computer systems and IT network services — engineered in Dubai for businesses operating across borders.",
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.shortName} | Technology Company in Dubai, UAE`,
    description:
      "Web design, cyber security, computer systems and IT network services — engineered in Dubai for businesses operating across borders.",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1f33" },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.siteUrl}/#organization`,
  name: siteConfig.legalName,
  alternateName: siteConfig.legalNameArabic,
  url: siteConfig.siteUrl,
  logo: `${siteConfig.siteUrl}/apple-icon`,
  image: `${siteConfig.siteUrl}/apple-icon`,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressCountry: siteConfig.location.countryCode,
  },
  areaServed: "Worldwide",
  knowsAbout: siteConfig.licensedActivities.map((a) => a.name),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.siteUrl}/#website`,
  name: siteConfig.shortName,
  url: siteConfig.siteUrl,
  publisher: { "@id": `${siteConfig.siteUrl}/#organization` },
  inLanguage: "en-AE",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${archivoBlack.variable}`}>
      <body>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CallWidget />
        </SmoothScroll>
      </body>
    </html>
  );
}
