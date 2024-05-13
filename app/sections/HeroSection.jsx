"use client";
import AlertComponent from "@/components/AlertComponent";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import data from "../data";
import Link from "next/link";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import Divider from "@/components/Divider";

function HeroSection({ isMember }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="pt-24 py-6 dark:bg-[url('/upasana-coverphoto-4.jpg')] bg-[url('/upasana-coverphoto-4.jpg')] bg-opacity-50 bg-blend-darken	 w-full overflow-hidden min-h-screen h-full bg-no-repeat">
      <div className="w-full p-5 max-w-[1300px] mx-auto my-auto flex-col flex justify-between items-center md:items-center lg:flex-row gap-10 h-full  mt-2 md:mt-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.3 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 10 },
          }}
          className="container flex flex-col lg:items-start items-center w-full my-auto h-full "
        >
          {/* <div className="mb-10">
            <AlertComponent
              badgeMessage={data?.heroBadgeMessage}
              alertMessage={data?.heroAlertMessage}
            />
          </div> */}
          <Divider />

          <h1 className="text-3xl lg:leading-tight md:text-4xl lg:text-5xl max-w-[800px] font-bold text-white">
            {data?.heroTitleLeft + " "}
            <span className="bg-gradient-to-b from-[white] to-[white] bg-clip-text text-transparent">
              {data?.heroTitleYellow + " "}
            </span>{" "}
            {data?.heroTitleRight}
          </h1>

          <p className="max-w-[800px] lg:text-base text-gray-700 text-md text-start my-6 lg:my-8">
            {data?.heroDescription}
          </p>

          <div className="flex gap-6 flex-col md:flex-row">
            {isMember ? (
              <Button
                className="flex gap-2 items-center font-semibold"
                size="lg"
              >
                <Link
                  href={`${data.heroYellowBtnLinkForMembers}`}
                  className="flex gap-2 items-center"
                >
                  {data?.heroYellowBtnMessageForMembers} &rarr;
                </Link>
              </Button>
            ) : (
              <Button
                className="flex gap-2 items-center font-semibold"
                size="lg"
              >
                <Link
                  href={`${data.heroYellowBtnLink}`}
                  className="flex gap-2 items-center"
                >
                  {data?.heroYellowBtnMessage} &rarr;
                </Link>
              </Button>
            )}

            <Button
              className="flex gap-2 items-center border-primary/20 border"
              variant="secondary"
              size="lg"
            >
              <Link href={`${data.heroSecondaryBtnLink}`}>
                {data.heroSecondaryBtnMessage} &rarr;
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="max-w-[500px] w-full block md:hidden">
          <img
            src="/heroImage.jpeg"
            alt="hero_img"
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 10 },
        }}
      >
        <Marquee className="" pauseOnHover={true}>
          <div className="flex justify-between">
            {data.heroMarqueeImages.map((image) => (
              <img
                src={image}
                alt={`hero-image ${image}}`}
                className="w-full rounded-xl mt-10 shadow-lg border-yellow-500/50 border-2 max-h-[300px] mr-6"
              />
            ))}
          </div>

          <div className="flex justify-between">
            {data.heroMarqueeImages.map((image) => (
              <img
                src={image}
                alt={`hero-image ${image}}`}
                className="w-full rounded-xl mt-10 shadow-lg border-yellow-500/50 border-2 max-h-[300px] mr-6"
              />
            ))}
          </div>
        </Marquee>
      </motion.div> */}
    </section>
  );
}

export default HeroSection;
