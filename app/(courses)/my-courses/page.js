import React from "react";
import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import globalData from "@/app/data";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
export const dynamic = "force-dynamic";

async function MyCourses() {
  // no cache
  console.log("My courses page");

  function isCurrentTimeBetween(courseStartsTimestamp, courseExpiresTimestamp) {
    // Get the current timestamp
    console.log(courseStartsTimestamp, courseExpiresTimestamp);
    const currentTime = Date.now();

    // Check if the current time is between courseStarts and courseExpires
    return (
      currentTime >= courseStartsTimestamp &&
      currentTime <= courseExpiresTimestamp
    );
  }

  function isCourseExpired(courseExpiresTimestamp) {
    // Get the current timestamp
    const currentTime = Date.now();

    // Check if the current time is greater than courseExpires
    return currentTime > courseExpiresTimestamp;
  }

  const user = await currentUser();
  let data;
  try {
    const eventCollection = collection(db, "course-registrations");
    const q = query(
      eventCollection,
      where("registeredEmail", "==", user.emailAddresses[0].emailAddress)
    );
    const querySnapshot = await getDocs(q);
    const currentTime = Date.now();
    data = querySnapshot.docs
      .map((doc) => {
        const courseData = doc.data();

        return {
          ...courseData,
        };
      })
      .filter(Boolean);
  } catch (err) {
    console.error(err);
  }

  console.log(
    data[0]?.courseStarts,
    data[0]?.courseExpires,
    isCurrentTimeBetween(data[0]?.courseStarts, data[0]?.courseExpires)
  );

  return (
    <div className="mt-24 py-4 container">
      <h1 className="text-4xl font-bold text-center">
        {globalData?.myCoursesTitle}
      </h1>
      <p className="text-center mt-2 text-muted-foreground">
        {globalData?.myCoursesDescription}
      </p>
      <div className="flex justify-center mt-4">
        <Link href="/my-music" className="underline underline-offset-8">
          My Music &rarr;
        </Link>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {data.map((ele) => {
          return (
            <div
              key={ele.name}
              className="border relative overflow-hidden transition-shadow duration-300 bg-background rounded"
            >
              <Link href={"/course/" + ele.id} aria-label="Article">
                <img
                  src={ele.image || ""}
                  className="object-cover w-full h-64 rounded"
                  alt={ele.name || ""}
                />
              </Link>
              <div className="py-5 px-4">
                <div className="flex justify-between w-full mb-2">
                  <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">
                    {ele.category || ""}
                  </p>

                  <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">
                    {ele.venue || "Online"}
                  </p>
                </div>
                <Link
                  href={"/course/" + ele.id}
                  aria-label="Article"
                  className="inline-block mb-3  transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                  <p className="text-2xl font-bold leading-5">
                    {ele.name || "Not Found"}
                  </p>
                </Link>
                <p className="mb-4 text-muted-foreground text-ellipsis line-clamp-3">
                  {ele.description || "Not found"}
                </p>

                {isCurrentTimeBetween(ele?.courseStarts, ele?.courseExpires) ? (
                  <div className="flex justify-between items-center w-full">
                    <Link
                      href={"/course/" + ele.id}
                      className="hover:underline underline-offset-8 text-primary"
                    >
                      View &rarr;
                    </Link>
                  </div>
                ) : (
                  <p>
                    You can access this course from{" "}
                    {new Date(ele?.courseStarts).toLocaleString("en-IN", {
                      timeZone: "IST",
                    })}{" "}
                    to{" "}
                    {new Date(ele?.courseExpires).toLocaleString("en-IN", {
                      timeZone: "IST",
                    })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyCourses;
