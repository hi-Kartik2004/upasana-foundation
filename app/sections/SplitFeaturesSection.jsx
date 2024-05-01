import { Badge } from "@/components/ui/badge";
import React from "react";
import data from "@/app/data";
import Link from "next/link";

function SplitFeaturesSection() {
  return (
    <section className="bg-secondary">
      <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div className="my-6">
            <Badge>{data?.splitFeaturesSectionBadge}</Badge>
          </div>
          <h2 className="mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-primary sm:text-5xl md:mx-auto">
            {data?.splitFeaturesSectionTitle}
          </h2>
          <p className="text-base text-muted-foreground md:text-md">
            {data?.splitFeaturesSectionDescription}
          </p>
        </div>
        <div className="grid max-w-screen-lg mx-auto space-y-6 lg:grid-cols-2 lg:space-y-0 lg:divide-x">
          <div className="space-y-6 sm:px-16">
            {data?.splitFeaturesSectionDetails
              .slice(0, data?.splitFeaturesSectionDetails.length / 2)
              .map((details, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col max-w-md sm:flex-row md:pb-0 pb-4 md:border-none border-b"
                  >
                    <div className="mb-4 mr-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full ">
                        <svg
                          className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
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
                    </div>
                    <div>
                      <Link
                        href={details?.link}
                        className="mb-3 text-xl font-bold leading-5"
                      >
                        {details?.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {details?.description}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="space-y-6 sm:px-16">
            {data?.splitFeaturesSectionDetails
              .slice(data?.splitFeaturesSectionDetails.length / 2)
              .map((details, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col max-w-md sm:flex-row md:pb-0 pb-4 md:border-none border-b"
                  >
                    <div className="mb-4 mr-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full ">
                        <svg
                          className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
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
                    </div>
                    <div>
                      <Link
                        href={details?.link}
                        className="mb-3 text-xl font-bold leading-5"
                      >
                        {details?.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {details?.description}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SplitFeaturesSection;
