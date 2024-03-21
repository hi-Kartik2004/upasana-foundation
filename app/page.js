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

export default function Home() {
  return (
    <main className="relative">
      <div className="fixed left-4 bottom-4 z-50">
        <Link target="_blank" href={`https://wa.me/${"+919482330850"}`}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBuTSKJXT0jrs3q-rT87uhekCyyWY_FX_RC5CK4O0IDA&s"
            className="max-w-[50px] rounded-full"
            alt="whatsapp-floating-btn"
          />
        </Link>
      </div>
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
