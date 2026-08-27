import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MenuPageContent } from "@/components/menu/MenuPageContent";

export const metadata: Metadata = {
  title: "Our Formulations — Chef-Crafted Shakes, Bowls & Bites",
  description:
    "Explore Vitaura's chef-crafted protein shakes, organic wellness bowls, and nutrient-dense power bites made from 100% whole, clean ingredients.",
  openGraph: {
    title: "Vitaura Menu — Pure Nutrition Formulations",
    description:
      "Chef-crafted protein shakes, organic wellness bowls, and power bites made from 100% clean ingredients.",
  },
};

export default function MenuPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow pb-20 md:pb-0">
        <MenuPageContent />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
