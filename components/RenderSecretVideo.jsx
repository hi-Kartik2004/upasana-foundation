"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState, useRef } from "react";
import { Tooltip, TooltipContent, TooltipProvider } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Button } from "./ui/button";
import { BiFullscreen } from "react-icons/bi";

function RenderSecretVideo({ url }) {
  const [blobURL, setBlobURL] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const videoContainerRef = useRef(null);

  // Function to read a File or Blob and print the result
  function readFile(file) {
    const fr = new FileReader();
    fr.readAsDataURL(file);

    fr.addEventListener("load", () => {
      const result = fr.result;
      // console.log("File data URL:", result);
    });

    fr.addEventListener("error", (err) => {
      console.error("Error reading file:", err);
    });
  }

  // Function to fetch the file from the provided URL and process it
  async function fetchTheFile() {
    try {
      console.log("Fetching file from URL:", url);

      // Fetch the file from the URL
      const response = await fetch(url);

      // Check if the fetch was successful
      if (!response.ok) {
        throw new Error(
          `Failed to fetch file: ${response.status} ${response.statusText}`
        );
      }

      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a Blob URL from the Blob
      setBlobURL(URL.createObjectURL(blob));

      // Create a File object from the Blob
      const file = new File([blob], "music-file", { type: blob.type });

      // Read the file data
      readFile(file);

      // After using the Blob URL, revoke it to free up memory and prevent further access
      URL.revokeObjectURL(blobURL);
    } catch (err) {
      console.error("Error fetching file:", err);
    }
  }

  // Fetch the file when the component mounts
  useEffect(() => {
    fetchTheFile();
  }, []);

  useEffect(() => {
    function handleFullScreenChange() {
      setFullScreen(!!document.fullscreenElement);
    }

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  function toggleFullscreen() {
    const vidCont = videoContainerRef.current;
    if (!document.fullscreenElement) {
      if (vidCont.requestFullscreen) {
        vidCont.requestFullscreen();
      } else if (vidCont.webkitRequestFullscreen) {
        vidCont.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <div ref={videoContainerRef} className="video-container relative">
      <video className="video w-full" src={blobURL} controls></video>
      <p className="absolute bottom-[40%] translate-y-[40%] left-[30%] translate-x-[-30%] text-xs text-muted-foreground">
        {user.emailAddresses[0].emailAddress.split("@")[0]}
      </p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="fullscreen-button absolute top-4 right-4 z-10"
              onClick={toggleFullscreen}
              variant="outline"
            >
              <BiFullscreen />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toogle full screen</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default RenderSecretVideo;
