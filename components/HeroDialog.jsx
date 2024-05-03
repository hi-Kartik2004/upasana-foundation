"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import globalData from "@/app/data";

function HeroDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpen(true);
    }, 4000);

    // clear set Time out
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[800px]">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold text-primary">
              Message From SadhguruShri
            </h3>
            <p className="text-sm text-muted-foreground">
              Listen what SadhguruShri tells regarding Upasana Foundation.
            </p>
          </div>
          <video
            src={globalData?.heroDialogVideoLink}
            controls
            autoPlay
            className="rounded-lg w-full h-full"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HeroDialog;
