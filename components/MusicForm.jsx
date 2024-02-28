"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-context-menu";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { storage } from "@/firebase/config";
import { db } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc } from "firebase/firestore";
import { Toast } from "./ui/toast";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { BiLoader } from "react-icons/bi";

function MusicForm({ courseData }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const timestamp = new Date().getTime();
    const formData = new FormData(e.target);
    const recordingFile = formData.get("file");
    console.log(
      formData.get("heading"),
      formData.get("description"),
      recordingFile
    );

    const storageRef = ref(storage, `music/${recordingFile.name}_${timestamp}`);

    try {
      await uploadBytes(storageRef, recordingFile);
    } catch (uploadError) {
      console.error("Error uploading to Storage recording file:", uploadError);
      toast({
        title: "Failed to upload Music",
        description: "Error uploading to Storage",
      });
      setLoading(false);
      return;
    }

    let downloadURL;
    try {
      downloadURL = await getDownloadURL(storageRef);
    } catch (downloadError) {
      console.error("Error getting Download URL:", downloadError);
      toast({
        title: "Failed to upload Music",
        description: "Error getting Download URL",
      });
      setLoading(false);
      return;
    }

    const firestoreCollectionRef = collection(db, "course-music");
    const data = {
      courseId: courseData.id || "No_ID",
      heading: formData.get("heading"),
      description: formData.get("description"),
      file: downloadURL,
    };

    try {
      // Wait for the promise to resolve
      const docRef = await addDoc(firestoreCollectionRef, data);

      // Check if the document was successfully added
      if (docRef.id) {
        toast({
          title: "Music Uploaded",
          description: "Music has been uploaded successfully",
        });
      } else {
        toast({
          title: "Failed to upload Music",
          description: "Document ID not available",
        });
      }
    } catch (err) {
      console.error("Error adding document:", err);
      toast({
        title: "Failed to upload Music",
        description: err.message,
      });
    }

    setLoading(false);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Toaster />
      <div>
        <label className="text-xs">Content Heading</label>
        <Input
          type="text"
          placeholder="Heading"
          name="heading"
          required={true}
        />
      </div>
      <div>
        <label className="text-xs">Content Description</label>
        <Textarea
          type="text"
          placeholder="description"
          required={true}
          name="description"
        ></Textarea>
      </div>
      <div>
        <label className="text-xs">Upload Music</label>
        <Input type="file" required={true} name="file" />
      </div>
      <Button type="submit" className="mt-4">
        {loading ? <BiLoader className="animate-spin" /> : "Submit"}
      </Button>
    </form>
  );
}

export default MusicForm;
