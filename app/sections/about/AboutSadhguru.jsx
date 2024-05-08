import React from "react";
import data from "@/app/data";
import Divider from "@/components/Divider";
import ScibbleLine from "@/components/ScibbleLine";

function AboutSadhguru() {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-12 row-gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <Divider left={true} />
          <div className="max-w-xl mb-6 mt-2">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:leading-none">
              {data?.aboutPageHeroTitle}
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              {data?.aboutPageHeroDescription}
            </p>
          </div>
          <div className="grid gap-8 row-gap-8 sm:grid-cols-2 mt-4">
            {data?.aboutPageHeroCards.map((card, index) => (
              <div>
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-muted">
                  <svg
                    className="w-10 h-10 text-deep-purple-accent-400"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
                <h6 className="mb-2 font-semibold leading-5">{card?.title}</h6>
                <p className="text-sm text-muted-foreground">
                  {card?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <img
            className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
            src={data?.aboutPageHeroImage}
            alt={data?.aboutPageHeroTitle}
          />
        </div>
      </div>
    </div>
  );
}

export default AboutSadhguru;
