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
        <title>Shri Upasaka</title>
        <meta
          name="description"
          content="Shri Upasaka is a Sadhaka who is involved in some form of Guru Seva , for the Upliftment of the Everyone and Himself , Again Seva can be of any Form.
          "
        />
        <meta
          name="keywords"
          content="Indian Mystic, Kundalini Yogi, Spiritual Master, About Sadhguru Shri, Sadhana, Spiritual experience, Shri Upasaka, Upasana foundation, Volunteering"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="upasana foundation" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SriPaadukaSimpleHero
        extraField={"Sri Upasaka"}
        title={globalData?.sriUpasakaHeroTitle}
        description={globalData?.sriUpasakaHeroDescription}
        image={globalData?.sriUpasakaHeroImageUrl}
        cards={globalData?.sriUpasakaHeroCards}
      />
      <Separator />
      <SriPaadukaFaqSection
        badge={globalData?.sriUpasakaKnowMoreSectionBadge}
        title={globalData?.sriUpasakaKnowMoreSectionTitle}
        description={globalData?.sriUpasakaKnowMoreSectionDescription}
        questions={globalData?.sriUpasakaKnowMoreSectionQuestions}
      />
      <Separator />
      <div className="flex justify-around gap-6 items-center flex-wrap w-full">
        <div
          className="flex w-full flex-col px-4 py-10 max-w-[700px]"
          id="register"
        >
          <h2 className="text-3xl text-center font-bold mb-4">
            {globalData?.sriUpasakaFormHeading}
          </h2>
          <SpecialTypeRegistrationForm extraField={"Sri Upasaka"} />
        </div>

        {globalData?.sriUpasakaTestimonials.length > 0 && (
          <div className="max-w-[600px] w-full flex flex-col gap-6 items-center justify-center overflow-hidden mb-10">
            <Marquee
              gradient={false}
              speed={50}
              className="flex gap-10"
              pauseOnHover
            >
              <div className="flex gap-6">
                {globalData?.sriUpasakaTestimonials
                  .slice(0, globalData?.sriUpasakaTestimonials.length / 2)
                  .map((testimonial, index) => (
                    <SpecialEventTestimonialCard key={index} {...testimonial} />
                  ))}
              </div>
              <div className="flex gap-6">
                {globalData?.sriUpasakaTestimonials
                  .slice(0, globalData?.sriUpasakaTestimonials.length / 2)
                  .map((testimonial, index) => (
                    <SpecialEventTestimonialCard key={index} {...testimonial} />
                  ))}
              </div>
            </Marquee>

            <Marquee
              gradient={false}
              speed={50}
              className="flex gap-10"
              direction="right"
              pauseOnHover
            >
              <div className="flex gap-6">
                {globalData?.sriUpasakaTestimonials
                  .slice(globalData?.sriUpasakaTestimonials.length / 2)
                  .map((testimonial, index) => (
                    <SpecialEventTestimonialCard key={index} {...testimonial} />
                  ))}
              </div>
              <div className="flex gap-6">
                {globalData?.sriUpasakaTestimonials
                  .slice(globalData?.sriUpasakaTestimonials.length / 2)
                  .map((testimonial, index) => (
                    <SpecialEventTestimonialCard key={index} {...testimonial} />
                  ))}
              </div>
            </Marquee>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
