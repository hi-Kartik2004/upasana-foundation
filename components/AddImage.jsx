import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

function AddImage() {
  return (
    <div>
      <Dialog className="">
        <Button asChild>
          <DialogTrigger>Add Image to this Markdown Document</DialogTrigger>
        </Button>
        <DialogContent className="max-w-[800px] w-full">
          <DialogHeader>
            <DialogTitle>Generate Link for an Image</DialogTitle>
            <DialogDescription>
              This action cannot be undone. You can use the created link by
              copying it and pasting it in the markdown document.
            </DialogDescription>
          </DialogHeader>

          <iframe
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            src="https://imgbb.com/"
            width={"100%"}
            height={"600px"}
          ></iframe>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddImage;
