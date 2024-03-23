import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggleBtn } from "@/components/ThemeToggleBtn";
import { SheetClose } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowDown, IoIosMenu, IoIosPeople } from "react-icons/io";
import { SignedIn, UserButton, currentUser } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BsFileArrowDown } from "react-icons/bs";
import { BiStar } from "react-icons/bi";
import { PiHandsPrayingFill } from "react-icons/pi";
import { RiDoubleQuotesL } from "react-icons/ri";

async function Navbar() {
  const user = await currentUser();
  return (
    <nav className="fixed z-10 w-full top-0 backdrop-blur-3xl bg-background/50 border">
      <div className="container px-4 py-3 items-center flex justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex lg:hidden">
            <MobileMenu />
          </div>
          <Link href="/">
            <img
              src="https://www.upasanafoundation.org/assets/img/logo-upasana-new.png"
              alt="logo"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div className="hidden lg:flex gap-6 items-center">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
          >
            Home
          </Link>
          <Link
            href="/about-us"
            className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
          >
            About
          </Link>
          <Link
            href="/courses"
            className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
          >
            Courses
          </Link>
          <Link
            href="/videos"
            className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
          >
            Videos
          </Link>
          <Link
            href="/sri-paaduka"
            className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
          >
            Sri Paaduka
          </Link>
          <Link
            href="/sri-upasaka"
            className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
          >
            Sri Upasaka
          </Link>
          <Link
            href="/contact-us"
            className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
          >
            Contact Us
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"link"}
                className="text-muted-foreground p-0 font-normal outline-none focus-visible:ring-0 ring-0 border-none"
              >
                Others <IoIosArrowDown className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link
                  href="/about-sadhguru"
                  className="flex items-center gap-2"
                >
                  <PiHandsPrayingFill /> About Sadhguru Sri
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/quotes" className="flex items-center gap-2">
                  <RiDoubleQuotesL />
                  Quotes
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/events" className="flex items-center gap-2">
                  <IoIosPeople />
                  Events
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <SignedIn>
            <Link
              href="/my-courses"
              className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
            >
              My Courses
            </Link>
          </SignedIn>
        </div>
        <div className="flex items-center gap-6">
          {user ? (
            <UserButton />
          ) : (
            <Link
              href="/sign-in"
              className="hover:underline underline-offset-8 text-sm"
            >
              {" "}
              Sign in{" "}
            </Link>
          )}
          <ThemeToggleBtn />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
