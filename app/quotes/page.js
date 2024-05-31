import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import data from "@/app/data";
import Head from "next/head";

function Quotes() {
  return (
    <div className="container mt-24 mb-10">
      <Head>
        <title>Quotes</title>
        <meta
          name="description"
          content="Know what SadhguruShri Rama has said about Various fields of Life.
          "
        />
        <meta
          name="keywords"
          content="Indian Mystic, Kundalini Yogi, Spiritual Master, About Sadhguru Shri, Sadhana, Spiritual experience, Shri Upasaka, Upasana foundation, Volunteering, Sadhguru Shri Rama"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="upasana foundation" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-primary text-center text-4xl font-bold">
            {data?.quotesPageTitle}
          </h1>
          <p className="text-center mt-2 text-muted-foreground">
            {data?.quotesPageDescription}
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-around gap-4">
        {data?.quotes?.map((quote, index) => (
          <Card key={index} className="max-w-[420px]">
            <CardHeader>
              <CardTitle>{quote?.title}</CardTitle>
              <CardDescription>{quote?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={quote?.image} alt="quotes" />
            </CardContent>
          </Card>
        ))}
        {/* <Card className="max-w-[420px]">
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
        </Card> */}
      </div>
    </div>
  );
}

export default Quotes;
