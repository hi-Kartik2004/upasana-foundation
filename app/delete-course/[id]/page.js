"use client";
import { useUser } from "@clerk/clerk-react";
import { collection, deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "@/firebase/config";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import globalData from "@/app/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiLoader } from "react-icons/bi";

function DeleteCourse({ params }) {
  const { isLoaded, user } = useUser();
  if (!isLoaded) return null;
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const router = useRouter();
  const [deleteing, setDeleting] = useState(false);

  let isAdmin = globalData.adminEmails.includes(
    user.emailAddresses[0].emailAddress
  );
  console.log(isAdmin);
  if (!isAdmin) {
    router.replace("/courses");
  }

  async function deleteDocFromFirestore(e) {
    setDeleting(true);
    e.preventDefault();
    if (e.target[0].value !== params.id) {
      setDeleting(false);
      return;
    }
    try {
      const ref = doc(db, "courses", params.id);
      await deleteDoc(ref);
      setDeleting(false);
    } catch (err) {
      console.error(err);
    }
    router.replace("/courses");
  }

  return (
    <div className=" mt-28">
      <div>
        <h1 className="text-3xl font-bold text-center">Delete Course</h1>
        <p className="mx-6 text-center mt-2 text-muted-foreground">
          Are you sure you want to delete course titled {name}? This action
          cannot be undone.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          deleteDocFromFirestore(e);
        }}
        className="rounded-lg border p-6 max-w-[500px] my-10 mx-auto flex flex-col gap-4 bg-card hover:shadow-lg duration-300 hover:shadow-red-500/50"
      >
        <label>
          <span className="text-muted-foreground">
            Type the following to confirm deletion of course {name} :-
          </span>{" "}
          {params.id}:
        </label>
        <Input type="text" placeholder={params.id} />
        <Button variant={"destructive"} type="submit">
          {deleteing ? <BiLoader /> : "Delete"}
        </Button>
      </form>
    </div>
  );
}

export default DeleteCourse;
