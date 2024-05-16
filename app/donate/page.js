import DonateForm from "@/components/DonateForm";
import TermsAndConditionsItem from "@/components/TermsAndConditionsItem";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { BiCheck } from "react-icons/bi";
import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import globalData from "@/app/data";

function Donate() {
  async function addDonationToFirestore(data) {
    "use server";
    const ref = collection(db, "donations");
    try {
      const docRef = await addDoc(ref, data);
      return { success: true, docId: docRef.id, ...data };
    } catch (err) {
      console.error("Error adding document: ", err);
      return { success: false, error: err.message };
    }
  }
  return (
    <div className="container mt-28 mb-10">
      <Toaster />
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-primary text-center text-4xl font-bold">
          {globalData?.donatePageTitle ?? "Donate"}
        </h1>
        <p className="text-center mt-2 text-muted-foreground max-w-[900px]">
          {globalData?.donatePageDescription ?? "No description"}
        </p>
      </div>

      <div className="flex flex-wrap gap-12 justify-around w-full mt-16">
        <div className="w-full max-w-[600px]">
          <DonateForm addDonationToFirestore={addDonationToFirestore} />
        </div>
        <Separator className="" />
        <div className="flex flex-col items-center">
          <h2 className="text-center flex items-center text-2xl underline underline-offset-8">
            Terms & Conditions
          </h2>

          <div className="mt-10 flex flex-col gap-4 items-center">
            {globalData?.donationTermsAndConditions?.map((item, index) => (
              <TermsAndConditionsItem key={index} text={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donate;
