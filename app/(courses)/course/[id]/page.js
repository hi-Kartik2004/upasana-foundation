import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  doc,
  addDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs";
import { Cousine } from "next/font/google";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RatingDialog from "@/components/RatingDialog";

async function Course({ params }) {
  const user = await currentUser();
  const email = user.emailAddresses[0].emailAddress;
  console.log(email);
  function isCurrentTimeBetween(courseStartsTimestamp, courseExpiresTimestamp) {
    // Get the current timestamp
    const currentTime = Date.now();

    // Check if the current time is between courseStarts and courseExpires
    return (
      currentTime >= courseStartsTimestamp &&
      currentTime <= courseExpiresTimestamp
    );
  }

  let courseInfo;

  try {
    const querySnapshot = await getDocs(collection(db, "course-registrations"));

    if (querySnapshot.empty) {
      console.log("No documents found in the collection.");
    } else {
      querySnapshot.forEach((doc) => {
        // Assuming each document has an "email" field to compare with `registeredEmail`
        if (
          doc.data().registeredEmail === email &&
          doc.data().id === params.id
        ) {
          courseInfo = doc.data();
          // return; // Exit the loop if a matching document is found
        }
      });
    }

    if (!courseInfo) {
      console.log("No matching document found for the provided email and ID.");
      return (
        <p className="mt-28 px-4 py-2 rounded-lg border max-w-[500px] w-full mb-10 mx-auto">
          <b>Unauthorized Access</b> - Unable to validate if you have registered
          for this course, if you think this is a mistake please contact us!
        </p>
      );
    }
  } catch (err) {
    console.error("Error fetching course information:", err);
  }

  console.log(courseInfo);

  let allCourseData;
  try {
    // get course data from firestore
    const ref = collection(db, "course-content");
    const doc = await getDocs(query(ref, orderBy("timestamp", "desc")));
    allCourseData = doc.docs.map((doc) => ({
      ...doc.data(),
      aricleId: doc.id,
    }));
  } catch (err) {
    console.error(err);
  }

  let thisCourseData = allCourseData?.filter(
    (course) => course.courseId === params.id
  );

  let title;
  try {
    // where
    const ref = doc(db, "courses", params.id);
    const docSnapshot = await getDoc(ref);
    title = docSnapshot.data().name;
    console.log(title, params.id);
  } catch (err) {
    console.error(err);
  }

  if (
    !isCurrentTimeBetween(courseInfo?.courseStarts, courseInfo?.courseExpires)
  ) {
    return (
      <div className="flex justify-center">
        <p className="mt-28 text-center mb-10 p-2 rounded-lg border max-w-[500px] w-full">
          You can access this course from{" "}
          {new Date(courseInfo.courseStarts).toLocaleString()} to
          {" " + new Date(courseInfo.courseExpires).toLocaleString()}
        </p>
      </div>
    );
  }

  async function addRatingToFirestore(rating, feedback) {
    "use server";
    const ref = collection(db, "course-ratings");
    const data = {
      courseId: courseInfo.id,
      courseName: courseInfo?.name,
      ...courseInfo,
      rating: rating,
      feedback: feedback,
    };
    try {
      const snapshot = await addDoc(ref, data);
      isUserRated();
      return true;
    } catch (err) {
      console.error(err);
    }

    return false;
  }

  let showRatingButton = true;

  try {
    const q = query(
      collection(db, "course-ratings"),
      where("registeredEmail", "==", user.emailAddresses[0].emailAddress),
      where("id", "==", params.id)
    );

    const snapshot = await getDocs(q);
    console.log(snapshot.size);

    if (snapshot.size > 0) {
      showRatingButton = false;
    }
  } catch (err) {
    console.error("Error querying documents:", err);
  }

  console.log(title);
  return (
    <div className="mt-28">
      <>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-center">
            Course {title ?? "Title"}
          </h1>
          <p className="text-center mt-2 text-muted-foreground max-w-[800px] line-clamp-2 mx-4">
            {courseInfo?.description || "No description provided"}
          </p>

          <div className="flex gap-4 items-center flex-wrap mt-4">
            <div>
              {showRatingButton && (
                <RatingDialog
                  email={user.emailAddresses[0].emailAddress}
                  courseId={params.id}
                  name={title}
                  addRatingToFirestore={addRatingToFirestore}
                />
              )}
            </div>

            <Link
              href={`/course/${params.id}/exclusive-music`}
              className="hover:underline underline-offset-8 text-center text-md"
            >
              Get Exclusive Music &rarr;
            </Link>
          </div>

          {/* <Separator className="mt-8 max-w-[500px] border border-orange-300/75 shadow-lg shadow-orange-500" /> */}
        </div>

        {thisCourseData.length === 0 ? (
          <div className="text-center text-2xl mb-10 font-semibold mt-10">
            No records found for this course.
          </div>
        ) : (
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="grid gap-10 row-gap-8 lg:grid-cols-5 relative">
              <div className="lg:col-span-2 xl:sticky xl:top-24 h-max">
                <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {new Date(thisCourseData[0]?.timestamp).toLocaleDateString(
                    "en-IN"
                  )}
                </p>
                <div className="mb-3">
                  <Link
                    href={`/course/${params.id}/article/${thisCourseData[0].aricleId}`}
                    aria-label="Article"
                    className="inline-block text-primary transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    <p className=" text-2xl font-extrabold leading-none tracking-tight lg:text-4xl xl:text-5xl">
                      {thisCourseData[0]?.title}
                    </p>
                  </Link>
                </div>
                <Link
                  href={`/course/${params.id}/article/${thisCourseData[0].aricleId}`}
                >
                  <p className="mb-4 text-base text-muted-foreground md:text-lg line-clamp-3">
                    {thisCourseData[0]?.description}
                  </p>
                </Link>
                <div className="flex items-center">
                  <Link href="/about-us" aria-label="Author" className="mr-3">
                    <img
                      alt="avatar"
                      src={
                        thisCourseData.authorImage
                          ? thisCourseData[0]?.authorImage
                          : "/guruji.png"
                      }
                      className="object-cover w-10 h-10 rounded-full shadow-sm"
                    />
                  </Link>
                  <div>
                    <Link
                      href="/about-us"
                      aria-label="Author"
                      className="font-semibold text-muted-foreground transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >
                      {thisCourseData[0]?.user}
                    </Link>
                    <div>
                      <Link
                        href={`mailto:${thisCourseData[0]?.email}`}
                        className="text-sm font-medium leading-4 text-muted-foreground"
                      >
                        {thisCourseData[0]?.email}
                      </Link>
                    </div>
                  </div>
                </div>
                <Separator className="mt-4" />
              </div>

              <div className="flex flex-col space-y-8 lg:col-span-3">
                {thisCourseData.slice(1).map((course) => (
                  <div>
                    <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {new Date(course.timestamp).toLocaleDateString("en-IN")}
                    </p>
                    <div className="mb-3">
                      <Link
                        href={`/course/${params.id}/article/${course.aricleId}`}
                        aria-label="Article"
                        className="inline-block text-primary transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        <p className=" text-2xl font-extrabold leading-none tracking-tight lg:text-2xl">
                          {course?.title}
                        </p>
                      </Link>
                    </div>
                    <Link
                      href={`/course/${params.id}/article/${course.aricleId}`}
                    >
                      <p className="mb-4 text-base text-muted-foreground md:text-lg">
                        {course?.description}
                      </p>
                    </Link>
                    <div className="flex items-center">
                      <Link
                        href="/about-us"
                        aria-label="Author"
                        className="mr-3"
                      >
                        <img
                          alt="avatar"
                          src={course.authorImage || "/guruji.png"}
                          className="object-cover w-10 h-10 rounded-full shadow-sm"
                        />
                      </Link>
                      <div>
                        <Link
                          href="/about-us"
                          aria-label="Author"
                          className="font-semibold text-muted-foreground transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          {course.user}
                        </Link>

                        <div>
                          <Link
                            href={`mailto:${course.email}`}
                            className="text-sm font-medium leading-4 text-muted-foreground"
                          >
                            {course.email}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default Course;
