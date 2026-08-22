import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { CursorProvider } from "@/components/cursor/CustomCursor";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/widgets/WhatsAppWidget";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.legalName,
  alternateName: siteConfig.legalNameArabic,
  url: siteConfig.siteUrl,
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressCountry: siteConfig.location.countryCode,
  },
  areaServed: "Worldwide",
  knowsAbout: siteConfig.licensedActivities.map((a) => a.name),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <CursorProvider>
          <SmoothScroll>
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppWidget />
          </SmoothScroll>
        </CursorProvider>
      </body>
    </html>
  );
}
