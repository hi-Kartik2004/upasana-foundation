import { ContactUsTable } from "@/components/OtherQueriesTable";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React from "react";

function ContactUsQueries() {
  return (
    <div className="mt-20">
      <div className="flex justify-between gap-10 relative">
        <div className="w-full container mt-4 max-w-[1200px] ">
          <div>
            <h1 className="text-2xl font-semibold">Contact Us Queries</h1>
            <p className="text-muted-foreground">lorem ipsum dolor sit amet</p>
          </div>

          <Separator className="my-4" />

          <ContactUsTable />

          <div></div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsQueries;
