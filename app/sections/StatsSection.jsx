import React from "react";
import data from "@/app/data";

function StatsSection() {
  return (
    <section className="bg-secondary">
      <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div class="grid grid-cols-2 row-gap-16 gap-10 md:gap-0 md:grid-cols-4">
          {data?.stats.map((ele) => {
            return (
              <div class="text-center md:border-r">
                <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">
                  {ele?.number}
                </h6>
                <p class="text-sm font-medium tracking-widest text-muted-foreground uppercase lg:text-base">
                  {ele?.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
