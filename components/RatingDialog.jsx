"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Rating } from "react-simple-star-rating";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { Textarea } from "./ui/textarea";
import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  doc,
  addDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";

function RatingDialog({ addRatingToFirestore, name, email, courseId }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  async function isUserRated() {
    try {
      const q = query(
        collection(db, "course-ratings"),
        where("registeredEmail", "==", email),
        where("id", "==", courseId)
      );

      const snapshot = await getDocs(q);
      console.log(snapshot.size > 0);

      if (snapshot.size > 0) {
        return true;
      }
    } catch (err) {
      console.error("Error querying documents:", err);
    }
    return false;
  }

  function handleSubmit(e, rating) {
    e.preventDefault();
    if (addRatingToFirestore(rating, feedback)) {
      toast({
        title: "Rating uploaded Successfully!",
      });
    }
    setOpen(false);
  }

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
  };

  console.log("Before use effect " + showMessage);

  useEffect(() => {
    async function checkUserRating() {
      const rated = await isUserRated();
      setShowMessage(rated);
    }
    checkUserRating();
  }, [handleSubmit]);

  return (
    <>
      <Toaster />

      <Dialog open={open} onOpenChange={setOpen} className="w-[800px]">
        <DialogTrigger asChild>
          <Button variant="secondary">Rate this course</Button>
        </DialogTrigger>
        <DialogContent className="w-[800px]">
          <h4 className="text-xl font-medium">Rate {name}</h4>
          <p className="text-muted-foreground">
            Rating this course will help others understand your experience with
            us!
          </p>
          {showMessage ? (
            <p>
              You've already rated this course, please contact us if you think
              this is a mistake!
            </p>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, rating)} className="">
              <div className="">
                <Rating
                  onClick={handleRating}
                  SVGclassName={"inline-block"}
                  initialValue={0}
                  className="mt-2"
                />
                <p className="mt-4 text-muted-foreground">
                  Your Rating: {rating}
                </p>
                <Textarea
                  onChange={(e) => setFeedback(e.target.value)}
                  value={feedback}
                  placeholder="Feedback"
                  className="mt-4"
                />
              </div>

              <Button className="mt-4" variant="secondary">
                Submit
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RatingDialog;
