import React from "react";
import { db } from "@/firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Blog from "@/components/Blog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import globalData from "@/app/data";
import { currentUser } from "@clerk/nextjs";

async function Article({ params }) {
  const user = await currentUser();
  let courses;
  try {
    const ref = collection(db, "course-registrations");
    const docSnap = await getDocs(ref);
    courses = docSnap.docs.map((doc) => ({
      ...doc.data(),
    }));

    const myCourses = courses.filter(
      (course) => course.registeredEmail === user.emailAddresses[0].emailAddress
    );
    console.log(myCourses);

    const isThisMyCourse = myCourses.filter(
      (course) => course.id === params.id
    );

    if (
      isThisMyCourse.length === 0 &&
      !globalData.adminEmails.includes(user.emailAddresses[0].emailAddress)
    ) {
      // push back to a common forbidden page - do it later.
      return (
        <div className="min-h-screen flex flex-col items-center">
          <h1 className="mt-32 text-center font-bold text-4xl">
            403! - Not authorized
          </h1>
          <p className="text-center max-w-[800px] tetx-muted-foreground mt-2">
            You have not taken this course! Reach us out if you think this is a
            mistake!
          </p>
        </div>
      );
    }
  } catch (err) {
    console.error(err);
  }
  let blogData;
  try {
    // get article data from firestore
    const ref = doc(db, "course-content", params.articleId);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      blogData = {
        ...docSnap.data(),
        id: docSnap.id,
      };
      console.log(blogData);
    } else {
      console.log("Document not found");
    }
  } catch (err) {
    console.error(err);
  }

  console.log(blogData);

  return (
    <div>
      <div className="max-w-[900px] mt-10 px-4 py-4 mx-auto pt-16">
        <div className="flex justify-between gap-2 flex-wrap items-center">
          <p className="text-xs text-muted-foreground">
            Note: The image is randomly generated based on the title.
          </p>

          <Button variant="secondary">
            <Link
              href={`https://github.com/hi-Kartik2004/CraftFolio/issues/new?assignees=&labels=&projects=&template=report-blog.md&title=Blog id: ${params.articleId} - From Upasana-Foundation`}
              target="_blank"
            >
              Report
            </Link>
          </Button>
        </div>

        {blogData && (
          <div className="mt-4">
            <div className="object-cover w-full lg:h-[130px] h-[100px] overflow-hidden">
              <img
                src={`https://source.unsplash.com/random/900x700/?Peaceful-background-smooth/1920X1080`}
                className="w-full h-full object-cover rounded-lg bg-muted"
                alt="inside blog image"
              />
            </div>

            <div className="mt-6">
              <h1 className="text-4xl font-bold">{blogData.title}</h1>
              <p className="text-muted-foreground mt-4">
                {blogData.description} - written by {blogData.user}
              </p>
            </div>

            {
              <div className="flex justify-center mt-4">
                <audio
                  controls
                  src={blogData?.recordingUrl?.recordingUrl || ""}
                ></audio>
              </div>
            }

            <div className="mt-6">
              <Blog code={blogData.blog} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Article;
