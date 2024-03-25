import CourseRegistrationsTable from "@/components/CourseRegistrationsTable";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

function Admin() {
  return (
    <div className="mt-20">
      <div className="flex justify-between gap-10 relative">
        {/* <div className="flex flex-col gap-4 p-4 rounded-r-lg bg-card border sticky left-0 top-0 h-screen">
          <Link href="/admin?course-registrations">Course registrations</Link>
          <Link href="/admin?course-music-registrations">
            Course Music Registrations
          </Link>
          <Link href="/admin?course-music">Course Music</Link>
          <Link href="/admin?sri-upasaka">Sri Upasaka-r Applications</Link>
          <Link href="/admin?sri-paaduka">Sri Paaduka Requests</Link>
          <Link href="/admin?other-queries">Other Queries</Link>
        </div> */}

        <div className="w-full container mt-4 max-w-[1200px] ">
          <div>
            <h1 className="text-2xl font-semibold">Course registrations</h1>
            <p className="text-muted-foreground">
              View and filter course registration records
            </p>
          </div>

          <Separator className="my-4" />

          <CourseRegistrationsTable />

          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
