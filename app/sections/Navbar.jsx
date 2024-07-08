import globalData from "@/app/data";
import GoogleTranslateComponent from "@/components/GoogleTranslateComponent";
import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggleBtn } from "@/components/ThemeToggleBtn";
import { SignedIn, UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { dynamic } from "next/dynamic";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LanguagesIcon } from "lucide-react";

async function Navbar() {
  const user = await currentUser();
  // dynamically importing the
  // <GoogleTranslateComponent />;

  return (
    <>
      <nav className="fixed z-[10] top-0 w-full backdrop-blur-3xl  border bg-yellow-50 dark:bg-[#291600]/50">
        <div className="container px-4 py-3 items-center flex justify-between">
          <div className="flex gap-4 items-center">
            <div className="flex lg:hidden">
              <MobileMenu />
            </div>
            <Link href="/">
              <img
                src={`${globalData?.logoLink}`}
                alt="logo"
                width={50}
                height={50}
              />
            </Link>
          </div>
          <div className="hidden lg:flex gap-6 items-center">
            <SignedIn>
              <Link
                href="/my-courses"
                className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
              >
                My Courses
              </Link>
            </SignedIn>

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
              href="/about-sadhguru"
              className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
            >
              About SadhguruShri
            </Link>
            <Link
              href="/courses"
              className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
            >
              Courses
            </Link>
            <Link
              href="/events"
              className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
            >
              Events
            </Link>
            <Link
              href="/sri-paaduka"
              className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
            >
              Shri Paaduka
            </Link>
            <Link
              href="/sri-upasaka"
              className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
            >
              Shri Upasaka
            </Link>
            <Link
              href="/contact-us"
              className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
            >
              Contact Us
            </Link>
            <Link
              href="/quotes"
              className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
            >
              Quotes
            </Link>
            <Link
              href="/donate"
              className="text-muted-foreground hover:text-primary hover:underline underline-offset-8 duration-100 text-sm"
            >
              Donate
            </Link>
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
            {/* <DropdownMenu>
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
                <Link href="/quotes" className="flex items-center gap-2">
                  <RiDoubleQuotesL />
                  Quotes
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/videos" className="flex items-center gap-2">
                  <IoIosPeople />
                  Videos
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/donate" className="flex items-center gap-2">
                  <BiDonateHeart />
                  Donate
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
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
    </>
  );
}

export default Navbar;
