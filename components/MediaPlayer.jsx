"use client";
import ReactPlayer from "react-player/lazy";
import React from "react";

function MediaPlayer({ url = "https://www.youtube.com/watch?v=LXb3EKWsInQ" }) {
  return <ReactPlayer controls={true} url={url} />;
}

export default MediaPlayer;
