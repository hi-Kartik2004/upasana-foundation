import AddEventForm from "@/components/AddEventForm";
import React from "react";

function AddEvent() {
  return (
    <div className="container mt-24">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-primary text-center text-4xl font-bold">
          Add Event
        </h1>
        <p className="text-center mt-2 text-muted-foreground">
          Add event information as a article and publish it.
        </p>
      </div>

      <div className="mt-4">
        <AddEventForm />
      </div>
    </div>
  );
}

export default AddEvent;
