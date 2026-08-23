import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  title: "Terms of Service — GronLiv",
  description: "Terms and conditions governing the purchase and delivery of GronLiv fresh organic nutrition products.",
};

export default function TermsPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow pb-20 md:pb-12 bg-[#FAF8F5]">
        <div className="container-gronliv py-10 md:py-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 md:p-12 border border-[#183324]/10 shadow-xs space-y-8 text-[#171D19]">
            <div>
              <span className="text-xs font-bold text-[#C8A265] uppercase tracking-widest font-manrope block mb-2">
                Legal & Governance
              </span>
              <h1
                className="text-3xl md:text-4xl font-extrabold text-[#112419]"
                style={{ fontFamily: "var(--font-merriweather)" }}
              >
                Terms of Service
              </h1>
              <p className="text-xs text-[#48544D] font-manrope mt-2">
                Last updated: August 23, 2026
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#112419] font-manrope">1. General Terms</h2>
              <p className="text-body-md text-[#48544D] leading-relaxed font-merriweather">
                By accessing or placing an order on GronLiv, you agree to be bound by these Terms of Service. GronLiv provides freshly prepared nutrition shakes and superfood products delivered across serviceable zones in Rajkot, Gujarat.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#112419] font-manrope">2. Fresh Prepared Order Policy</h2>
              <p className="text-body-md text-[#48544D] leading-relaxed font-merriweather">
                Because our nutrition products are freshly prepared with perishable organic ingredients, orders enter preparation shortly after placement. Cancellations must be requested prior to cold-chain dispatch.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#112419] font-manrope">3. Delivery & Service Availability</h2>
              <p className="text-body-md text-[#48544D] leading-relaxed font-merriweather">
                Delivery timelines (typically 45 minutes) are estimates subject to weather, traffic, and local pincode serviceability. Customers are requested to ensure availability to receive cold-chain items promptly upon arrival.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#112419] font-manrope">4. Contact Information</h2>
              <p className="text-body-md text-[#48544D] leading-relaxed font-merriweather">
                Questions regarding our terms or service conditions can be sent to <strong className="text-[#112419]">hello@gronliv.com</strong>.
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
