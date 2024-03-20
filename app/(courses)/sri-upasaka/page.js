import { SriPaadukaFaqSection } from "@/app/sections/SriPaadukaFaqSection";
import { SriPaadukaSimpleHero } from "@/app/sections/SriPaadukaSimpleHero";
import SpecialEventTestimonialCard from "@/components/SpecialEventTestimonialCard";
import SpecialTypeRegistrationForm from "@/components/SpecialTypeRegistrationForm";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Marquee from "react-fast-marquee";

function Page() {
  return (
    <div className="container flex flex-col items-center mt-12">
      <SriPaadukaSimpleHero extraField={"Sri Upasaka"} />
      <Separator />
      <SriPaadukaFaqSection />
      <Separator />
      <div className="flex justify-between gap-6 items-center flex-wrap w-full">
        <div
          className="flex w-full flex-col px-4 py-10 max-w-[700px]"
          id="register"
        >
          <h2 className="text-3xl text-center font-bold mb-4">
            Reserve Your spot for {`Sri Upasaka!`}
          </h2>
          <SpecialTypeRegistrationForm extraField={"Sri Upasaka"} />
        </div>

        <div className="max-w-[600px] w-full flex flex-col gap-6 items-center justify-center overflow-hidden mb-10">
          <Marquee gradient={false} speed={50} className="flex gap-10">
            <div className="flex gap-6">
              <SpecialEventTestimonialCard />
              <SpecialEventTestimonialCard />
              <SpecialEventTestimonialCard />
            </div>
            <div className="flex gap-6">
              <SpecialEventTestimonialCard />
              <SpecialEventTestimonialCard />
              <SpecialEventTestimonialCard />
            </div>
          </Marquee>

          <Marquee
            gradient={false}
            speed={50}
            className="flex gap-10"
            direction="right"
          >
            <div className="flex gap-6">
              <SpecialEventTestimonialCard />
              <SpecialEventTestimonialCard />
              <SpecialEventTestimonialCard />
            </div>
            <div className="flex gap-6">
              <SpecialEventTestimonialCard />
              <SpecialEventTestimonialCard />
              <SpecialEventTestimonialCard />
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
}

export default Page;
