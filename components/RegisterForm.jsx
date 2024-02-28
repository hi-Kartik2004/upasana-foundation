import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

async function RegisterForm({ data }) {
  return (
    <div className="h-full flex items-center flex-col justify-center">
      <SignedIn></SignedIn>
      <SignedOut>
        <div className="mt-24 px-4 py-4 rounded-md border">
          <h3 className="text-xl text-center">Lorem ipsum dor sit</h3>
          <p className="mt-2 text-muted-foreground text-center">
            It appears that the error you're encountering is related to the
            usage of the Link component from Next.js
          </p>
          <Link
            href="/sign-in"
            className="hover:bg-muted flex justify-center border rounded p-2 mt-4"
          >
            <>Sign in to register &rarr;</>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
}

export default RegisterForm;
