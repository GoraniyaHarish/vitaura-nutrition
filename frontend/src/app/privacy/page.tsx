import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  title: "Privacy Policy — Vitaura Nutrition",
  description: "Learn how Vitaura Nutrition collects, uses, and protects your personal data when ordering our clean nutrition products.",
};

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-xs text-[#91857B] font-sans mt-2">
                Last updated: August 2026
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-[#F7F2EA] font-serif" style={{ fontFamily: "var(--font-serif)" }}>1. Information We Collect</h2>
              <p className="text-sm text-[#C8BDB2] leading-relaxed font-sans">
                When you place an order or contact Vitaura Nutrition, we collect minimal necessary information including your name, delivery address, phone number, email address, and formulation selections to fulfill direct cold-chain delivery.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-[#F7F2EA] font-serif" style={{ fontFamily: "var(--font-serif)" }}>2. How We Use Your Data</h2>
              <p className="text-sm text-[#C8BDB2] leading-relaxed font-sans">
                Your personal data is strictly used for order fulfillment, cold-chain status updates, customer concierge inquiries, and service enhancements. We never sell, rent, or trade customer information to third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-[#F7F2EA] font-serif" style={{ fontFamily: "var(--font-serif)" }}>3. Payment & Security</h2>
              <p className="text-sm text-[#C8BDB2] leading-relaxed font-sans">
                All transactions are processed securely through certified payment gateways with full encryption. Vitaura does not store raw credit card numbers or banking credentials.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-[#F7F2EA] font-serif" style={{ fontFamily: "var(--font-serif)" }}>4. Contact & Inquiries</h2>
              <p className="text-sm text-[#C8BDB2] leading-relaxed font-sans">
                For privacy inquiries or data requests, please contact our concierge team at <strong className="text-[#F7F2EA]">concierge@vitauranutrition.com</strong>.
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
