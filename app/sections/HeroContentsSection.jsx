import Link from "next/link";
import React from "react";
import data from "@/app/data";
import Divider from "@/components/Divider";

function HeroContentsSection() {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="flex flex-col mb-6 lg:justify-between lg:flex-row md:mb-8">
        <h2 className="max-w-lg mb-5 font-sans text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:leading-none md:mb-6 group">
          <span className="inline-block mb-1 sm:mb-4">
            {data?.heroSecondSectionTitle1 + " "}
            <br className="hidden md:block" />
            {data?.heroSecondSectionTitle2}
          </span>
          <div className="h-1 ml-auto duration-300 origin-left transform bg-deep-purple-accent-400 scale-x-30 group-hover:scale-x-100" />
        </h2>

        <p className="text-muted-foreground lg:text-md lg:max-w-md">
          {data?.heroSecondSectionDescription}
        </p>
      </div>

      <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-4 sm:row-gap-6 sm:grid-cols-2">
        {data.heroSecondSectionCards &&
          data?.heroSecondSectionCards.map((card) => {
            return (
              <a href={card?.href} aria-label="View Item">
                <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
                  <img
                    className="object-cover w-full h-56 md:h-64 xl:h-80"
                    src={card?.image}
                    alt={card?.title}
                  />
                  <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black text-white bg-opacity-75">
                    <p className="text-sm font-medium tracking-wide">
                      {card?.title}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
      </div>
      <div className="text-center">
        <Link
          href="/"
          aria-label=""
          className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800 text-orange"
        >
          See more &rarr;
        </Link>
      </div>
    </div>
  );
}

export default HeroContentsSection;
