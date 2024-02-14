import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HeroCarousel() {
  return (
    <Carousel className="flex w-full h-[500px] rounded-lg object-cover  ">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className=" p-2 max-h-[500px] rounded-lg">
              {/* Ramdom image */}
              <div className="object-cover rounded-lg overflow-hidden border-red-500 border-2">
                <img
                  src="https://source.unsplash.com/random"
                  alt="hero"
                  className="object-cover w-full h-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
