import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import CourseForm from "@/components/CourseForm";
import CourseContentForm from "@/components/CourseContentForm";
import Editor from "@/components/Editor";
import MusicForm from "@/components/MusicForm";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

async function ManageCourses({ params }) {
  let courseData;
  try {
    const courseRef = doc(db, "courses", params.id);
    const resp = await getDoc(courseRef);
    courseData = { ...resp.data(), id: resp.id };
    console.log(courseData);
  } catch (err) {
    console.error(err);
  }

  return (
    <section>
      <div className="mt-24 relative container flex justify-center flex-col items-center">
        <h1 className="text-center font-bold text-3xl">
          Manage {courseData?.name}
        </h1>
        <p className=" mt-2 text-center text-muted-foreground">
          Manage all our courses courses here
        </p>
        <Link className="mt-2" href="#editor">
          Editor &rarr;
        </Link>
      </div>
      <div className="mt-10 pb-10 flex flex-wrap gap-6 justify-around container">
        <div className="max-w-[600px] p-4 rounded-lg border w-full bg-muted">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-center">
              Edit Course Details
            </h1>
            <p className="mt-1 text-muted-foreground text-center">
              lorem ipsum dor sit ipem
            </p>
          </div>

          <CourseForm edit={true} courseData={courseData} />
        </div>

        <div className="sticky top-24 max-h-[450px]">
          <div className="max-w-[600px] flex-grow p-4 rounded-lg border w-full bg-muted">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-center">
                Add Exclusive Course content
              </h1>
              <p className="mt-1 text-muted-foreground text-center">
                lorem ipsum dor sit ipem
              </p>
            </div>
            <MusicForm courseData={courseData} />
          </div>
        </div>
      </div>
      <div id="editor">
        <Separator />
      </div>
      <div className="mt-4">
        <Editor courseData={courseData} />
      </div>
    </section>
  );
}

export default ManageCourses;
