"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Loader from "./Loader";
import { toast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

function DonateForm({ addDonationToFirestore }) {
  const { isLoaded, user } = useUser();
  const [donating, setDonating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setDonating(true);
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      name: user?.fullName ?? formData.get("name"),
      email: user?.emailAddresses[0]?.emailAddress ?? formData.get("email"),
      phone: user?.phoneNumbers[0]?.phoneNumber ?? formData.get("phone"),
      occupation: formData.get("occupation"),
      address: formData.get("address"),
      message: formData.get("message"),
      amount: formData.get("amount"),
      timestamp: Date.now(),
    };
    try {
      const paymentResponse = await addDonationToFirestore(data);
      console.log(paymentResponse);
      setPaymentDetails(paymentResponse);
    } catch (err) {
      toast({
        title: `Error ${err}`,
        description: "An error occurred while processing your donation.",
        status: "error",
      });
    } finally {
      setDonating(false);
      e.target.reset();
    }
  }

  if (!isLoaded || loading) {
    return <Loader />;
  }

  function handleDrawer() {
    setPaymentDetails(null);
  }

  return (
    <div className="">
      <Toaster />
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="rounded-lg border p-4 flex flex-col gap-4 w-full bg-card"
      >
        <h2 className="mt-4 text-center underline underline-offset-8 text-3xl">
          Donation Form
        </h2>
        <div>
          <label className="text-sm text-muted-foreground">Name*</label>
          <Input
            value={user?.fullName}
            name="name"
            type="text"
            disabled={user?.fullName ? true : false}
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Email*</label>
          <Input
            name={"email"}
            value={user?.emailAddresses[0].emailAddress}
            disabled={user?.emailAddresses[0]?.emailAddress ? true : false}
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Phone Number*</label>
          <Input
            name={"phone"}
            value={user?.phoneNumbers[0]?.phoneNumber}
            disabled={user?.phoneNumbers[0].phoneNumber ? true : false}
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Occupation*</label>
          <Input
            name={"occupation"}
            placeholder={"Enter Occupation"}
            required={true}
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Address*</label>

          <Textarea
            name={"address"}
            placeholder={"Enter Address"}
            required={true}
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">
            message (not manditory field)
          </label>
          <Textarea
            name={"message"}
            placeholder={"Enter your message, can be your reason for donation"}
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Amount</label>
          <Input
            name={"amount"}
            type={"number"}
            placeholder={"Enter your amount"}
            required={true}
            min={1}
          />
        </div>

        <Button type={"submit"} className="w-full">
          {donating ? "Donating..." : "Donate"}
        </Button>
      </form>

      {paymentDetails && (
        <Drawer open={true}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-center text-2xl font-semibold underline underline-offset-8">
                Payment Details
              </DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col items-center">
              {paymentDetails?.success ? (
                <div>
                  <h3 className="">
                    Status:{" "}
                    <span className="text-green-500 font-bold">
                      Payment Successful
                    </span>
                  </h3>
                  <p className="">Payment ID: {paymentDetails.docId}</p>
                  <p className="">Name: {paymentDetails.name}</p>
                  <p className="">Amount: Rs {paymentDetails.amount}/-</p>
                  <p className="">Message: {paymentDetails.message}</p>
                  <p className="">Phone: {paymentDetails.phone}</p>
                  <p className="">Email: {paymentDetails.email}</p>
                  <p className="">Address: {paymentDetails.address}</p>
                  <p className="">Occupation: {paymentDetails.occupation}</p>

                  <p className="mt-4 text-muted-foreground">
                    - Please Take a screenshot of this page, for future
                    reference.
                  </p>
                </div>
              ) : (
                <div>
                  <h3>Payment Failed</h3>
                  <p>Reason: {paymentDetails.reason}</p>
                </div>
              )}
            </div>
            <DrawerFooter>
              <DrawerClose asChild onClick={() => setPaymentDetails(null)}>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}

export default DonateForm;
