"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import VideoDialog from "@/components/VideoDialog";
// import YouTubeAPI from "youtube-api";
import { Button } from "@/components/ui/button";
import globalData from "@/app/data";
import { useUser } from "@clerk/nextjs";
import DeleteButton from "@/components/DeleteButton";

function Videos() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) return null;

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRef = collection(db, "videos");
        const resp = await getDocs(courseRef);
        const fetchedData = resp.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          thumbnailUrl: getVideoThumbnail(doc.data().link), // Get thumbnail URL
        }));
        setData(fetchedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  async function handleDelete(id) {
    try {
      const videoRef = doc(db, "videos", id);
      await deleteDoc(videoRef);
      console.log(`Video with ID ${id} deleted successfully.`);

      // Remove the deleted video from the UI
      const updatedData = data.filter((video) => video.id !== id);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting video:", error);
      // Handle error, if needed
    }
  }

  function getVideoThumbnail(url) {
    try {
      if (url.includes("youtube.com")) {
        const videoId = url.split("v=")[1];
        return `https://img.youtube.com/vi/${videoId}/default.jpg`;
      } else {
        // Handle other video platforms or custom URLs
        return null;
      }
    } catch (error) {
      console.error("Error getting video thumbnail:", error);
      return null;
    }
  }

  return (
    <div className="container mt-28">
      <div className="flex justify-center items-center flex-col gap-3">
        <h1 className="font-bold text-4xl">{globalData?.videoPageTitle}</h1>
        <p className="text-muted-foreground">
          {globalData?.videoPageDescription}
        </p>
      </div>

      <div className="mt-10 mb-10 flex flex-wrap gap-4 justify-around">
        {data.length === 0 ? (
          <p className="text-lg">We are adding Videos soon!</p>
        ) : (
          // Render videos if data array is not empty
          data.map((video) => (
            <Card
              key={video.id}
              className="bg-card max-w-[420px]"
              id={`video-${video.id}`}
            >
              <CardHeader>
                <CardTitle>
                  <VideoDialog video={video} content={"title"} />
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-4">
                  {video.description}
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex flex-wrap justify-between items-baseline">
                <div>
                  <p className="text-xs text-muted-foreground">{video.name}</p>
                  <Link
                    href={`mailto:${video?.email ?? "upasanafound@gmail.com"}`}
                    className="text-xs text-muted-foreground underline underline-offset-8"
                  >
                    {video.email}
                  </Link>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {video.timestamp.split("T")[0]}
                  </p>
                  {globalData.adminEmails.includes(
                    user.emailAddresses[0].emailAddress
                  ) && (
                    <DeleteButton
                      email={
                        user?.emailAddresses[0]?.emailAddress ?? "Not provided"
                      }
                      message={"delete"}
                      id={video.id}
                      collection={"videos"}
                    />
                  )}
                </div>
              </CardFooter>

              <CardContent>
                <VideoDialog video={video} content={"thumbnail"} />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Videos;
