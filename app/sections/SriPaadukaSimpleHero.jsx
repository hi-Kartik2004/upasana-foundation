import Link from "next/link";
import data from "@/app/data";

export const SriPaadukaSimpleHero = ({
  extraField,
  title,
  description,
  image,
  cards,
}) => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24">
      <div className="grid gap-12 row-gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:leading-none">
              {title ?? data?.sriPaadukaHeroTitle ?? "Sri Paaduka"}
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              {description ?? data?.sriPaadukaHeroDescription}
            </p>
          </div>

          <div className="grid gap-5 row-gap-8 sm:grid-cols-2">
            {cards
              ? cards.map((card, index) => (
                  <div className="bg-card border-l-4 shadow-sm border-deep-purple-accent-400">
                    <div className="h-full p-5 border border-l-0 rounded-r">
                      <h6 className="mb-2 font-semibold leading-5">
                        {card?.title}
                      </h6>
                      <p className="text-sm text-muted-foreground">
                        {card?.description}
                      </p>
                    </div>
                  </div>
                ))
              : data?.sriPaadukaHeroCards.map((card, index) => (
                  <div className="bg-card border-l-4 shadow-sm border-deep-purple-accent-400">
                    <div className="h-full p-5 border border-l-0 rounded-r">
                      <h6 className="mb-2 font-semibold leading-5">
                        {card?.title}
                      </h6>
                      <p className="text-sm text-muted-foreground">
                        {card?.description}
                      </p>
                    </div>
                  </div>
                ))}
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
            src={image ?? data?.sriPaadukaHeroImageUrl}
            alt="sri-paaduka-hero-img"
          />
        </div>
      </div>
    </div>
  );
};
