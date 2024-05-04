import React from "react";
import data from "@/app/data";
import Link from "next/link";

function AboutHeroSection() {
  return (
    <div>
      <div className="relative flex flex-col-reverse py-16 lg:py-0 lg:flex-col">
        <div className="w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:py-20 lg:max-w-screen-xl">
          <div className="mb-0 lg:max-w-lg lg:pr-8 xl:pr-6">
            <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none md:text-center">
              {data?.aboutPageTitle1}
              <br className="hidden md:block" />
              {data?.aboutPageTitle2}
            </h2>
            <p className="mb-5 text-base text-muted-foreground md:text-lg md:text-center">
              {data?.aboutPageDescription}
            </p>
            <div className="mb-10 text-center md:mb-16 lg:mb-20">
              <Link
                href={`${data?.aboutPageLearnMoreLink}`}
                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-primary transition duration-200 rounded shadow-md md:w-auto bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                Learn more &rarr;
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 text-sm text-muted-foreground md:mb-2">
                Follow us
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <a
                    href={`${data?.instagram}`}
                    className="text-muted-foreground transition-colors duration-300 hover:text-deep-purple-accent-400"
                    target="_blank"
                  >
                    <svg
                      viewBox="0 0 30 30"
                      fill="currentColor"
                      className="h-6"
                    >
                      <circle cx="15" cy="15" r="4" />
                      <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                    </svg>
                  </a>
                </div>
                <div className="flex items-center">
                  <a
                    href={`${data?.facebook}`}
                    className="text-muted-foreground transition-colors duration-300 hover:text-deep-purple-accent-400"
                    target="_blank"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5"
                    >
                      <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                    </svg>
                  </a>
                </div>
                <div className="flex items-center">
                  <a
                    href={`${data?.youtube}`}
                    className="text-muted-foreground transition-colors duration-300 hover:text-deep-purple-accent-400"
                    target="_blank"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6"
                    >
                      <path d="M23.8,7.2c0,0-0.2-1.7-1-2.4c-0.9-1-1.9-1-2.4-1C17,3.6,12,3.6,12,3.6h0c0,0-5,0-8.4,0.2 c-0.5,0.1-1.5,0.1-2.4,1c-0.7,0.7-1,2.4-1,2.4S0,9.1,0,11.1v1.8c0,1.9,0.2,3.9,0.2,3.9s0.2,1.7,1,2.4c0.9,1,2.1,0.9,2.6,1 c1.9,0.2,8.2,0.2,8.2,0.2s5,0,8.4-0.3c0.5-0.1,1.5-0.1,2.4-1c0.7-0.7,1-2.4,1-2.4s0.2-1.9,0.2-3.9v-1.8C24,9.1,23.8,7.2,23.8,7.2z M9.5,15.1l0-6.7l6.5,3.4L9.5,15.1z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inset-y-0 top-0 right-0 w-full max-w-xl px-4 mx-auto mb-6 md:px-0 lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0">
          <img
            className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
            src={data?.aboutPageImage}
            alt={data?.aboutPageTitle1}
          />
        </div>
      </div>
    </div>
  );
}

export default AboutHeroSection;
