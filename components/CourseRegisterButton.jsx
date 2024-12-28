"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { db } from "@/firebase/config";
import { useUser } from "@clerk/clerk-react";
import {
  Timestamp,
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import {
  BiCheck,
  BiCheckCircle,
  BiCheckShield,
  BiCheckSquare,
} from "react-icons/bi";
import Link from "next/link";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import globalData from "@/app/data";
import { Label } from "./ui/label";

function calculateExpiryDate(batchDate, expiry) {
  try {
    const date = new Date(batchDate);

    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date value: ${batchDate}`);
    }

    if (typeof expiry !== "number" || expiry < 0) {
      throw new Error(`Invalid expiry value: ${expiry}`);
    }

    date.setDate(date.getDate() + expiry);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const expiryDate = `${day}-${month}-${year}`;

    return expiryDate;
  } catch (error) {
    console.error("Error calculating expiry date:", error.message);
    return null;
  }
}

function reverseDate(dateString) {
  const [year, month, day] = dateString.split("-");
  const reversedDateComponents = [day, month, year];
  const reversedDateString = reversedDateComponents.join("-");
  return reversedDateString;
}

function BatchDropdown({ expiry, batches, onSelectBatch, required = false }) {
  return (
    <Label>
      <span className="text-sm text-muted-foreground">Select your Batch*</span>
      <Select name="batch" required={required}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a batch" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {batches &&
              batches.map((batch, index) => (
                <SelectItem
                  required
                  key={index}
                  value={`Batch ${index + 1} - From: ${reverseDate(
                    batch.date
                  )}, To: ${calculateExpiryDate(batch?.date, expiry)}, Time: ${
                    batch.time
                  } IST`}
                >
                  {`Batch ${index + 1} - From: ${reverseDate(
                    batch.date
                  )}, To: ${calculateExpiryDate(batch?.date, expiry)}, Time: ${
                    batch.time
                  } IST`}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Label>
  );
}

function getDayOfWeek(dateString) {
  const days = [
    "Sundays",
    "Mondays",
    "Tuesdays",
    "Wednesdays",
    "Thursdays",
    "Fridays",
    "Saturdays",
  ];
  const date = new Date(dateString);
  return days[date.getDay()];
}

function CourseRegisterButton({ data }) {
  const { isLoaded, user } = useUser();
  if (!isLoaded) {
    return null;
  }
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [expiry, setExpiry] = useState(null);
  const [batch, setBatch] = useState(null);
  const [disabled, setDisabled] = useState(false);

  let prereqs = [];
  if (data?.prerequisites) {
    prereqs = data?.prerequisites.split(",");
  }

  const trimmedPrereqs = prereqs.map((prereq) => prereq.trim());

  const { toast } = useToast();

  const getPrereqsNames = async (prereqs) => {
    try {
      const ref = collection(db, "courses");

      // Use document ID in the query condition
      const res = await getDocs(query(ref, where("__name__", "in", prereqs)));

      let data = [];
      res.docs.forEach((doc) => {
        data.push(doc.data().name);
      });

      console.log("Prereqs names:", data);
      return data;
    } catch (error) {
      console.error("Error getting prerequisites names:", error);
      return [];
    }
  };
  const checkPrerequisites = async () => {
    if (trimmedPrereqs.length === 1 && trimmedPrereqs[0] === "") {
      setDisabled(false);
      return;
    }
    try {
      const ref = collection(db, "course-registrations");
      const res = await getDocs(
        query(
          ref,
          where("registeredEmail", "==", user?.emailAddresses[0]?.emailAddress)
        )
      );

      let regs = res.docs.map((doc) => doc.data().id);

      const missingPrereqs = trimmedPrereqs.filter(
        (prereq) => !regs.includes(prereq)
      );

      const missingPrereqsNames = await getPrereqsNames(missingPrereqs);

      if (missingPrereqs.length > 0) {
        setDisabled(true);
        const links = missingPrereqs.map((prereqId, index) => (
          <Link key={prereqId} href={`/register/${prereqId}`}>
            {missingPrereqsNames[index]}
          </Link>
        ));
        toast({
          title: "Missing Prerequisites",
          description: (
            <>
              You are missing the following prerequisites:
              <ul>
                {links.map((link, index) => (
                  <li key={index}>{link}</li>
                ))}
              </ul>
            </>
          ),
          variant: "destructive",
        });
      } else {
        setDisabled(false);
      }
    } catch (error) {
      console.error("Error checking prerequisites:", error);
      toast({
        title: `Error: ${error}`,
        description: "An error occurred while checking your prerequisites.",
        variant: "destructive",
      });
    }
  };

  const checkIfAlreadyRegistered = async () => {
    try {
      const ref = collection(db, "course-registrations");
      const res = await getDocs(
        query(
          ref,
          where("registeredEmail", "==", user?.emailAddresses[0]?.emailAddress),
          where("id", "==", data.id),
          where("courseExpires", ">", Date.now())
        )
      );

      if (res.docs.length > 0) {
        setRegistered(true);
        setExpiry(res.docs[0].data().courseExpires);
        toast({
          title: "Registrations Success!",
          description: "You have registered for this course!",
        });
      }
    } catch (error) {
      console.error("Error checking registration:", error);
      toast({
        title: `Error: ${error}`,
        description:
          "An error occurred while checking your registration status.",
        status: "error",
      });
    }
  };

  function extractDateAndConvertToTimestamp(inputString) {
    try {
      const dateTimePattern = /From: (\d{4}-\d{2}-\d{2}), To: \d{4}-\d{2}-\d{2}, Time: (\d{2}:\d{2}) IST/;

      const match = inputString.match(dateTimePattern);

      if (!match) {
        throw new Error("Invalid date format");
      }

      const datePart = match[1];
      const timePart = match[2];

      const dateTimeString = `${datePart}T${timePart}:00`;

      const timestamp = new Date(dateTimeString).getTime();

      return timestamp;
    } catch (error) {
      console.error(
        "Error extracting date and converting to timestamp:",
        error.message
      );
      return null;
    }
  }

  async function availFreeMusic(courseId, registeredEmail, freeMusicDuration) {
    const ref = collection(db, "course-music-registrations");
    console.log(freeMusicDuration);
    const expiryDate = Date.now() + freeMusicDuration * 24 * 60 * 60 * 1000;
    const expiryTimestamp = Timestamp.fromDate(new Date(expiryDate));
    try {
      const docRef = await addDoc(ref, {
        courseId: courseId,
        registeredEmail: registeredEmail,
        expiry: expiryTimestamp,
      });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  const addRegistrationToFirestore = async (e) => {
    e.preventDefault();
    setRegistering(true);
    const ref = collection(db, "course-registrations");
    const formData = new FormData(e.target);
    let startDate = "";
    try {
      startDate =
        extractDateAndConvertToTimestamp(formData.get("batch")) ||
        new Date().getTime();
    } catch (err) {
      setRegistering(false);
      console.error(err);
      return;
    }

    const res = await addDoc(ref, {
      ...data,
      registeredName: user?.fullName,
      registeredEmail: user?.emailAddresses[0].emailAddress,
      registeredPhone: user?.phoneNumbers[0]?.phoneNumber,
      registeredAddress: formData.get("address"),
      registeredOccupation: formData.get("occupation"),
      registeredWhatsapp: formData.get("whatsappNumber"),
      registeredBatch: formData.get("batch"),
      registeredLanguage: formData.get("registeredLanguage"),
      courseExpires: startDate + data.expiry * 24 * 60 * 60 * 1000,
      courseStarts: startDate,
      timestamp: new Date().getTime(),
    });

    console.log(res);
    setRegistering(false);
    checkIfAlreadyRegistered();
    toast({
      title: "Registration Successful",
      description: "You have successfully registered for this course!",
    });
  };

  useEffect(() => {
    checkIfAlreadyRegistered();
    checkPrerequisites();
  }, []);

  let languages = [];
  function getLanguages() {
    const languageSet = new Set();
    data?.batches.forEach((batch) => {
      languageSet.add(batch.language);
    });
    languages = Array.from(languageSet);
  }

  getLanguages();

  return (
    <div className="flex w-full">
      <Toaster />
      <form
        onSubmit={(e) => {
          addRegistrationToFirestore(e);
        }}
        className="flex flex-col gap-2 w-full"
      >
        {!registered ? (
          !user.emailAddresses[0].emailAddress ? (
            <>
              <label className="text-sm text-muted-foreground">Email*</label>
              <Input
                type="email"
                placeholder="Enter your email"
                required={true}
                disabled={user?.emailAddresses[0].emailAddress ? true : false}
                value={user.emailAddresses[0].emailAddress ?? null}
              />
            </>
          ) : (
            <div className="flex flex-col gap-6 w-full">
              <div>
                <label className="text-sm text-muted-foreground">Name*</label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  required={true}
                  value={user?.fullName ? user.fullName : null}
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">
                  Phone Number* (Without +91)
                </label>
                <Input
                  type="text"
                  placeholder="Enter your phone number"
                  required={true}
                  disabled={user?.phoneNumbers[0]?.phoneNumber ? true : false}
                  value={user?.phoneNumbers[0]?.phoneNumber ?? null}
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Email*</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  required={true}
                  disabled={
                    user?.emailAddresses[0]?.emailAddress ? true : false
                  }
                  value={user?.emailAddresses[0]?.emailAddress ?? null}
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">
                  Address*
                </label>
                <Textarea
                  type="Address"
                  name="address"
                  placeholder="Enter your address"
                  required={true}
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">
                  Occupation*
                </label>
                <Input
                  type="text"
                  name="occupation"
                  required={true}
                  placeholder="What do you do?"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">
                  WhatsApp Number* (Without +91)
                </label>
                <Input
                  type="number"
                  name="whatsappNumber"
                  required={true}
                  placeholder="Enter your WhatsApp number"
                  min={1000000000}
                  max={9999999999}
                />
              </div>

              <Label>
                <span className="text-sm text-muted-foreground">
                  Select course Language*
                </span>

                <Select name="registeredLanguage" required={true}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {languages.length &&
                        languages.map((language) => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>

              <BatchDropdown
                expiry={data?.expiry}
                batches={data?.batches}
                onSelectBatch={(val) => {
                  setBatch(val);
                }}
                required={true}
              />

              {/* <Label>
                <span className="text-sm text-muted-foreground">Venue*</span>

                <Select disabled name="venue" value={data?.venue}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={data?.venue}>{data?.venue}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label> */}
            </div>
          )
        ) : (
          <div className=" my-24 flex flex-col items-center">
            <BiCheckCircle className="text-6xl text-primary" />
            <h3 className="text-xl text-center font-semibold text-primary">
              You have Registered for this course!
            </h3>
            <p className="text-muted-foreground text-center">
              You can only register for a course once, untill it expires. Your
              course Expires on {new Date(expiry).toString()}
            </p>

            <Button
              className="mt-4"
              size={"sm"}
              onClick={() => {
                setRegistered(false);
              }}
            >
              Register Again &rarr;
            </Button>
          </div>
        )}
        {!registered && !disabled && (
          <Button disabled={registering} className="mt-2">
            {registering ? "Registering..." : "Register Now"}
          </Button>
        )}
      </form>
    </div>
  );
}

export default CourseRegisterButton;
