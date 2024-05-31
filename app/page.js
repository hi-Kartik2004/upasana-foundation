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
import Head from "next/head";

export default function Home() {
  return (
    <main className="relative">
      <Head>
        <title>Upasana Foundation</title>
        <meta
          name="description"
          content="Swastha Vyakthi, Swastha Kutumba, Swastha Samaja, through Sadhana, Seva and Love. Learn the Secrets of a Meaningful Life , Find yourself a new Spiritual Path to See and Live Life , under the Divine Grace of SadhguruShri
          "
        />
        <meta
          name="keywords"
          content="Upasana Foundation, Upasana, Sadhguru Shri Rama, Sadhguru, Indian Mystic, Kundalini Yogi, Spiritual Master, About Sadhguru Shri, Sadhana, Spiritual experience, Shri Upasaka, Upasana foundation, Volunteering, Sadhguru Shri Rama, Donatation Upasana foundation, Donate"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="upasana foundation" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
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
