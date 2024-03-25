import { SignIn } from "@clerk/nextjs";
import globalData from "@/app/data";

export default function Page() {
  return (
    <div className="container mb-10 min-h-screen flex justify-center items-center w-full mx-auto">
      <div className="flex flex-col w-full items-center justify-center lg:justify-around lg:flex-row">
        <div className="hidden lg:block mb-12 lg:max-w-lg lg:pr-5 lg:mb-0">
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:leading-none">
              {globalData?.signInTitle}
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              {globalData?.signInDescription}
            </p>
          </div>
          <hr className="mb-6 border-gray-300" />
        </div>
        <SignIn />
      </div>
    </div>
  );
}
