import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { BiCalendar } from "react-icons/bi";
import { MdMarkEmailRead } from "react-icons/md";
import { PiHandCoins } from "react-icons/pi";
import Link from "next/link";
import { FaPhoneAlt, FaLocationDot } from "react-icons/fa";
import { globalData } from "@/app/data";
import { Separator } from "@/components/ui/separator";
import { RiUserLocationLine } from "react-icons/ri";
import RegisterForm from "@/components/RegisterForm";

async function Course({ params }) {
  let courseData;
  try {
    const courseRef = doc(db, "courses", params.id);
    const resp = await getDoc(courseRef);
    courseData = resp.data();
    console.log(courseData);
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <section className="flex flex-wrap container gap-10 mt-16 py-10 justify-center xl:justify-between">
        <div className="max-w-[650px] w-full">
          <div className="w-full h-[100px] rounded-md">
            <img
              src={`https://source.unsplash.com/random/350X350/?nature`}
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
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <PiHandCoins />

                  <span className="text-muted-foreground text-sm">
                    Rs {courseData?.fees} /-
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="text-xl font-semibold">About the event</h1>
            <p className="text-muted-foreground mt-2">
              {courseData?.description}
            </p>
          </div>

          <div className="mt-8">
            <h1 className="text-xl font-semibold">Rewards</h1>
            <p className="text-muted-foreground mt-2">{courseData?.prizes}</p>
          </div>

          <div className="mt-8">
            <h1 className="text-xl font-semibold">Contact</h1>
            <div className="mt-2 flex gap-2 items-center">
              <p>{globalData?.presidentName}</p> -
              <Link
                href={`tel:${globalData?.presidentPhone}`}
                className="flex items-center gap-2 text-muted-foreground hover:underline underline-offset-4"
              >
                <FaPhoneAlt />
                <span>{globalData?.presidentPhone}</span>
              </Link>
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <p>{globalData?.presidentName}</p> -
              <Link
                href={`mailto:${globalData?.presidentEmail}`}
                className="flex items-center gap-2 text-muted-foreground hover:underline underline-offset-4"
              >
                <MdMarkEmailRead />
                <span>{globalData?.presidentEmail}</span>
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
          </div>

          <div className="mt-8 w-full">
            <img
              src={`${courseData?.image}`}
              alt={`${courseData?.name}`}
              className=" object-cover rounded-md bg-muted"
            />
          </div>
        </div>

        <div className="max-w-[600px] flex flex-col w-full bg-card p-8 py-10 rounded-md border md:overflow-auto">
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
