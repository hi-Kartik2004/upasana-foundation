import React from "react";
import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import globalData from "@/app/data";
import { MdDelete } from "react-icons/md";

async function MyCourses() {
  const user = await currentUser();
  let data;
  try {
    const eventCollection = collection(db, "course-registrations");
    const q = query(
      eventCollection,
      where("registeredEmail", "==", user.emailAddresses[0].emailAddress)
    );
    const querySnapshot = await getDocs(q);
    data = querySnapshot.docs.map((doc) => {
      return { ...doc.data() };
    });
  } catch (err) {
    console.error(err);
  }
  return (
    <div className="mt-24 py-4 container">
      <h1 className="text-4xl font-bold text-center">My Courses</h1>
      <p className="text-center mt-2 text-muted-foreground">
        This is something that cannot be done, this is a temporary space.
      </p>
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

                <div className="flex justify-between items-center w-full">
                  <Link
                    href={"/course/" + ele.id}
                    className="hover:underline underline-offset-8 text-primary"
                  >
                    Refer &rarr;
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyCourses;
