"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import globalData from "@/app/data";
import Link from "next/link";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";

function FeaturedCourse() {
  const [hide, setHide] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / totalHeight) * 100;

      if (scrollPercentage > 3) {
        controls.start({ opacity: 1 });
      } else {
        controls.start({ opacity: 0 });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);
  return (
    // should only be seen after 5% scroll
    <motion.div
      animate={controls}
      className={`${
        hide
          ? "hidden"
          : "md:block fixed hidden z-10 bottom-0 left-0 max-w-[300px] w-full rounded  border bg-card p-4 opacity-0"
      } `}
    >
      <div className="relative">
        <div
          className="absolute top-0 left-0 cursor-pointer"
          onClick={() => {
            setHide(true);
          }}
        >
          <MdClose className="text-red-500 text-xl" />
        </div>
        <Link href={globalData?.featuredCourseLink}>
          <img src={`${globalData?.featuredCourseImage}`} alt="guruji_image" />
        </Link>
        <div className="mt-2 flex flex-col gap-1">
          <h3 className="text-lg">{globalData?.featuredCourseName}</h3>
          <p className="text-muted-foreground line-clamp-2 text-xs">
            {globalData?.featuredCourseDescription}
          </p>
          <button
            variant="secondary"
            className="w-full border-r-0 mt-2 bg-secondary p-2 rounded"
          >
            <Link href={`${globalData?.featuredCourseLink}`}>View Course</Link>
          </button>
          {/* <p
            className="text-xs mt-2 cursor-pointer"
            onClick={() => {
              setHide(true);
            }}
          >
            Close
          </p> */}
        </div>
      </div>
    </motion.div>
  );
}

export default FeaturedCourse;
