"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useUser } from "@clerk/nextjs";
import Loader from "./Loader";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { toast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import globalData from "@/app/data";

function MusicRequestForm({
  addMusicRequestToFirestore,
  nameOfCourse,
  status,
  courseId,
  isRequested,
  isRegistered,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(isRequested);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isRegistered: false, // Initialize isRegistered as false by default
    comments: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    const data = {
      name: user?.fullName,
      phone: user?.phoneNumbers[0].phoneNumber,
      comments: formData.get("comments"),
      isRegistered: isRegistered,
      musicCourseName: nameOfCourse,
      courseId: courseId,
      status: "Pending",
      email: user?.emailAddresses[0].emailAddress,
      fees: globalData?.exclusiveMusicPrice,
      timestamp: Date.now(),
    };

    if (await addMusicRequestToFirestore(data)) {
      setSubmitted(true);
      toast({
        title: "Request sent successfully!",
        description:
          "It might take up to 24 hours for the request to be addressed!",
      });
    }
    setSubmitting(false);
  }

  const { isLoaded, user } = useUser();
  useEffect(() => {
    if (isLoaded && user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.fullName || "",
        email: user.emailAddresses?.[0]?.emailAddress || "",
        phone: user.phoneNumbers?.[0]?.phoneNumber || "",
      }));
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="mt-24">
        <Loader />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex bg-card flex-wrap flex-col gap-4 p-4 border rounded-lg max-w-[500px]"
    >
      <Toaster />
      <h1 className="text-center font-bold text-xl">
        ✨ Request Form for {nameOfCourse}'s Exclusive Music!
      </h1>
      <Separator />
      <Input name="name" value={formData.name} disabled={true} />
      <Input name="email" value={formData.email} disabled={true} />
      <Input name="phone" value={formData.phone} disabled={true} />
      <Label className="flex items-center gap-2 text-muted-foreground">
        <Checkbox name="isRegistered" checked={isRegistered} disabled />
        Have you registered for {nameOfCourse}?
      </Label>
      <Textarea name="comments" placeholder={"Add any other comments"} />

      <p
        // href="/terms-and-conditions"
        className="text-muted-foreground text-sm"
      >
        ✨ You can only make a payment after your request is approved, you can
        check the status of your request on this page.
      </p>
      <p className="text-muted-foreground text-sm">
        ✨ It might take about a day to validate requests and once your request
        is approved you can click on proceed to payment button.
      </p>
      <p className="text-muted-foreground text-sm">⌛Status: {status}</p>
      <div className="flex flex-col gap-4 mt-2">
        <Button
          className="flex text-wrap flex-grow"
          disabled={submitted}
          style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        >
          {isRequested && !submitting
            ? `Already requested status: ${status}`
            : `Submit request to access exclusive music for ${nameOfCourse}`}

          {submitting && ` Submitting...`}
        </Button>
        <Separator />
        <Button
          variant={"outline"}
          disabled={!(status == "Approved")}
          className="flex text-wrap flex-grow"
          style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        >
          <Link href="/">
            Proceed to make a payment of Rs {globalData.exclusiveMusicPrice}/-{" "}
            <br />{" "}
            {status === "Pending" && "(Disabled... pending for approval)"}
          </Link>
        </Button>
      </div>
    </form>
  );
}

export default MusicRequestForm;
