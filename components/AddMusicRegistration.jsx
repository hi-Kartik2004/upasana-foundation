"use client";
import React, { useState } from "react";
import { Toaster } from "./ui/toaster";
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function AddMusicRegistration({ addMusicRegistrationToFirebase, courseData }) {
  const [submiting, setSubmiting] = useState(false);
  const [email, setEmail] = useState("");
  const [durationInDays, setDurationInDays] = useState(0);
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmiting(true);
    const formData = new FormData(e.target);
    // console.log(formData.get("email"), formData.get("durationInDays"));
    // if email is comma separated
    let emails = email.split(",");
    // trim spaces
    emails = emails.map((email) => email.trim());

    // for each email add them to firebase
    for (const email of emails) {
      if (await addMusicRegistrationToFirebase(email, durationInDays)) {
        toast({
          title: "Music access given succesfully!",
          description: "It might take couple of seconds to be seen.",
        });
      } else {
        toast({
          title: "Some error occured!",
          description: "Unable to give access to the user.",
        });
      }
    }

    setSubmiting(false);
  }

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          type="text"
          name="email"
          placeholder="Email of the user"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <Input type="url" name="imageUrl" placeholder="Image url" /> */}
        <Input
          type="number"
          name="durationInDays"
          placeholder="duration (in days)"
          required={true}
          onChange={(e) => setDurationInDays(e.target.value)}
        />

        <Button disabled={submiting} className="mt-2">
          {submiting ? "Submitting" : "Add Music Free Registration"} &rarr;
        </Button>
      </form>
    </div>
  );
}

export default AddMusicRegistration;
