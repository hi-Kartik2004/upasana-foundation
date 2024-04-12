import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { BiCalendar } from "react-icons/bi";
import { MdMarkEmailRead } from "react-icons/md";
import { PiHandCoins } from "react-icons/pi";
import Link from "next/link";
import { FaPhoneAlt, FaLocationDot } from "react-icons/fa";
import globalData from "@/app/data";
import { Separator } from "@/components/ui/separator";
import { RiUserLocationLine } from "react-icons/ri";
import RegisterForm from "@/components/RegisterForm";
import { currentUser } from "@clerk/nextjs";
import { BsFillClockFill } from "react-icons/bs";

async function Course({ params }) {
  const user = await currentUser();
  let courseData;
  try {
    const courseRef = doc(db, "courses", params.id);
    const resp = await getDoc(courseRef);
    courseData = resp.data();
    courseData = { ...courseData, id: resp.id };
    console.log(courseData);
  } catch (err) {
    console.error(err);
  }

  function reverseDateFormat(dateString) {
    if (!dateString) return "Anytime"; // Return "Anytime" if dateString is empty or undefined

    const parts = dateString.split("-"); // Split the date string by "-"
    const reversedDate = parts.reverse().join("-"); // Reverse the order of parts and join them with "-"

    return reversedDate;
  }

  return (
    <>
      <section className="flex flex-wrap container gap-10 mt-16 py-10 justify-center xl:justify-between relative">
        <div className="max-w-[650px] w-full">
          <div className="w-full h-[100px] rounded-md">
            <img
              src={`https://source.unsplash.com/random/?nature`}
              alt="unsplash_image_for_this_event"
              className="w-full h-full object-cover rounded-md bg-muted"
            />
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-semibold">{courseData?.name}</h1>
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <RiUserLocationLine />

                  <span className="text-muted-foreground text-sm">
                    {courseData?.venue}
                  </span>
                </div>

                {/* <div className="flex gap-2 items-center">
                  <BiCalendar />
                  <span className="text-muted-foreground text-sm">
                    {reverseDateFormat(courseData?.startDate)}
                  </span>
                </div> */}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <PiHandCoins />

                  <span className="text-muted-foreground text-sm">
                    Rs {courseData?.fees} /-
                  </span>
                </div>

                {/* <div className="flex gap-2 items-center">
                  <BsFillClockFill />

                  <span className="text-muted-foreground text-sm">
                    {!courseData.time ? "Anytime" : courseData.time}
                  </span>
                </div> */}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="text-xl font-semibold">About the event</h1>
            <p className="text-muted-foreground mt-2 whitespace-pre-wrap">
              {courseData?.description}
            </p>
          </div>

          <div className="mt-8">
            <h1 className="text-xl font-semibold">Rewards</h1>
            <p className="text-muted-foreground mt-2 whitespace-pre-wrap">
              {courseData?.prizes}
            </p>
          </div>

          <div className="mt-8">
            <h1 className="text-xl font-semibold">Contact</h1>
            <div className="mt-2 flex gap-2 items-center">
              <p>{globalData?.contactPerson}</p> -
              <Link
                href={`tel:${globalData?.contactPhone}`}
                className="flex items-center gap-2 text-muted-foreground hover:underline underline-offset-4"
              >
                <FaPhoneAlt />
                <span>{globalData?.contactPhone}</span>
              </Link>
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <p>{globalData?.contactPerson}</p> -
              <Link
                href={`mailto:${globalData?.contactEmail}`}
                className="flex items-center gap-2 text-muted-foreground hover:underline underline-offset-4"
              >
                <MdMarkEmailRead />
                <span>{globalData?.contactEmail}</span>
              </Link>
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <p>Alternate Email</p> -
              <Link
                href={`mailto:${courseData?.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:underline underline-offset-4"
              >
                <MdMarkEmailRead />
                <span>{courseData?.email}</span>
              </Link>
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <p>Other Link</p> -
              <Link
                href={`${courseData?.link}`}
                className="flex items-center gap-2 text-muted-foreground hover:underline underline-offset-4"
              >
                <MdMarkEmailRead />
                <span>{courseData?.link}</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 w-full">
            <img
              src={`${courseData?.image}`}
              alt={`${courseData?.name}`}
              className=" object-cover rounded-md bg-muted"
            />
          </div>
        </div>

        <div
          className={`max-w-[600px] xl:sticky ${
            user ? "max-h-[800px] sm:max-h-[650px]" : "max-h-[400px]"
          } top-24 right-0 flex flex-col w-full bg-card p-8 py-10 rounded-md border md:overflow-auto`}
        >
          <h1 className="text-3xl font-semibold text-center">
            <span className="text-primary">Register</span> for{" "}
            {courseData?.name}!
          </h1>

          <p className="text-center text-muted-foreground mt-2">
            {globalData?.registerDescription}
          </p>

          <div className="mt-6 pr-4">
            <RegisterForm data={courseData} />
          </div>
        </div>
      </section>

      <Separator className="my-4" />
    </>
  );
}

export default Course;
