import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MenuPageContent } from "@/components/menu/MenuPageContent";

export const metadata: Metadata = {
  title: "Our Menu — Fresh Nutrition Shakes & Bowls",
  description:
    "Browse GronLiv's fresh nutrition shakes and bowls. Made daily in Rajkot with real ingredients. No preservatives. Order now for delivery across Rajkot.",
  openGraph: {
    title: "GronLiv Menu — Fresh Nutrition Shakes",
    description:
      "Browse our freshly prepared nutrition shakes and bowls. Made daily in Rajkot.",
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
