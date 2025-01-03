import globalData from "@/app/data";
import { Button } from "@/components/ui/button";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

function page() {
  return (
    <div className="container mt-28 mb-10 min-h-screen">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-primary text-center text-4xl font-bold">
          {globalData?.quotesPageTitle ?? "Events"}
        </h1>
        <p className="text-center mt-2 text-muted-foreground">
          {globalData?.quotesPageDescription ?? "No description"}
        </p>
      </div>

      <div className="mx-auto max-w-[1250px] w-full">
        <div className="mt-8 flex flex-wrap gap-4 justify-start items-center">
          {globalData?.quoteCategories.map((category, index) => (
            <Link
              href={`/quotes/${category?.name.toLowerCase()}`}
              key={category?.name || index}
              className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-muted rounded shadow-xl group hover:shadow-2xl border border-gray-400 max-w-[400px] w-full"
            >
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-background">
                  {category?.icon}
                </div>
                <p className="mb-2 font-bold capitalize">
                  {category?.name} related
                </p>
                <p className="text-sm leading-5 text-muted-foreground">
                  {category?.description}
                </p>
                <Button className="mt-4 flex w-full text-start flex-start">
                  View {category?.name} Quotes
                </Button>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
