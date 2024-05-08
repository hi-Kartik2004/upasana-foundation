import AboutSadhguruDetails from "@/components/AboutSadhguruDetails";
import Link from "next/link";
import React from "react";
import data from "@/app/data";

function AboutSadhguru() {
  return (
    <>
      <section className="w-full py-24 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="hidden dark:block">
                <img
                  src="https://static.sadhguru.org/assets/images/flower-divider-horizontal-beige.svg"
                  alt="divider-flower-dark"
                  className="mb-2"
                />
              </div>

              <div className="block dark:hidden">
                <img
                  src=" https://static.sadhguru.org/d/46272/1654103596-divider-yoga.svg/"
                  alt="divider-flower-dark"
                  className="mb-2"
                />
              </div>

              <div className="space-y-2">
                <h1 className="text-primary text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  SadhguruShri Rama
                </h1>

                <h2 className="text-xl font-medium text-gray-500 dark:text-gray-400">
                  Founder, Upasana Foundation
                </h2>

                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  {/* {data?.aboutSadhguruTitle} */}
                  {data?.aboutSadhguruDescription()}
                </p>
              </div>
            </div>
            <img
              alt="about-sadhguru-landing-image"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              height="550"
              src="https://upasana-foundation.vercel.app/heroImage.jpeg"
              width="550"
            />
          </div>
        </div>
      </section>
      {data?.aboutSadhguruSections.map((section, index) => (
        <section
          className={`w-full py-12 md:py-24 lg:py-32 ${
            index % 2 === 0 ? "bg-gray-100 dark:bg-card" : ""
          }`}
          key={index}
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 xl:gap-12">
              {index % 2 === 0 ? (
                // Image on the left, text on the right
                <>
                  <img
                    alt="about-sadhgurushri-img"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    height="310"
                    src={section?.link}
                    width="550"
                  />
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        {section?.title}
                      </h2>
                      <p className="max-w-[600px] text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
                        {section?.description}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                // Image on the right, text on the left
                <>
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        {section?.title}
                      </h2>
                      <p className="max-w-[600px] text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
                        {section?.description}
                      </p>
                    </div>
                  </div>
                  <img
                    alt="about-sadhgurushri-img"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    height="310"
                    src={section?.link}
                    width="550"
                  />
                </>
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export default AboutSadhguru;
