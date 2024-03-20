import React from "react";
import globalData from "@/app/data";
import { currentUser, useUser } from "@clerk/nextjs";
async function layout({ children }) {
  const user = await currentUser();
  if (!globalData.adminEmails.includes(user?.emailAddresses[0]?.emailAddress)) {
    return (
      <div className="mt-24 mb-10">
        <h1 className="text-4xl font-bold text-center">
          You are not Authorized to view this page!
        </h1>
      </div>
    );
  }
  return <div>{children}</div>;
}

export default layout;
