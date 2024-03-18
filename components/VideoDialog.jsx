import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

function VideoDialog({ video, content }) {
  const videoUrl = video.link;
  const videoId = videoUrl.split("v=")[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          {content === "thumbnail" && (
            <div className="flex w-full">
              <img
                src={video?.thumbnailUrl}
                alt={video?.title ?? "No title"}
                className="w-full h-full rounded-lg"
              />
            </div>
          )}
          {content === "title" && (video?.title ?? "No title")}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[1000px] w-full">
        <DialogTitle className="text-3xl">{video.title}</DialogTitle>
        <DialogDescription>{video?.description}</DialogDescription>
        <div className="aspect-w-4 aspect-h-3">
          <iframe
            className="w-full h-[60vh]"
            src={embedUrl}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default VideoDialog;
