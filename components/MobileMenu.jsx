import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IoIosMenu size={27} />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Mobile Menu</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 items-center justify-center mt-6">
          <SheetClose asChild>
            <Link href="/" className="hover:underline underline-offset-8">
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/about-us"
              className="hover:underline underline-offset-8"
            >
              About us
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/courses"
              className="hover:underline underline-offset-8"
            >
              Courses
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/my-courses"
              className="hover:underline underline-offset-8"
            >
              My Courses
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/videos" className="hover:underline underline-offset-8">
              Videos
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/sri-paaduka"
              className="hover:underline underline-offset-8"
            >
              Sri Paaduka
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/sri-upasaka"
              className="hover:underline underline-offset-8"
            >
              Sri Upasaka
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/about-sadhguru"
              className="hover:underline underline-offset-8"
            >
              About Sadhguru Shri
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/quotes" className="hover:underline underline-offset-8">
              Quotes
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/events" className="hover:underline underline-offset-8">
              Events
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href="/contact-us"
              className="hover:underline underline-offset-8"
            >
              Contact us
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
