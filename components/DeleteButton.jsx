"use client";
import React from "react";
import { Button } from "./ui/button";
import { db } from "@/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "./ui/use-toast";

function DeleteButton({ id, message, collection }) {
  async function handleDelete(id) {
    try {
      const eventRef = doc(db, collection, id);
      await deleteDoc(eventRef);
      console.log(`Event with ID ${id} deleted successfully.`);

      toast({
        title: "Event Deleted",
        description: "Event has been deleted successfully",
      });

      window.location.reload();
      setData(updatedData);
    } catch (err) {
      console.log(err);
      toast({
        title: `Error: deleting event`,
        description: `${err}`,
      });
    }
  }

  return (
    <div>
      <Button
        variant={"destructive"}
        size={"xs"}
        className="text-xs p-2 w-full mt-2"
        onClick={() => handleDelete(id)}
      >
        {message}
      </Button>
    </div>
  );
}

export default DeleteButton;
