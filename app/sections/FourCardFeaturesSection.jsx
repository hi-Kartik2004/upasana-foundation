import { Badge } from "@/components/ui/badge";
import React from "react";
import data from "@/app/data";
import Link from "next/link";

function FourCardFeaturesSection() {
  return (
    <section className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
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
      <div className="grid gap-6 row-gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {data?.fourCardFeaturesSectionCards.map((card, index) => (
          <div
            key={index}
            className="bg-secondary flex flex-col justify-between p-5 border rounded-lg shadow-sm"
          >
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-lg-full">
                <svg
                  className="w-12 h-12 text-deep-purple-accent-400"
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
