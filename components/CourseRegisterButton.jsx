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
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function calculateExpiryDate(batchDate, expiry) {
  try {
    // Parse the batch date string as a Date object
    const date = new Date(batchDate);

    // Validate the parsed date
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date value: ${batchDate}`);
    }

    // Validate the expiry parameter
    if (typeof expiry !== "number" || expiry < 0) {
      throw new Error(`Invalid expiry value: ${expiry}`);
    }

    // Add the expiry (number of days) to the date
    date.setDate(date.getDate() + expiry);

    // Format the expiry date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const expiryDate = `${year}-${month}-${day}`;

    // Return the formatted expiry date
    return expiryDate;
  } catch (error) {
    console.error("Error calculating expiry date:", error.message);
    return null;
  }
}

function BatchDropdown({ expiry, batches, onSelectBatch }) {
  console.log("called batch dropdown!");
  return (
    <Select name="batch">
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
                value={`Batch ${index + 1} - From: ${
                  batch.date
                }, To: ${calculateExpiryDate(batch?.date, expiry)}, Time: ${
                  batch.time
                } IST`}
              >
                {`Batch ${index + 1} - From: ${
                  batch.date
                }, To: ${calculateExpiryDate(batch?.date, expiry)}, Time: ${
                  batch.time
                } IST`}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
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

  const { toast } = useToast();

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
    const ref = collection(db, "course-registrations");
    const formData = new FormData(e.target);
    const res = await addDoc(ref, {
      ...data,
      registeredName: user?.fullName,
      registeredEmail: user?.emailAddresses[0].emailAddress,
      registeredPhone: user?.phoneNumbers[0]?.phoneNumber,
      registeredAddress: formData.get("address"),
      registeredOccupation: formData.get("occupation"),
      registeredWhatsapp: formData.get("whatsappNumber"),
      registeredBatch: formData.get("batch"),
      courseExpires: new Date().getTime() + data.expiry * 24 * 60 * 60 * 1000,
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

              <BatchDropdown
                expiry={data?.expiry}
                batches={data?.batches}
                onSelectBatch={(val) => {
                  setBatch(val);
                }}
              />
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
