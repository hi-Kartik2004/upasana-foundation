import React from "react";
import globalData from "@/app/data";
import Link from "next/link";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { currentUser } from "@clerk/nextjs";
import moment from "moment";

async function myMusic() {
  const user = await currentUser();

  function isCourseExpired(courseExpiresTimestamp) {
    // Get the current timestamp
    const currentTime = Date.now();

    // Check if the current time is greater than courseExpires
    return currentTime > courseExpiresTimestamp;
  }

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

  async function getCourseDetails(courseId) {
    const ref = doc(db, "courses/" + courseId);
    let courseData = {};
    try {
      const snapshot = await getDoc(ref);
      courseData = snapshot.data();
    } catch (err) {
      console.error(err);
    }
    return courseData;
  }

  async function getMyMusic() {
    const q = query(
      collection(db, "course-music-registrations"),
      where("registeredEmail", "==", user.emailAddresses[0].emailAddress)
    );
    let data = [];
    let snapshot;
    try {
      snapshot = await getDocs(q);
    } catch (err) {
      console.error(err);
      return data;
    }

    const promises = snapshot.docs.map(async (doc) => {
      try {
        const courseData = await getCourseDetails(doc.data().courseId);
        const mergedData = { ...doc.data(), ...courseData };
        // Check if doc.data().expiry exists, then add it to mergedData
        if (doc.data().expiry) {
          mergedData.expiry = doc.data().expiry;
        }
        data.push(mergedData);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    });

    await Promise.all(promises);

    return data;
  }

  let data = await getMyMusic();

  console.log(data);

  return (
    <div className="mt-24 py-4 container">
      <h1 className="text-4xl font-bold text-center">
        {globalData?.myMusicTitle}
      </h1>
      <p className="text-center mt-2 text-muted-foreground">
        {globalData?.myMusicDescription}
      </p>
      <div className="flex justify-center mt-4">
        <Link href="/my-courses" className="underline underline-offset-8">
          &larr; My courses
        </Link>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {data &&
          data.map((ele) => {
            return (
              <div
                key={ele.name}
                className="border relative overflow-hidden transition-shadow duration-300 bg-background rounded"
              >
                <Link
                  href={"/course/" + ele?.courseId + "/exclusive-music"}
                  aria-label="Article"
                >
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
                    href={"/course/" + ele?.courseId + "/exclusive-music"}
                    aria-label="Article"
                    className="inline-block mb-3  transition-colors duration-200 hover:text-deep-purple-accent-700"
                  >
                    <p className="text-2xl font-bold leading-8">
                      {"Music Library of " + ele.name || "Not Found"}
                    </p>
                  </Link>
                  <p className="mb-4 text-muted-foreground text-ellipsis line-clamp-3">
                    {ele.description || "Not found"}
                  </p>

                  {isCurrentTimeBetween(
                    ele?.courseStarts,
                    ele?.expiry.seconds * 1000 +
                      (ele?.expiry?.nanoseconds ?? 0) / 1000000
                  ) ? (
                    <div className="flex justify-between items-center w-full">
                      <Link
                        href={"/course/" + ele.courseId}
                        className="hover:underline underline-offset-8 text-primary"
                      >
                        View &rarr;
                      </Link>
                    </div>
                  ) : (
                    <p className="mt-4">
                      You can access this course till{" : "}
                      {ele?.expiry && (
                        <>
                          {new Date(
                            ele.expiry.seconds * 1000 +
                              Math.floor(ele.expiry.nanoseconds / 1000000)
                          ).toUTCString()}
                        </>
                      )}
                    </p>
                  )}

                  {isCourseExpired(
                    ele?.expiry.seconds * 1000 +
                      (ele?.expiry?.nanoseconds ?? 0) / 1000000
                  ) && (
                    <Link
                      href={
                        "/course/" +
                        ele?.courseId +
                        "/exclusive-music/request?renew=true"
                      }
                      className="mt-2 underline underline-offset-8 text-primary"
                    >
                      Renew
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default myMusic;
