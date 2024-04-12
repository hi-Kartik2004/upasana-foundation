"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/config";

function AddVideoToFirebaseDialog() {
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const fileInput = form.elements.video;
    const file = fileInput.files[0];

    // Ensure a file is selected
    if (!file) {
      alert("Please select a video file.");
      return;
    }

    // Create a reference to the storage location
    const storageRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Set the uploading state to true
    setUploading(true);

    // Listen to upload state changes
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Monitor progress (optional)
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Error uploading video:", error);
        setUploading(false);
      },
      () => {
        // Handle successful uploads and get download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            setVideoUrl(downloadURL);
          })
          .finally(() => {
            // Reset the uploading state once done
            setUploading(false);
          });
      }
    );
  }

  // Function to copy the video URL to clipboard
  function copyToClipboard() {
    if (videoUrl) {
      navigator.clipboard
        .writeText(videoUrl)
        .then(() => {
          alert("URL copied to clipboard!");
        })
        .catch((error) => {
          console.error("Error copying URL to clipboard:", error);
          alert("Failed to copy URL to clipboard.");
        });
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Add Private Video</Button>
      </DialogTrigger>
      <DialogContent>
        <h3 className="font-semibold text-3xl">Add Video to Firestore</h3>
        <p className="text-muted-foreground text-sm">
          Please check the size of the video before uploading. If the upload
          fails, it's very likely because you don't have enough space on
          Firebase.
        </p>
        <form onSubmit={handleSubmit}>
          <Input required type="file" name="video" />
          <Button className="mt-4" type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Add to Firebase"}
          </Button>
        </form>
        {videoUrl && (
          <div className="mt-4">
            <p className="text-green-600">Video uploaded successfully. URL:</p>
            <div className="p-2 rounded-lg border flex flex-wrap justify-between items-center">
              <p>{videoUrl}</p>
              <Button
                variant="secondary"
                onClick={copyToClipboard}
                className="mt-2"
              >
                Copy URL
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddVideoToFirebaseDialog;
