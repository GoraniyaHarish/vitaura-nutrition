import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact GronLiv — Get in Touch",
  description:
    "Have a question about GronLiv? Contact us via our form, WhatsApp, or email. We'd love to hear from you.",
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
