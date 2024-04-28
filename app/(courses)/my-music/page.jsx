import React from "react";
import globalData from "@/app/data";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import { currentUser } from "@clerk/nextjs";

async function myMusic() {
  const user = await currentUser();

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

    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return data;
  }

  const data = await getMyMusic();
  return (
    <div className="mt-24 py-4 container">
      <h1 className="text-4xl font-bold text-center">
        {globalData?.myMusicTitle}
      </h1>
      <p className="text-center mt-2 text-muted-foreground">
        {globalData?.myMusicDescription}
      </p>
      <div className="flex justify-center mt-4">
        <Link href="/my-music" className="underline underline-offset-8">
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
                    <p className="text-2xl font-bold leading-5">
                      {ele.name || "Not Found"}
                    </p>
                  </Link>
                  <p className="mb-4 text-muted-foreground text-ellipsis line-clamp-3">
                    {ele.description || "Not found"}
                  </p>

                  {ele?.registeredBatch &&
                  isCurrentTimeBetween(
                    ele?.courseStarts,
                    ele?.courseExpires
                  ) ? (
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
                      {new Date(ele?.courseStarts).toLocaleString()}
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

export default myMusic;
