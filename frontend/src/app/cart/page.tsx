import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Your Cart — GronLiv",
  description: "Review your GronLiv order and place your demo order.",
};

export default function CartPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow pb-20 md:pb-0">
        <CartPageContent />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
