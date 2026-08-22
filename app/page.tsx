import { Hero } from "@/components/home/Hero";
import { TrustIntro } from "@/components/home/TrustIntro";
import { WordmarkMarquee } from "@/components/home/WordmarkMarquee";
import { Services } from "@/components/home/Services";
import { WhyRoyalSarai } from "@/components/home/WhyRoyalSarai";
import { CTASection } from "@/components/home/CTASection";
import { BrandStatement } from "@/components/home/BrandStatement";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
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
      <WordmarkMarquee />
      <Services />
      <WhyRoyalSarai />
      <TestimonialsSection />
      <FAQSection items={generalFAQs} id="faq" />
      <CTASection />
      <BrandStatement />
    </>
  );
}
