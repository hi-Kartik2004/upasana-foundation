import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

function Quotes() {
  return (
    <div className="container mt-24 mb-10">
      <div>
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-primary text-center text-4xl font-bold">
            lorem ipsum.
          </h1>
          <p className="text-center mt-2 text-muted-foreground">
            lorem ipsum dor sit ipem
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-around gap-4">
        <Card className="max-w-[420px]">
          <CardHeader>
            <CardTitle>Lorem ipsum dor sit ipem</CardTitle>
            <CardDescription>Lorem ipsum dor sit ipem</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src="https://www.upasanafoundation.org/assets/img/trainers/trainer-1.jpg"
              alt="quotes"
            />
          </CardContent>
        </Card>

        <Card className="max-w-[420px]">
          <CardHeader>
            <CardTitle>Lorem ipsum dor sit ipem</CardTitle>
            <CardDescription>Lorem ipsum dor sit ipem</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src="https://www.upasanafoundation.org/assets/img/trainers/trainer-1.jpg"
              alt="quotes"
            />
          </CardContent>
        </Card>

        <Card className="max-w-[420px]">
          <CardHeader>
            <CardTitle>Lorem ipsum dor sit ipem</CardTitle>
            <CardDescription>Lorem ipsum dor sit ipem</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src="https://www.upasanafoundation.org/assets/img/trainers/trainer-1.jpg"
              alt="quotes"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Quotes;
