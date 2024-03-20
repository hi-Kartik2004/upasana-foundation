import Link from "next/link";

export const SriPaadukaSimpleHero = ({ extraField }) => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24">
      <div className="grid gap-12 row-gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:leading-none">
              The quick, brown fox
              <br className="hidden md:block" />
              jumps over{" "}
              <span className="relative px-1">
                <div className="absolute inset-x-0 bottom-0 h-3 transform -skew-x-12 bg-teal-accent-400" />
                <span className="relative inline-block text-deep-purple-accent-400">
                  a lazy dog
                </span>
              </span>
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae. explicabo.
            </p>
          </div>

          <div className="grid gap-5 row-gap-8 sm:grid-cols-2">
            <div className="bg-card border-l-4 shadow-sm border-deep-purple-accent-400">
              <div className="h-full p-5 border border-l-0 rounded-r">
                <h6 className="mb-2 font-semibold leading-5">
                  I'll be sure to note that in my log
                </h6>
                <p className="text-sm text-muted-foreground">
                  Lookout flogging bilge rat main sheet bilge water nipper fluke
                  to go on account heave down.
                </p>
              </div>
            </div>
            <div className="bg-card border-l-4 shadow-sm border-deep-purple-accent-400">
              <div className="h-full p-5 border border-l-0 rounded-r">
                <h6 className="mb-2 font-semibold leading-5">
                  A business big enough that it could be listed
                </h6>
                <p className="text-sm text-muted-foreground">
                  Those options are already baked in with this model shoot me an
                  email clear.
                </p>
              </div>
            </div>
          </div>
          <Link
            href="#register"
            className="mt-10 underline underline-offset-8 text-primary"
          >
            Make Your Reservation For {extraField ?? ""} &rarr;
          </Link>
        </div>
        <div>
          <img
            className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
            src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
            alt="sri-paaduka-hero-img"
          />
        </div>
      </div>
    </div>
  );
};
