"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import globalData from "@/app/data";
import { useUser } from "@clerk/nextjs";

function Page() {
  const [loading, setLoading] = useState(false); // State for button loading
  const { toast } = useToast(); // useToast hook
  const { isLoaded, user } = useUser();
  if (!isLoaded) {
    return null;
  }

  if (!globalData.adminEmails.includes(user?.emailAddresses[0]?.emailAddress)) {
    return (
      <div className="mt-24 mb-10">
        <h1 className="text-4xl font-bold text-center">
          You are not Authorized to view this page!
        </h1>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); // Set loading state to true during form submission

    const formData = new FormData(e.target);
    const videoData = {
      title: formData.get("videoTitle"),
      description: formData.get("videoDescription"),
      link: formData.get("videoLink"),
      timestamp: new Date().toISOString(),
      name: user?.fullName ?? "No name",
      email: user?.emailAddresses[0]?.emailAddress ?? "No email",
    };

    try {
      // Add video data to Firestore
      const videosCollectionRef = collection(db, "videos");
      await addDoc(videosCollectionRef, videoData);

      // Show success toast
      toast({
        title: "Video Added",
        description: "Your video has been successfully added!",
        status: "success",
      });

      // Clear the form after successful submission
      e.target.reset();
    } catch (error) {
      console.error("Error adding video:", error);

      // Show error toast
      toast({
        title: "Error",
        description: "An error occurred while adding the video.",
        status: "error",
      });
    } finally {
      setLoading(false); // Reset loading state after form submission
    }
  }

  return (
    <div className="mt-24 container">
      <Toaster />
      <div className="flex justify-center flex-col items-center">
        <h2 className="text-4xl font-bold text-primary">Add Videos</h2>
        <p className="text-muted-foreground mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          odio facere a!
        </p>
      </div>
      <Separator className="mt-10" />
      <div className="mt-10 flex justify-center mb-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-[500px] bg-muted/50 w-full flex flex-col gap-4 p-4 rounded-lg border"
        >
          <Input
            name="videoTitle"
            type="text"
            placeholder={"Title of the video"}
            required={true}
          />
          <Textarea
            name="videoDescription"
            placeholder={"Description of the video"}
            required={true}
          />
          <Input
            name="videoLink"
            type="text"
            placeholder={"Link to the video"}
            required={true}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Video →"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
