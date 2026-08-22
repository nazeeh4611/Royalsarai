import { Hero } from "@/components/home/Hero";
import { TrustIntro } from "@/components/home/TrustIntro";
import { Services } from "@/components/home/Services";
import { FullBleedShowcase } from "@/components/home/FullBleedShowcase";
import { WhyRoyalSarai } from "@/components/home/WhyRoyalSarai";
import { HowWeWork } from "@/components/home/HowWeWork";
import { CTASection } from "@/components/home/CTASection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { FAQSection } from "@/components/sections/FAQSection";
import { generalFAQs } from "@/lib/faq-general";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(generalFAQs)} />
      <Hero />
      <TrustIntro />
      <Services />
      <FullBleedShowcase />
      <WhyRoyalSarai />
      <HowWeWork />
      <TestimonialsSection />
      <InsightsPreview />
      <FAQSection items={generalFAQs} id="faq" />
      <CTASection />
    </>
  );
}
