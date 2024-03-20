import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import VideoDialog from "@/components/VideoDialog";
import YouTubeAPI from "youtube-api";

YouTubeAPI.authenticate({
  type: "key",
  key: "AIzaSyB3aMVWp1pUIVtlqro5xcWtbLce76T2xmg",
});

async function getVideoThumbnail(url) {
  try {
    const videoId = url.split("v=")[1];
    const response = await YouTubeAPI.videos.list({
      id: videoId,
      part: "snippet",
    });
    const thumbnailUrl = response.data.items[0].snippet.thumbnails.default.url;
    return thumbnailUrl;
  } catch (error) {
    console.error("Error fetching video thumbnail:", error);
    return null;
  }
}

async function Videos() {
  let data;
  try {
    const courseRef = collection(db, "videos");
    const resp = await getDocs(courseRef);
    data = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(data);

    const videosWithThumbnails = await Promise.all(
      data.map(async (video) => {
        if (video.link.includes("youtube.com")) {
          const thumbnailUrl = await getVideoThumbnail(video.link);
          return { ...video, thumbnailUrl };
        } else {
          return video;
        }
      })
    );

    data = videosWithThumbnails;
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="container mt-28">
      <div className="flex justify-center items-center flex-col gap-3">
        <h1 className="font-bold text-4xl">Videos</h1>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi
          maxime cumque harum.
        </p>
      </div>

      <div className="mt-10 mb-10 flex flex-wrap justify-around">
        {data.map((video) => (
          <Card key={video.id} className="bg-card max-w-[420px]">
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
              </div>
            </CardFooter>

            <CardContent>
              <VideoDialog video={video} content={"thumbnail"} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Videos;
