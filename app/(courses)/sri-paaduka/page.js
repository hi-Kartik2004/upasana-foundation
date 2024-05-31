import { SriPaadukaFaqSection } from "@/app/sections/SriPaadukaFaqSection";
import { SriPaadukaSimpleHero } from "@/app/sections/SriPaadukaSimpleHero";
import SpecialEventTestimonialCard from "@/components/SpecialEventTestimonialCard";
import SpecialTypeRegistrationForm from "@/components/SpecialTypeRegistrationForm";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Marquee from "react-fast-marquee";
import globalData from "@/app/data";
import Head from "next/head";

function Page() {
  return (
    <div className="container flex flex-col items-center mt-12">
      <Head>
        <title>Shri Paaduka</title>
        <meta
          name="description"
          content="SadhguruShri Rama has consecrated Shri Paaduka as a Symbol of Guru Parampara by instilling it with both Dattatreya amsha and Shankara amsha (amsha refers to a portion of their energy) and a part of energy from his Sadhana. Pooja of Shri Paaduka is regularly performed. It has always bestowed all the Sadhakas with Upliftment and Prosperity.
          "
        />
        <meta
          name="keywords"
          content="Indian Mystic, Kundalini Yogi, Spiritual Master, About Sadhguru Shri, Sadhana, Spiritual experience, Shri Paaduka, Upasana foundation"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="upasana foundation" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SriPaadukaSimpleHero extraField={"Sri Paaduka Pooja"} />
      <Separator />
      <SriPaadukaFaqSection />
      <Separator />
      <div className="flex justify-around gap-6 items-center flex-wrap w-full">
        <div
          className="flex w-full flex-col px-4 py-10 max-w-[700px]"
          id="register"
        >
          <h2 className="text-3xl text-center font-bold mb-4">
            {globalData?.sriPaadukaFormHeading}
          </h2>
          <SpecialTypeRegistrationForm extraField={"Sri Paaduka Pooja"} />
        </div>

        {globalData?.sriPaadukaTestimonials.length > 0 && (
          <div className="max-w-[600px] w-full flex flex-col gap-6 items-center justify-center overflow-hidden mb-10">
            <Marquee
              gradient={false}
              speed={50}
              className="flex gap-10"
              direction="right"
              pauseOnHover
            >
              <div className="flex gap-6">
                {globalData?.sriPaadukaTestimonials.map(
                  (testimonial, index) => (
                    <SpecialEventTestimonialCard key={index} {...testimonial} />
                  )
                )}
              </div>
              <div className="flex gap-6">
                {globalData?.sriPaadukaTestimonials.map(
                  (testimonial, index) => (
                    <SpecialEventTestimonialCard key={index} {...testimonial} />
                  )
                )}
              </div>
            </Marquee>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
