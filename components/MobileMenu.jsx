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
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { LanguagesIcon } from "lucide-react";
import GoogleTranslateComponent from "./GoogleTranslateComponent";

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
            <Link
              href="/my-courses"
              className="hover:underline underline-offset-8"
            >
              My Courses
            </Link>
          </SheetClose>

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

          {/* <SheetClose asChild>
            <Link href="/videos" className="hover:underline underline-offset-8">
              Videos
            </Link>
          </SheetClose> */}
          <SheetClose asChild>
            <Link
              href="/sri-paaduka"
              className="hover:underline underline-offset-8"
            >
              Shri Paaduka
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/sri-upasaka"
              className="hover:underline underline-offset-8"
            >
              Shri Upasaka
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
              Blogs
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

          <SheetClose asChild>
            <Link href="/donate" className="hover:underline underline-offset-8">
              Donate
            </Link>
          </SheetClose>

          <Dialog>
            <DialogTrigger asChild>
              <button className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm">
                <LanguagesIcon />
              </button>
            </DialogTrigger>
            <DialogContent className="w-full flex justify-center">
              <GoogleTranslateComponent className="" />
            </DialogContent>
          </Dialog>
        </div>
      </SheetContent>
    </Sheet>
  );
}
