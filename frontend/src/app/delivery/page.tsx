import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { DeliveryPageContent } from "@/components/delivery/DeliveryPageContent";

export const metadata: Metadata = {
  title: "Cold-Chain Delivery & Pickup — Vitaura Nutrition",
  description:
    "Check if Vitaura delivers to your pincode. Direct cold-chain delivery and artisan kitchen pickup available.",
};

export default function DeliveryPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow pb-20 md:pb-0">
        <DeliveryPageContent />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
