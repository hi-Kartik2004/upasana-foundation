import AboutSadhguruDetails from "@/components/AboutSadhguruDetails";
import Link from "next/link";
import React from "react";
import data from "@/app/data";

function AboutSadhguru() {
  return (
    <div className="container mt-24">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-primary text-center text-4xl font-bold">
          {data?.aboutSadhguruTitle}
        </h1>
        <p className="text-center mt-2 text-muted-foreground">
          {data?.aboutSadhguruDescription}
        </p>
      </div>

      <div className="flex flex-wrap justify-between relative max-h-min mt-10 gap-24">
        <div className="xl:sticky top-28 max-h-[800px] h-full flex flex-col gap-4">
          <img
            src={data?.aboutSadhguruImage1}
            alt="sadhguru-shri"
            className="object-contain max-w-[470px] max-h-[500px] rounded-lg w-full shadow-lg shadow-primary/50"
          />

          {/* <img
            src={data?.aboutSadhguruImage2}
            alt="sadhguru-shri"
            className="hidden xl:block object-contain max-w-[470px] max-h-[500px] rounded-lg w-full shadow-lg shadow-primary/50"
          /> */}
        </div>

        <div className="max-w-[750px] w-full flex flex-col gap-10 mb-0 xl:mb-10">
          {data?.aboutSadhguruSections.map((ele, idx) => {
            return <AboutSadhguruDetails key={idx} {...ele} />;
          })}
        </div>

        {
          <div className="block xl:hidden mb-10">
            {/* <img
              src={data?.aboutSadhguruImage2}
              alt="sadhguru-shri"
              className="object-contain max-w-[470px] max-h-[500px] rounded-lg w-full shadow-lg shadow-primary/50"
            /> */}
          </div>
        }
      </div>
    </div>
  );
}

export default AboutSadhguru;
