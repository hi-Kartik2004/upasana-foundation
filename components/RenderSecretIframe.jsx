"use client";
import React, { useEffect, useState } from "react";

function RenderSecretIframe({ url }) {
  const [blobURL, setBlobURL] = useState("");
  // Override the URL for demonstration purposes
  //   url =
  //     "https://videos.pexels.com/video-files/20600550/20600550-uhd_3840_2160_30fps.mp4";

  // Function to read a File or Blob and print the result
  function readFile(file) {
    const fr = new FileReader();
    fr.readAsDataURL(file);

    fr.addEventListener("load", () => {
      const result = fr.result;
      //   console.log("File data URL:", result);
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

      // Optional: log the Blob URL for testing

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
    // fetchTheFile();
  }, []);

  console.log(blobURL);

  return (
    <div>
      {/* passing blobURL isnt working */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%",
          marginBottom: "1rem",
        }}
      >
        <iframe
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          src={url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default RenderSecretIframe;
