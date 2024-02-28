import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React from "react";
import { db } from "@/firebase/config";
import Link from "next/link";
import globalData from "@/app/data";
import { currentUser } from "@clerk/nextjs";
import { MdDelete } from "react-icons/md";

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
    <div className="mt-10 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-center">Hello world!</h1>
        <p className="text-muted-foreground text-center">
          SadhguruShri is a master communicator, converses in a very simple
          language, presents complex ideas in an easy to understand way.{" "}
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
                    href={"delete-course/" + ele.id}
                    className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded"
                  >
                    <MdDelete />
                  </Link>
                )}
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
                    View &rarr;
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
