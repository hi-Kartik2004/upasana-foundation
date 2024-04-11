"use client";
import React, { useEffect, useState } from "react";

function RenderSecretAudio({ url }) {
  const [blobURL, setBlobURL] = useState("");
  // Override the URL for demonstration purposes
  //   url =
  //     "https://res.cloudinary.com/practicaldev/image/fetch/s---tss4geP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3qul2upbi8ko7vdg8bm7.png";

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
    fetchTheFile();
  }, []);

  return (
    <div>
      <audio controls src={blobURL}></audio>
    </div>
  );
}

export default RenderSecretAudio;
