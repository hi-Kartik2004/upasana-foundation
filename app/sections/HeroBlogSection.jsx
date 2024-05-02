import React from "react";
import Link from "next/link";
import data from "@/app/data";

function HeroBlogSection() {
  return (
    <>
      <div className="flex flex-wrap justify-end mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl px-4 mt-10">
        {/* <p className="text-3xl">&larr; </p> */}
        <p className="text-lg text-primary">scroll &rarr; </p>
      </div>

      <div className="px-4 pt-10 pb-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-10 lg:pb-20">
        <div className="w-full flex space-x-4 overflow-x-auto">
          {data?.heroBlogSectionCards.map((ele, index) => (
            <div
              key={index}
              className="flex-shrink-0 overflow-hidden transition-shadow duration-300 bg-secondary rounded-lg shadow-sm max-w-[380px] w-full mb-2"
            >
              <img
                src={ele?.imgUrl}
                className="object-cover w-full h-96"
                alt={ele?.title}
              />
              <div className="p-5 border-t border-gray-300">
                <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                  <Link
                    href={ele?.href}
                    className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                    aria-label="Category"
                    title={ele?.badge}
                  >
                    {ele?.badge}
                  </Link>
                  <span className="text-muted-foreground"> — 28 Dec 2020</span>
                </p>
                <Link
                  href={ele?.href}
                  aria-label="Article Title"
                  title={ele?.title}
                  className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                  {ele?.title}
                </Link>
                <p className="mb-2 text-muted-foreground line-clamp-10">
                  {ele?.description}
                </p>
                <Link
                  href={ele?.href}
                  aria-label="Learn More"
                  className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                  Learn More &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HeroBlogSection;
