import MusicRequestForm from "@/components/MusicRequestForm";
import { db } from "@/firebase/config";
import { currentUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  snapshotEqual,
  where,
} from "firebase/firestore";
import { Trophy } from "lucide-react";
import React from "react";

async function Request({ params }) {
  const user = await currentUser();
  async function getCourseDetails() {
    const ref = doc(db, "courses/" + params.id);
    try {
      const snapshot = await getDoc(ref);
      let data = snapshot.data();
      return data;
    } catch (err) {
      console.error(err);
    }

    return "";
  }
  const data = await getCourseDetails();
  if (!data) {
    return (
      <p className="p-4 border rounded-lg m-auto mt-24 mb-10 max-w-[400px] flex">
        Either the course is deleted or their is no course as such!
      </p>
    );
  }

  async function addMusicRequestToFirestore(data) {
    "use server";
    const ref = collection(db, "course-music-requests");
    try {
      const snapshot = await addDoc(ref, data);
      return true;
    } catch (err) {
      console.error(err);
    }
    return false;
  }

  async function isUserRequested(email) {
    "use server";
    const ref = query(
      collection(db, "course-music-requests"),
      where("email", "==", email),
      where("courseId", "==", params.id)
    );
    let snapshots;
    let snapshot;
    try {
      snapshots = await getDocs(ref);

      if (snapshots.empty) {
        return { data: "", isRequested: false };
      }
      snapshot = snapshots.docs[0];
      // console.log(snapshot);
    } catch (err) {
      console.error(err);
      return { data: err, isRequested: false };
    }

    return { data: snapshot.data(), isRequested: true }; // this line snaphot.data() gives me error
  }

  async function isUserRegisteredForCourse() {
    const ref = query(
      collection(db, "course-registrations"),
      where("registeredEmail", "==", user.emailAddresses[0].emailAddress),
      where("id", "==", params.id)
    );

    try {
      const snapshot = await getDocs(ref);

      if (snapshot.size > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  }

  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  let resp = await isUserRequested(userEmail);
  let isRegistered = await isUserRegisteredForCourse();
  let status = resp.data?.status;
  let isRequested = resp?.isRequested;

  return (
    <div className="mt-24">
      <div className="flex justify-center flex-wrap mt-4 mb-10">
        <MusicRequestForm
          addMusicRequestToFirestore={addMusicRequestToFirestore}
          nameOfCourse={data?.name}
          courseId={params?.id}
          status={status || "N/A"}
          isUserRequested={isUserRequested}
          isRequested={isRequested}
          isRegistered={isRegistered}
        />
      </div>
    </div>
  );
}

export default Request;
