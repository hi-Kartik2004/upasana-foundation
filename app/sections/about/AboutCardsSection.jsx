import React from "react";
import data from "@/app/data";

function AboutCardsSection() {
  return (
    <div className="bg-background">
      <div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data?.aboutPageCards.map((ele) => {
            return (
              <div className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-muted rounded shadow-xl group hover:shadow-2xl border border-gray-400">
                <div className="p-5">
                  <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-background">
                    <svg
                      className="w-8 h-8 text-deep-purple-accent-400"
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
                  <p className="mb-2 font-bold ">{ele?.title}</p>
                  <p className="text-sm leading-5 text-muted-foreground">
                    {ele?.description}
                  </p>
                </div>
                <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AboutCardsSection;
