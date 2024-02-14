import React from "react";
import Link from "next/link";
function HeroBlogSection() {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        <div className="overflow-hidden transition-shadow duration-300 bg-secondary rounded-lg shadow-sm">
          <img
            src="https://images.pexels.com/photos/2408666/pexels-photo-2408666.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
            className="object-cover w-full h-64"
            alt=""
          />
          <div className="p-5 border border-t-0">
            <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
              <Link
                href="/"
                className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                aria-label="Category"
                title="traveling"
              >
                traveling
              </Link>
              <span className="text-muted-foreground">— 28 Dec 2020</span>
            </p>
            <Link
              href="/"
              aria-label="Category"
              title="Visit the East"
              className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              Visit the East
            </Link>
            <p className="mb-2 text-muted-foreground">
              Sed ut perspiciatis unde omnis iste natus error sit sed quia
              consequuntur magni voluptatem doloremque.
            </p>
            <Link
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800 text-orange"
            >
              Learn More &rarr;
            </Link>
          </div>
        </div>
        <div className="overflow-hidden transition-shadow duration-300 bg-secondary rounded-lg shadow-sm">
          <img
            src="https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            className="object-cover w-full h-64"
            alt=""
          />
          <div className="p-5 border border-t-0">
            <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
              <Link
                href="/"
                className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                aria-label="Category"
                title="traveling"
              >
                traveling
              </Link>
              <span className="text-muted-foreground">— 28 Dec 2020</span>
            </p>
            <Link
              href="/"
              aria-label="Category"
              title="Simple is better"
              className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              Simple is better
            </Link>
            <p className="mb-2 text-muted-foreground">
              Sed ut perspiciatis unde omnis iste natus error sit sed quia
              consequuntur magni voluptatem doloremque.
            </p>
            <Link
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800 text-orange"
            >
              Learn More &rarr;
            </Link>
          </div>
        </div>
        <div className="overflow-hidden transition-shadow duration-300 bg-secondary rounded-lg shadow-sm">
          <img
            src="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            className="object-cover w-full h-64"
            alt=""
          />
          <div className="p-5 border border-t-0">
            <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
              <Link
                href="/"
                className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                aria-label="Category"
                title="traveling"
              >
                traveling
              </Link>
              <span className="text-muted-foreground">— 28 Dec 2020</span>
            </p>
            <Link
              href="/"
              aria-label="Category"
              title="Film It!"
              className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              Film It!
            </Link>
            <p className="mb-2 text-muted-foreground">
              Sed ut perspiciatis unde omnis iste natus error sit sed quia
              consequuntur magni voluptatem doloremque.
            </p>
            <Link
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800 text-orange"
            >
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBlogSection;
