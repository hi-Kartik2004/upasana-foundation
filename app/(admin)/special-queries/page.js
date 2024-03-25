import PoojaRegistrationsTable from "@/components/SpecialQueriesTable";
import { Separator } from "@/components/ui/separator";
import React from "react";

function page() {
  return (
    <div className="mt-20">
      <div className="flex justify-between gap-10 relative">
        <div className="w-full container mt-4 max-w-[1200px] ">
          <div>
            <h1 className="text-2xl font-semibold">Special Queries</h1>
            <p className="text-muted-foreground">
              {" "}
              View and filter Sri Upasaka and Sri Paaduka records
            </p>
          </div>

          <Separator className="my-4" />

          <PoojaRegistrationsTable />

          <div></div>
        </div>
      </div>
    </div>
  );
}

export default page;
