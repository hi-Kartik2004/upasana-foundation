import DonateForm from "@/components/DonateForm";
import TermsAndConditionsItem from "@/components/TermsAndConditionsItem";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { BiCheck } from "react-icons/bi";
import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

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
          lorem ipsum.
        </h1>
        <p className="text-center mt-2 text-muted-foreground">
          lorem ipsum dor sit ipem
        </p>
      </div>

      <div className="flex flex-wrap gap-12 justify-around w-full mt-16">
        <div className="w-full max-w-[600px]">
          <DonateForm addDonationToFirestore={addDonationToFirestore} />
        </div>
        <div className="w-full max-w-[700px] flex flex-col items-center ">
          <h2 className="text-center flex items-center text-2xl underline underline-offset-8">
            Send via QR Code
          </h2>
          <div className="mt-10 flex items-center justify-around flex-wrap border rounded-lg p-4">
            <div className="border p-4 rounded-lg bg-muted">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6x-ZkJK5Os7Y5HmpPsCOStJDS6EjGrdbC4eKcpaCiiQ&s"
                alt="qr-code"
              />
            </div>

            <div className="flex flex-col items-start justify-around max-w-[300px] sm:ml-10 w-full">
              <div>
                <h2 className="text-2xl mt-4 font-semibold text-center">
                  lorem ipsum{" "}
                </h2>
                <p className="text-center mt-2 text-muted-foreground">
                  +91 12345 67890
                </p>

                <p className="mt-2 text-center">
                  encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6x-ZkJK5
                </p>
              </div>
              <div className="p-2 flex justify-center w-full mt-6 border rounded-lg bg-muted">
                <p>UPI Id: 9901848769@ybl</p>
              </div>
            </div>
          </div>

          <Separator className="my-10" />
          <div className="flex flex-col items-center">
            <h2 className="text-center flex items-center text-2xl underline underline-offset-8">
              Terms & Conditions
            </h2>

            <div className="mt-10 flex flex-col gap-4 items-center">
              <TermsAndConditionsItem
                text={
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquamquae commodi eum!"
                }
              />
              <TermsAndConditionsItem
                text={
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquamquae commodi eum!"
                }
              />
              <TermsAndConditionsItem
                text={
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquamquae commodi eum!"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donate;
