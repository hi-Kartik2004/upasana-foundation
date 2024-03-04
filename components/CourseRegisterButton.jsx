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

function CourseRegisterButton({ data }) {
  const { isLoaded, user } = useUser();
  if (!isLoaded) {
    return null;
  }
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [expiry, setExpiry] = useState(null);
  const { toast } = useToast();

  const checkIfAlreadyRegistered = async () => {
    try {
      const ref = collection(db, "course-registrations");
      const res = await getDocs(
        query(
          ref,
          where("registeredEmail", "==", user?.emailAddresses[0]?.emailAddress),
          where("id", "==", data.id)
        )
      );

      if (res.docs.length > 0) {
        setRegistered(true);
        toast({
          title: "Already Registered",
          description: "You have already registered for this course!",
        });
      }
    } catch (error) {
      console.error("Error checking registration:", error);
      // Handle the error (e.g., show a message to the user)
      toast({
        title: "Error",
        description:
          "An error occurred while checking your registration status.",
        status: "error",
      });
    }
  };

  const addRegistrationToFirestore = async (e) => {
    e.preventDefault();
    setRegistering(true);
    const ref = collection(db, "course-registrations");
    const res = await addDoc(ref, {
      ...data,
      registeredName: user?.fullName,
      registeredEmail:
        user?.emailAddresses[0].emailAddress ?? e.target[0].value,
      registeredPhone: user?.phoneNumbers[0]?.phoneNumber ?? e.target[0].value,
      courseExpires: new Date().getTime() + 31556952000,
      timestamp: new Date().getTime(),
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
              />
            </>
          ) : (
            <>
              <label className="text-sm text-muted-foreground">
                Phone Number* (Without +91)
              </label>
              <Input
                type="number"
                placeholder="Enter your phone number"
                required={true}
                min={1000000000}
                max={9999999999}
              />
            </>
          )
        ) : (
          <div className="flex flex-col items-center">
            <BiCheckCircle className="text-6xl text-primary" />
            <h3 className="text-xl font-semibold text-primary">
              You have Already Registered for this course!
            </h3>
            <p className="text-muted-foreground text-center">
              You can only register for a course once, untill it expires. To
              Check your course Avalidity,{" "}
              <Link
                href="/"
                className="text-primary underline underline-offset-8"
              >
                Click here
              </Link>
            </p>
          </div>
        )}
        {!registered && (
          <Button disabled={registering} className="mt-2">
            {registering ? "Registering..." : "Register Now"}
          </Button>
        )}
      </form>
    </div>
  );
}

export default CourseRegisterButton;
