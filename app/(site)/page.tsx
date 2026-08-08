import HeroSection from "@/app/components/sections/home/HeroSection";
import FAQSection from "@/app/components/sections/shared/FAQSection";
import PricingSection from "@/app/components/sections/home/PricingSection";
import TestimonialsSection from "@/app/components/sections/home/TestimonialsSection";
import WhatYouGet from "@/app/components/sections/home/whatYouGet";
import ServiceSection from "../components/sections/home/ServiceSection";

export default function Home() {
  return (
    <main>
      <div className="md:pt-20 bg-[#f1f2f3]">
        <HeroSection />
      </div>
      <ServiceSection />
      <TestimonialsSection />
      <PricingSection />
      <WhatYouGet />
      <FAQSection />
    </main>
  );
}
