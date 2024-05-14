import MusicRegistrationsTable from "@/components/CourseMusicRegistrationsTable";
import CourseRatingsTable from "@/components/CourseRatingsTable";
import { Separator } from "@/components/ui/separator";

function CourseMusicRegistrations() {
  return (
    <div className="mt-20">
      <div className="flex justify-between gap-10 relative">
        <div className="w-full container mt-4 max-w-[1200px] ">
          <div>
            <h1 className="text-2xl font-semibold">Course Ratings</h1>
            <p className="text-muted-foreground">
              {" "}
              View and filter course ratings records.
            </p>
          </div>

          <Separator className="my-4" />

          <CourseRatingsTable />

          <div></div>
        </div>
      </div>
    </div>
  );
}

export default CourseMusicRegistrations;
