import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React from "react";
import { db } from "@/firebase/config";
import Link from "next/link";
import globalData from "@/app/data";
import { currentUser } from "@clerk/nextjs";
import { MdDelete } from "react-icons/md";
import Head from "next/head";

export async function Courses() {
  const user = await currentUser();
  let data;
  try {
    const eventCollection = collection(db, "courses");
    const q = query(eventCollection, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    data = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="mt-10 px-4 py-16 container">
      <Head>
        <title>Our Courses</title>
        <meta
          name="description"
          content="Your Transformation Steps, here are a range of courses for you to transform Internally, Change your life from in to out.
          "
        />
        <meta
          name="keywords"
          content="Indian Mystic, Kundalini Yogi, Spiritual Master, About Sadhguru Shri, Sadhana, Spiritual experience"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="upasana foundation" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="mb-10 flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold text-center">
          {globalData?.coursesTitle}
        </h1>
        <p className="text-muted-foreground text-center mx-6 max-w-[800px]">
          {globalData?.coursesDescription}
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {data.map((ele) => {
          return (
            <div
              key={ele.name}
              className="border relative overflow-hidden transition-shadow duration-300 bg-background rounded"
            >
              {user &&
                globalData.adminEmails.includes(
                  user.emailAddresses[0].emailAddress
                ) && (
                  <Link
                    href={"delete-course/" + ele.id + "?name=" + ele.name}
                    className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded"
                  >
                    <MdDelete />
                  </Link>
                )}
              <Link href={"/register/" + ele.id} aria-label="Article">
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
                  href={"/register/" + ele.id}
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

                <div className="flex justify-between items-center w-full">
                  <Link
                    href={"/register/" + ele.id}
                    className="hover:underline underline-offset-8 text-primary"
                  >
                    Know more &rarr;
                  </Link>

                  {user &&
                    globalData.adminEmails.includes(
                      user.emailAddresses[0].emailAddress
                    ) && (
                      <Link
                        href={"/manage-course/" + ele.id}
                        className="hover:underline underline-offset-8 text-primary"
                      >
                        Edit &rarr;
                      </Link>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;
