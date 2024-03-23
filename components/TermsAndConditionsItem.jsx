import React from "react";
import { BiCheck } from "react-icons/bi";

function TermsAndConditionsItem({ text }) {
  return (
    <div>
      <div className="flex gap-2 items-center ">
        <BiCheck className="text-primary" size={25} />
        <p className="text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

export default TermsAndConditionsItem;
