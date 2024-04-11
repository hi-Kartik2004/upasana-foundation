import { Badge } from "@/components/ui/badge";
import React from "react";
import data from "@/app/data";
import Link from "next/link";

function FourCardFeaturesSection() {
  return (
    <section className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-10">
        <div className="my-6">
          <Badge>{data?.fourCardFeaturesSectionBadge}</Badge>
        </div>
        <h2 className="mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-primary sm:text-5xl md:mx-auto">
          {data?.fourCardFeaturesSectionTitle}
        </h2>
        <p className="text-base text-muted-foreground md:text-md">
          {data?.fourCardFeaturesSectionDescription}
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <p className="text-lg">scroll &rarr;</p>
      </div>
      <div className="flex overflow-auto space-x-4 w-full">
        {data?.fourCardFeaturesSectionCards.map((card, index) => (
          <div
            key={index}
            className={`flex flex-shrink-0 flex-col justify-between p-5 border rounded-lg shadow-sm bg-black/10 max-w-[280px] w-full mb-2`}
          >
            <div>
              <img
                src={card?.fourCardFeaturesSectionCardImage}
                alt={card?.title}
                className="w-full my-4 rounded-md"
              />
              <h6 className="mb-2 font-semibold leading-5">{card?.title}</h6>
              <p className="mb-3 text-sm text-muted-foreground">
                {card?.description}
              </p>
            </div>
            <Link
              href={card?.link}
              aria-label={card?.title}
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800 text-orange"
            >
              Learn more &rarr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FourCardFeaturesSection;
