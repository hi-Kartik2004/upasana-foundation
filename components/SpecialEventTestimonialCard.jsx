import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";

function SpecialEventTestimonialCard() {
  return (
    <div className="w-full">
      <Card className="max-w-[400px] shadow-lg shadow-muted">
        <CardHeader>
          <CardTitle>What is Sri Paaduka Pooja?</CardTitle>
          <CardDescription>Type</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          You need to login to register for this pooja! You need to login to
          register for this pooja!
        </CardContent>
        <CardFooter>
          <div className="flex justify-between flex-wrap gap-4 w-full items-center">
            <div className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage src="https://ui.aceternity.com/_next/image?url=%2Flogo.png&w=64&q=75" />
              </Avatar>
              <p>lorem</p>
            </div>
            <p>lorem</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SpecialEventTestimonialCard;
