"use client";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import data from "@/app/data";

const Item = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        type="button"
        aria-label="Open item"
        title="Open item"
        className="flex items-center justify-between w-full p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-medium">{title}</p>
        <svg
          viewBox="0 0 24 24"
          className={`w-3 text-gray-600 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            points="2,7 12,17 22,7"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          <p className="text-muted-foreground">{children}</p>
        </div>
      )}
    </div>
  );
};

export const FaqSection = () => {
  return (
    <section className="">
      <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16 ">
        <div class="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <div className="my-6">
              <Badge>{data?.faqSectionBadge}</Badge>
            </div>
            <h2 className=" mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-primary sm:text-5xl md:mx-auto">
              {data?.faqSectionTitle}
            </h2>
            <p className="text-base text-muted-foreground md:text-md">
              {data?.faqSectionDescription}
            </p>
          </div>
          <div class="space-y-4">
            {data?.faqSectionFAQs.map((faq, index) => (
              <Item title={faq.question} key={index}>
                {faq.answer}
              </Item>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
