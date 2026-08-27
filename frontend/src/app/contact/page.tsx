import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Concierge — Vitaura Nutrition",
  description:
    "Have a question about Vitaura Nutrition? Contact our concierge via inquiry form, direct WhatsApp, or email.",
};

export default function ContactPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow pb-20 md:pb-0">
        <ContactPageContent />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
