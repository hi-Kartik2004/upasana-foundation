"use client";
import React from "react";
import { Button } from "./ui/button";

function DeleteButton({ handleDelete, id, message }) {
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
