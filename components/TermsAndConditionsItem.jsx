import React from "react";
import { BiCheck } from "react-icons/bi";

function TermsAndConditionsItem({ text }) {
  return (
    <div>
      <div className="flex gap-2 items-center flex-grow relative">
        <BiCheck
          className="text-primary text-xl h-6 w-6 absolute left-0 top-0"
          size={25}
        />
        <p className="text-muted-foreground ml-8">{text}</p>
      </div>
    </div>
  );
}

export default TermsAndConditionsItem;
