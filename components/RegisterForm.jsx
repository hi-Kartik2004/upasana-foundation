import { SignedIn, SignedOut, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import CourseRegisterButton from "./CourseRegisterButton";

async function RegisterForm({ data }) {
  const user = await currentUser();

  return (
    <div className="h-full flex items-center flex-col justify-center w-full">
      <SignedIn>
        <div className="flex w-full">
          <CourseRegisterButton data={data} />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="mt-4 px-4 py-4 rounded-md border">
          <h3 className="text-xl text-center">Lorem ipsum dor sit</h3>
          <p className="mt-2 text-muted-foreground text-center">
            It appears that the error you're encountering is related to the
            usage of the Link component from Next.js
          </p>
          <Link
            href="/sign-in"
            className="bg-muted font-semibold flex justify-center border rounded-lg px-2 py-3 mt-4"
          >
            <>Sign in to register &rarr;</>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
}

export default RegisterForm;
