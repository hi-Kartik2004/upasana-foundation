import React from "react";

function Divider({ left }) {
  return (
    <>
      <div className={`dark:hidden ${!left && "flex justify-center"}`}>
        <img
          src="/divider-dark.svg"
          alt="divider-flower-dark"
          className="mb-2"
        />
      </div>

      <div className="hidden dark:flex justify-center">
        <img
          src="/divider-horizontal-light.svg"
          alt="divider-flower-dark"
          className="mb-2"
        />
      </div>
    </>
  );
}

export default Divider;
