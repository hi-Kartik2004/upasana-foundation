import Link from "next/link";
import React from "react";
import data from "@/app/data";
import {
  BiLogoFacebook,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import VerticalDivider from "@/components/VerticalDivider";

function Footer() {
  return (
    <div className="bg-secondary">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-medium tracking-wide text-muted-foreground">
                Category
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    About SadhguruShri
                  </Link>
                </li>
                <li>
                  <Link
                    href="/quotes"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Quotes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium tracking-wide text-muted-foreground">
                Courses
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/courses"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    All Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register/LnLJ9zWFGTOyu5W1AuNx"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200 capitalize"
                  >
                    <span className="capitalize">Manoshakthi </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register/DhDp1Aiic4mYPpoOEVHv"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200 capitalize"
                  >
                    Sammohana Tantra
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register/3qn7HuhY9cDS21ReY6jd"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200 capitalize"
                  >
                    Shakti Kriya
                  </Link>
                </li>
                <li>
                  <a
                    href="/register/XMSNkcpoFpI4xssUcyrM"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200 capitalize"
                  >
                    Kundalini Diksha
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium tracking-wide text-muted-foreground">
                Specials
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/sri-paaduka"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Shri Paaduka
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sri-upasaka"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Shri Upasaka
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register/fIK7mJ3vZP3Pv3A4IJkj"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Devi Sadhana
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/donate"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Donate
                  </Link>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Educational
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Projects
                  </a>
                </li> */}
              </ul>
            </div>
            <div>
              <p className="font-medium tracking-wide text-muted-foreground">
                Others
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/donate"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Donate
                  </Link>
                </li>
                <li>
                  <a
                    href="/contact-us"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:max-w-md lg:col-span-2 lg:ml-4 mt-2 flex w-full">
            <VerticalDivider />
            <div className="flex flex-col gap-2 ml-4">
              <span className="text-base font-medium tracking-wide text-muted-foreground">
                Subscribe for updates
              </span>
              <form className="flex flex-col mt-4 md:flex-row">
                <input
                  placeholder="Email"
                  required
                  type="text"
                  className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-primary transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none border border-gray-300"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-sm text-gray-500">
                Get regular updated of our Shibirs, volunteer opportunities,
                events and a lot more
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row">
          <p className="text-sm text-gray-500">
            © All rights reserved by Upasana foundation
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <Link
              href={data?.linkedin}
              className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
            >
              <BiLogoLinkedinSquare size={27} />
            </Link>
            <Link
              href={data?.instagram}
              className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
              target="_blank"
            >
              <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                <circle cx="15" cy="15" r="4" />
                <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
              </svg>
            </Link>
            <Link
              href={data?.facebook}
              className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
              target="_blank"
            >
              <BiLogoFacebook size={27} />
            </Link>
            <Link
              href={data?.youtube}
              className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
              target="_blank"
            >
              <BiLogoYoutube size={27} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
