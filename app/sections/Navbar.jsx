import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggleBtn } from "@/components/ThemeToggleBtn";
import { SheetClose } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosMenu } from "react-icons/io";

function Navbar() {
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
            href="/about-us"
            className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
          >
            About
          </Link>

          <Link
            href="/events"
            className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
          >
            Events
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
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/sign-in"
            className="hover:underline underline-offset-8 text-sm"
          >
            {" "}
            Sign in{" "}
          </Link>
          <ThemeToggleBtn />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
