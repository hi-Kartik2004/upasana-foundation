import { Separator } from "@/components/ui/separator";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import React from "react";
import { db } from "@/firebase/config";
import { currentUser } from "@clerk/nextjs";

async function ExclusiveMusic({ params }) {
  let isAuthorised;
  const user = await currentUser();
  try {
    const ref = collection(db, "course-music-registration");
    const snapshot = await getDocs(ref);
    const allMusic = snapshot.docs.map((ele) => ele.data());
    const myMusic = allMusic.filter(
      (ele) =>
        ele.registeredEmail === user.emailAddresses[0].emailAddress &&
        ele.courseId === params.id
    );

    if (myMusic.length === 0) {
      isAuthorised = false;
    } else {
      isAuthorised = true;
    }
  } catch (err) {
    console.error(err);
    return (
      <h1 className="font-bold text-2xl mt-24">Unable to verify Authority!</h1>
    );
  }

  if (!isAuthorised) {
    return (
      <div className="my-28 flex flex-col items-center">
        <h1 className="font-bold text-2xl text-center">
          You are not authorised to view this page!
        </h1>
        <p className="text-sm mt-2 text-muted-foreground text-center">
          Contact us, if you think this is a mistake!
        </p>

        <Link
          href={`/course/${params.id}/exclusive-music/request`}
          className="mt-2 underline underline-offset-8"
        >
          Request Access! &rarr;
        </Link>
      </div>
    );
  }

  let music;
  try {
    const ref = collection(db, "course-music");
    const snapshot = await getDocs(ref);
    const allMusic = snapshot.docs.map((ele) => ele.data());
    music = allMusic.filter((ele) => ele.courseId === params.id);
  } catch (err) {
    console.error(err);
  }
  return (
    <section>
      <div className="mt-28 container">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-center">
            Exclusive Music
          </h1>
          <p className="text-center mt-2 text-muted-foreground max-w-[800px] line-clamp-2">
            3 I have a sidebar that works great but when I tried to put it in a
            sticky/fixed position, the fixed class makes the content on the
            right of the sidebar overrides the sidebar and I try with sticky
            class but doesn't work
          </p>
          <Link
            href={`/course/${params.id}`}
            className="mt-4 hover:underline underline-offset-8"
          >
            Get Back to Course &rarr;
          </Link>
          <Separator className="mt-8 max-w-[500px] border border-orange-300/75 shadow-lg shadow-orange-500" />
        </div>

        <div className="flex justify-around gap-6 flex-wrap mt-10 mb-10 flex-initial">
          {music.map((ele) => {
            return (
              <div
                key={ele.heading}
                className="flex flex-col gap-2 max-w-[400px] rounded-lg border p-6 bg-card shadow-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-orange-500/20 w-full"
              >
                <h3 className="text-2xl font-semibold">{ele.heading}</h3>
                <p className="text-muted-foreground">{ele.description}</p>
                <div>
                  <audio
                    className="mt-2 flex w-full justify-center"
                    controls
                    controlsList="nodownload"
                  >
                    <source
                      src={`data:audio/mp3;base64,${btoa(ele.file)}`}
                      type="audio/mp3"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ExclusiveMusic;
