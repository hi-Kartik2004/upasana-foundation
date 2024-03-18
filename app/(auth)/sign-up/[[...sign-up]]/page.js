import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container mb-10 min-h-screen flex justify-center items-center w-full mx-auto">
      <div className="flex flex-col w-full items-center justify-center lg:justify-around lg:flex-row">
        <div className="hidden lg:block mb-12 lg:max-w-lg lg:pr-5 lg:mb-0">
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:leading-none">
              The quick, brown fox
              <br className="hidden md:block" />
              jumps over{" "}
              <span className="inline-block text-deep-purple-accent-400">
                a lazy dog
              </span>
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae. explicabo.
            </p>
          </div>
          <hr className="mb-6 border-gray-300" />
          <div className="flex">
            <a href="/" aria-label="Play Song" className="mr-3">
              <div className="flex items-center justify-center w-10 h-10 bg-muted transition duration-300 transform rounded-full shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 hover:scale-110">
                <svg className="w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.53,11.152l-8-5C8.221,5.958,7.833,5.949,7.515,6.125C7.197,6.302,7,6.636,7,7v10 c0,0.364,0.197,0.698,0.515,0.875C7.667,17.958,7.833,18,8,18c0.184,0,0.368-0.051,0.53-0.152l8-5C16.822,12.665,17,12.345,17,12 S16.822,11.335,16.53,11.152z" />
                </svg>
              </div>
            </a>
            <div className="flex flex-col">
              <div className="text-sm font-semibold">
                Rich the kid &amp; Famous Dex
              </div>
              <div className="text-xs text-muted-foreground">
                Rich Forever Intro
              </div>
            </div>
          </div>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
