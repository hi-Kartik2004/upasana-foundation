import AboutCardsSection from "@/app/sections/about/AboutCardsSection";
import AboutHeroSection from "@/app/sections/about/AboutHeroSection";
import AboutSadhguru from "@/app/sections/about/AboutSadhguru";
import React from "react";

function AboutUsPage() {
  return (
    <div className="mt-10">
      <AboutSadhguru />
      <AboutCardsSection />
      <AboutHeroSection />
    </div>
  );
}

export default AboutUsPage;
