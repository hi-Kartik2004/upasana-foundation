import { SignedIn, SignedOut, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import CourseRegisterButton from "./CourseRegisterButton";
import SpecialTypeRegistrationFormArea from "./SpecialTypeRegistrationFormArea";

async function SpecialTypeRegistrationForm({ extraField }) {
  const user = await currentUser();

  return (
    <div className="h-full flex items-center flex-col justify-center w-full">
      <SignedIn>
        <div className="flex w-full">
          <SpecialTypeRegistrationFormArea extraField={extraField} />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="mt-4 px-4 py-4 rounded-md border">
          <h3 className="text-xl text-center">Lorem ipsum dor sit</h3>
          <p className="mt-2 text-muted-foreground text-center">
            You need to login to register for this pooja!
          </p>
          <Link
            href="/sign-in"
            className="bg-muted font-semibold  flex justify-center border rounded-lg px-2 py-3 mt-4"
          >
            <>Sign in to register &rarr;</>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
}

export default SpecialTypeRegistrationForm;