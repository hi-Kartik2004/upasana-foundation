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

function SpecialEventTestimonialCard({
  title,
  description,
  image,
  name,
  date,
  type,
}) {
  return (
    <div className="w-full">
      <Card className="max-w-[400px] shadow-lg shadow-muted">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{type}</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          {description}
        </CardContent>
        <CardFooter>
          <div className="flex justify-between flex-wrap gap-4 w-full items-center">
            <div className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage src={image} />
              </Avatar>
              <p>{name}</p>
            </div>
            <p>{date}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SpecialEventTestimonialCard;
