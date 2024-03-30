"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { db } from "@/firebase/config";
import { useUser } from "@clerk/clerk-react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector from "./MultipleSelector";

function SpecialTypeRegistrationFormArea({ extraField }) {
  const { isLoaded, user } = useUser();
  if (!isLoaded) {
    return null;
  }
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [expiry, setExpiry] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const { toast } = useToast();

  const checkIfAlreadyRegistered = async () => {
    try {
      const ref = collection(db, "pooja-registrations");
      const res = await getDocs(
        query(
          ref,
          where("registeredEmail", "==", user?.emailAddresses[0]?.emailAddress),
          where("poojaType", "==", extraField)
        )
      );

      if (res.docs.length > 0) {
        setRegistered(true);
        setExpiry(res.docs[0].data().courseExpires);
        toast({
          title: "Already Registered",
          description:
            "You have already registered for this event our executive will get back to you!",
        });
      }
    } catch (error) {
      console.error("Error checking registration:", error);
      // Handle the error (e.g., show a message to the user)
      toast({
        title: `Error: ${error}`,
        description:
          "An error occurred while checking your registration status.",
        status: "error",
      });
    }
  };

  const addRegistrationToFirestore = async (e) => {
    e.preventDefault();
    setRegistering(true);
    const ref = collection(db, "pooja-registrations");
    const formData = new FormData(e.target);

    const courses = selectedCourses.map((course) => course.value);
    const res = await addDoc(ref, {
      registeredName: user?.fullName,
      registeredEmail: user?.emailAddresses[0].emailAddress,
      registeredPhone: user?.phoneNumbers[0]?.phoneNumber,
      registeredAddress: formData.get("address"),
      registeredOccupation: formData.get("occupation"),
      registeredMessage: formData.get("message"),
      poojaType: extraField,
      hobbies: formData.get("hobbies"),
      whatsapp: formData.get("whatsapp"),
      coursesTaken: courses,
      courseExpires: new Date().getTime() + 31556952000,
      timestamp: new Date().getTime(),
      date: new Date().toLocaleDateString(),
    });

    console.log(res);
    setRegistering(false);
    setRegistered(true);
    toast({
      title: "Registration Successful",
      description: "You have successfully registered for this course!",
    });
  };

  useEffect(() => {
    checkIfAlreadyRegistered();
  }, []);

  const options = [
    { value: "Shakti Kriya Level 1", label: "Shakti Kriya Level 1" },
    { value: "Shakti Kriya Level 2", label: "Shakti Kriya Level 2" },
    { value: "Kriyatmaka Yog", label: "Kriyatmaka Yog" },
    { value: "Self-Hypnosis", label: "Self-Hypnosis" },
    { value: "Sankalpa Shakti", label: "Sankalpa Shakti" },
    { value: "Mudra Shibir", label: "Mudra Shibir" },
    { value: "Pranayama Shibir", label: "Pranayama Shibir" },
    { value: "Yogika ahara", label: "Yogika ahara" },
    { value: "Thathastu", label: "Thathastu" },
  ];

  return (
    <div className="flex w-full">
      <Toaster />
      <form
        onSubmit={(e) => {
          addRegistrationToFirestore(e);
        }}
        className="flex flex-col gap-2 w-full items-center border p-4 rounded-lg bg-card hover:shadow-xl hover:shadow-primary/50"
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
                  disabled={user?.fullName ? true : false}
                  value={user?.fullName ? user.fullName : null}
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">
                  Phone Number*
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
                  autofocus
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

              {extraField === "Sri Upasaka" && (
                <div>
                  <label className="text-sm text-muted-foreground">
                    Hobbies*
                  </label>
                  <Input
                    type="text"
                    name="hobbies"
                    required={true}
                    placeholder="What are your hobbies?"
                  />
                </div>
              )}

              <div>
                <label className="text-sm text-muted-foreground">
                  WhatsApp Number* (Without +91)
                </label>
                <Input
                  type="text"
                  name="whatsapp"
                  required={true}
                  placeholder=""
                  min={1000000000}
                  max={9999999999}
                />
              </div>

              {extraField === "Sri Upasaka" && (
                <div>
                  <label className="text-sm text-muted-foreground">
                    How do you want to Volunteer? Any Prior Experience?
                  </label>
                  <Textarea
                    type="text"
                    name="message"
                    placeholder="Enter your message here..."
                    required={false}
                  />
                </div>
              )}

              {extraField === "Sri Upasaka" && (
                <MultipleSelector
                  defaultOptions={options}
                  placeholder="Select courses you've attended..."
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                  onChange={(selected) => {
                    setSelectedCourses(selected);
                  }}
                />
              )}

              <div>
                <label className="text-sm text-muted-foreground">
                  Form Type*
                </label>
                <Input
                  type="text"
                  name="poojaType"
                  required={true}
                  placeholder=""
                  disabled={true}
                  value={extraField}
                />
              </div>
            </div>
          )
        ) : (
          <div className=" my-24 flex flex-col items-center max-w-[800px] justify-center">
            <BiCheckCircle className="text-6xl text-primary" />
            <h3 className="text-xl font-semibold text-primary">
              You have Already Registered for this Event!
            </h3>
            <p className="text-muted-foreground text-center">
              You can only register for a course once, untill our Executives
              respond back to your request. Kindly be patient our executive will
              get back to you! or you could contact us from the{" "}
              <Link
                href="contact-us"
                className="underline underline-offset-8 text-primary"
              >
                Contact us page &rarr;
              </Link>
            </p>
          </div>
        )}
        {!registered && (
          <Button disabled={registering} className="mt-2 w-full">
            {registering ? "Registering..." : "Register Now"}
          </Button>
        )}
      </form>
    </div>
  );
}

export default SpecialTypeRegistrationFormArea;
