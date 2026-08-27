import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  title: "Terms of Service — Vitaura Nutrition",
  description: "Terms and conditions governing the purchase and delivery of Vitaura clean nutrition products.",
};

export default function TermsPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow pb-20 md:pb-12 bg-transparent">
        <div className="container-vitaura py-10 md:py-16 max-w-4xl mx-auto">
          <div className="bg-[#1A1412]/85 backdrop-blur-xl rounded-3xl p-6 md:p-12 border border-white/10 shadow-2xl space-y-8 text-[#F7F2EA]">
            <div>
              <span className="text-xs font-bold text-[#C87D55] uppercase tracking-widest font-sans block mb-2">
                Legal & Governance
              </span>
              <h1
                className="text-3xl md:text-5xl font-light text-[#F7F2EA] tracking-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Terms of Service
              </h1>
              <p className="text-xs text-[#91857B] font-sans mt-2">
                Last updated: August 2026
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-[#F7F2EA] font-serif" style={{ fontFamily: "var(--font-serif)" }}>1. General Terms</h2>
              <p className="text-sm text-[#C8BDB2] leading-relaxed font-sans">
                By accessing or placing an order with Vitaura Nutrition, you agree to be bound by these Terms of Service. Vitaura provides chef-crafted protein shakes, organic wellness bowls, and power bites made from 100% whole, clean ingredients.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-[#F7F2EA] font-serif" style={{ fontFamily: "var(--font-serif)" }}>2. Fresh Formulation Policy</h2>
              <p className="text-sm text-[#C8BDB2] leading-relaxed font-sans">
                Because our nutrition formulations are small-batch crafted with perishable superfood ingredients, orders enter preparation shortly after placement. Cancellations must be submitted prior to cold-chain dispatch.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-[#F7F2EA] font-serif" style={{ fontFamily: "var(--font-serif)" }}>3. Delivery & Cold-Chain Protocol</h2>
              <p className="text-sm text-[#C8BDB2] leading-relaxed font-sans">
                Delivery timelines are estimates subject to weather and local zone routing. Customers are requested to receive cold-chain items promptly upon arrival to maintain ideal temperature freshness.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-[#F7F2EA] font-serif" style={{ fontFamily: "var(--font-serif)" }}>4. Contact Information</h2>
              <p className="text-sm text-[#C8BDB2] leading-relaxed font-sans">
                Questions regarding our terms or service conditions can be sent to <strong className="text-[#F7F2EA]">concierge@vitauranutrition.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
