import { ThemeToggleBtn } from "@/components/ThemeToggleBtn";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroSection from "./sections/HeroSection";
import FourCardFeaturesSection from "./sections/FourCardFeaturesSection";
import MoreFeaturesSection from "./sections/MoreFeaturesSection";
import SplitFeaturesSection from "./sections/SplitFeaturesSection";
import HeroContentsSection from "./sections/HeroContentsSection";
import HeroBlogSection from "./sections/HeroBlogSection";
import { FaqSection } from "./sections/FaqSection";
import StatsSection from "./sections/StatsSection";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { BiLogoWhatsapp } from "react-icons/bi";
import HeroDialog from "@/components/HeroDialog";
import globalData from "@/app/data";
import { SignedOut } from "@clerk/nextjs";
import FeaturedCourse from "@/components/FeaturedCourse";

export default function Home() {
  return (
    <main className="relative">
      <SignedOut>
        <HeroDialog videoUrl={globalData?.heroDialogVideoLink} />
      </SignedOut>
      <FeaturedCourse />
      <HeroSection />
      <Separator />
      <HeroContentsSection />
      <Separator />
      <FourCardFeaturesSection />
      <Separator />
      <SplitFeaturesSection />
      <Separator />
      <HeroBlogSection />
      <Separator />
      <FaqSection />
      <Separator />
      <StatsSection />
      <Separator />
    </main>
  );
}
