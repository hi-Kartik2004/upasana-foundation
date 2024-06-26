import React from "react";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import CourseForm from "@/components/CourseForm";
import CourseContentForm from "@/components/CourseContentForm";
import Editor from "@/components/Editor";
import MusicForm from "@/components/MusicForm";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import CodeSnippet from "@/components/CodeSnippet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddImage from "@/components/AddImage";
import AddVideo from "@/components/AddVideo";
import AddTestimonialsForm from "@/components/AddTestimonialsForm";
import AddMusicRegistration from "@/components/AddMusicRegistration";

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

  async function addTestimonialToFirebase(data) {
    "use server";
    if (!data.username) {
      return false;
    }
    const ref = collection(db, "course-testimonials");
    const newData = {
      ...data,
      courseId: courseData.id,
      courseName: courseData?.name,
    };
    try {
      const snapshot = await addDoc(ref, newData);
      return true;
    } catch (err) {
      console.error(err);
    }
    return false;
  }

  async function addMusicRegistrationToFirebase(
    email,
    freeMusicDuration = 120
  ) {
    "use server";
    const ref = collection(db, "course-music-registrations");
    const expiryDate = Date.now() + freeMusicDuration * 24 * 60 * 60 * 1000;
    const expiryTimestamp = Timestamp.fromDate(new Date(expiryDate));
    const newData = {
      registeredEmail: email,
      courseId: courseData?.id,
      courseName: courseData?.name,
      expiry: expiryTimestamp,
      timestamp: serverTimestamp(),
      durationInDays: freeMusicDuration,
      fees: 0,
    };

    try {
      const snapshot = await addDoc(ref, newData);
      // console.log(snapshot);

      return true;
    } catch (err) {
      console.error(err);
    }

    return false;
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
              Fill the form to modify the course details
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
                Fill the below form the add Blogs
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
        <Separator className="my-10" />
        <div className="flex justify-around items-center flex-wrap container gap-4">
          <div className="max-w-[600px] flex-grow p-4 rounded-lg border w-full bg-muted">
            <div className="">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-center">
                  Add Testimonials
                </h1>
                <p className="mt-1 text-muted-foreground text-center">
                  Add Testimonials for this course, which will be seen on the
                  course page!
                </p>
              </div>

              <div className="flex flex-wrap justify-between mx-auto">
                <div className="max-w-[600px] w-full">
                  <AddTestimonialsForm
                    addTestimonialToFirebase={addTestimonialToFirebase}
                    courseData={courseData}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border w-full bg-muted max-w-[600px]">
            <h3 className="text-2xl font-bold text-center">
              Give free music access to users!
            </h3>

            <div className="mt-4">
              <AddMusicRegistration
                addMusicRegistrationToFirebase={addMusicRegistrationToFirebase}
                courseData={courseData}
              />
            </div>
          </div>
        </div>

        <Separator className="my-10" />
        <div className="flex flex-wrap gap-6 mx-6 justify-around mb-10">
          <div className="flex flex-col gap-4 items-center mt-4">
            <AddImage />
            <AddVideo />
          </div>

          <div className="flex flex-wrap flex-col overflow-auto">
            <h3 className="mb-4 text-lg font-medium">Add Video*</h3>
            <CodeSnippet
              text={`<video src="" width="100%" controls>
</video>`}
              language="javascript"
            />
          </div>

          <div className="flex flex-wrap flex-col overflow-auto">
            <h3 className="mb-4 text-lg font-medium">Add Youtube Video*</h3>
            <CodeSnippet
              text={`<iframe width="100%" height="400px" src="" title="YouTube video" 
frameborder="0" allow="accelerometer; 
autoplay; clipboard-write; encrypted-media; 
gyroscope; picture-in-picture; web-share" 
allowfullscreen></iframe>`}
              language="javascript"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManageCourses;
