"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

function AddTestimonialsForm({ courseData, addTestimonialToFirebase }) {
  const [submiting, setSubmiting] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmiting(true);
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      imageUrl: formData.get("imageUrl"),
      title: formData.get("title"),
      description: formData.get("description"),
      timestamp: new Date().toDateString(),
    };
    if (await addTestimonialToFirebase(data)) {
      toast({
        title: "Testimonial Uploaded succesfully!",
        description: "It might take couple of seconds to be seen.",
      });
    } else {
      toast({
        title: "Some error occured!",
        description: "Unable to add the testimonial to the database.",
      });
    }
    setSubmiting(false);
  }

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input type="text" name="username" placeholder="Name of the user" />
        <Input type="url" name="imageUrl" placeholder="Image url" />
        <Input
          type="text"
          name="title"
          placeholder="Title of the testimonial"
        />
        <Textarea
          placeholder="Description of the testimonial"
          name="description"
          className=""
        />
        <Button disabled={submiting} className="mt-2">
          {submiting ? "Submitting" : "Add Testimonial "} &rarr;
        </Button>
      </form>
    </div>
  );
}

export default AddTestimonialsForm;
