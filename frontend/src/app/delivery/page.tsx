import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { DeliveryPageContent } from "@/components/delivery/DeliveryPageContent";

export const metadata: Metadata = {
  title: "Delivery & Pickup — Rajkot Delivery Zones",
  description:
    "Check if GronLiv delivers to your Rajkot pincode. Same-day delivery available across Rajkot. Pickup also available from our kitchen.",
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
