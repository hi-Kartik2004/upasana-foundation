import MusicRequestForm from "@/components/MusicRequestForm";
import { db } from "@/firebase/config";
import { currentUser } from "@clerk/nextjs";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  snapshotEqual,
  where,
} from "firebase/firestore";
import { Trophy } from "lucide-react";
import React from "react";

async function Request({ params, searchParams }) {
  const user = await currentUser();
  console.log(searchParams);
  const renew = searchParams.renew || false;
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
        return [true, snapshot.docs[0].data()];
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  }

  function isCourseExpired(expiry) {
    console.log(expiry);
    // let expiryDate = new Date(
    //   expiry.seconds * 1000 + (expiry?.nanoseconds ?? 0) / 1000000
    // );
    // let currentDate = new Date();
    // if (expiryDate < currentDate) {
    //   return true;
    // }
    return false;
  }

  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  let resp = await isUserRequested(userEmail);
  // let isRegisteredForMusic = await isUserRegisteredForMusic();
  console.log(resp);
  if (isCourseExpired(resp.data?.expiry)) {
    status = "Renewal";
  }
  let registeredInfo = await isUserRegisteredForCourse();
  let isRegistered = registeredInfo[0];
  let registeredData = registeredInfo[1];
  let status = resp.data?.status;
  let isRequested = (resp && resp?.isRequested) || false;

  async function alreadyClaimed() {
    const ref = query(
      collection(db, "course-music-registrations"),
      where("registeredEmail", "==", user.emailAddresses[0].emailAddress),
      where("courseId", "==", params.id),
      where("expiry", ">", Timestamp.fromDate(new Date()))
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

  async function addRegistrationToFirestore(data) {
    "use server";
    const currentDate = new Date();
    const durationInDays = data?.durationInDays;
    const ref = collection(db, "course-music-registrations");
    try {
      const snapshot = await addDoc(ref, {
        ...data,
        batch: registeredData?.batches[0],
        expiry: Timestamp.fromDate(
          new Date(currentDate.getTime() + durationInDays * 24 * 60 * 60 * 1000)
        ),
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
    return false;
  }

  const isAlreadyClaimed = await alreadyClaimed();

  return (
    <div className="mt-24">
      <div className="flex justify-center flex-wrap mt-4 mb-10">
        <MusicRequestForm
          addMusicRequestToFirestore={addMusicRequestToFirestore}
          nameOfCourse={data?.name}
          courseId={params?.id}
          status={renew ? "Renewal" : status ? status : "N/A"}
          isUserRequested={renew ? false : isUserRequested}
          isRequested={renew ? false : isRequested}
          isRegistered={isRegistered}
          musicCost={data?.musicCost}
          renew={renew}
          batch={registeredData?.batches[0]}
          addRegistrationToFirestore={addRegistrationToFirestore}
          durationInDays={data?.musicFreeDuration}
          isAlreadyClaimed={isAlreadyClaimed}
        />
      </div>
    </div>
  );
}

export default Request;
