import AboutCardsSection from "@/app/sections/about/AboutCardsSection";
import AboutHeroSection from "@/app/sections/about/AboutHeroSection";
import AboutSadhguru from "@/app/sections/about/AboutSadhguru";
import React from "react";
import Head from "next/head";

function AboutUsPage() {
  return (
    <div className="mt-10">
      <Head>
        <title>About Upasana Foundation</title>
        <meta
          name="description"
          content="A Spiritual Organization founded by an SadhguruShri Rama to help people raise themselves to a Higher State of Life.Aimed for the Upliftment of an Individual , Under the Guidance of SadhguruShri, we provide people with various paths so that they can live a life full of Happiness. Our Shibirs, events are always aimed to help people experience a new dimension of life and connect internally."
        />
        <meta
          name="keywords"
          content="Spiritual, SadhguruShri, Shibirs, Happiness, Experience, Yoga, About Upasana Foundation"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Upasana Foundation" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AboutSadhguru />
      <AboutCardsSection />
      <AboutHeroSection />
    </div>
  );
}

export default AboutUsPage;
