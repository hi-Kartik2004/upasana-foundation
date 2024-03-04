import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  doc,
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

async function Course({ params }) {
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
    const ref = doc(db, "courses", params.id);
    const docSnapshot = await getDoc(ref);
    title = docSnapshot.data().name;
    console.log(title, params.id);
  } catch (err) {
    console.error(err);
  }

  console.log(title);
  return (
    <div className="mt-28">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-center">
          Course {title ?? "Title"}
        </h1>
        <p className="text-center mt-2 text-muted-foreground max-w-[800px] line-clamp-2">
          3 I have a sidebar that works great but when I tried to put it in a
          sticky/fixed position, the fixed class makes the content on the right
          of the sidebar overrides the sidebar and I try with sticky class but
          doesn't work
        </p>
        <Link
          href={`/course/${params.id}/exclusive-music`}
          className="mt-4 hover:underline underline-offset-8"
        >
          Get Exclusive Music &rarr;
        </Link>
        <Separator className="mt-8 max-w-[500px] border border-orange-300/75 shadow-lg shadow-orange-500" />
      </div>

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
            <p className="mb-4 text-base text-muted-foreground md:text-lg line-clamp-3">
              {thisCourseData[0]?.description}
            </p>
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
                <p className="text-sm font-medium leading-4 text-muted-foreground">
                  {thisCourseData[0]?.email}
                </p>
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
                <p className="mb-4 text-base text-muted-foreground md:text-lg">
                  {course?.description}
                </p>
                <div className="flex items-center">
                  <Link href="/about-us" aria-label="Author" className="mr-3">
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
                    <p className="text-sm font-medium leading-4 text-muted-foreground">
                      {course.email}
                    </p>
                  </div>
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;
