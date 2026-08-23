import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  title: "Privacy Policy — GronLiv",
  description: "Learn how GronLiv collects, uses, and protects your personal data when ordering our fresh nutrition products.",
};

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-xs text-[#48544D] font-manrope mt-2">
                Last updated: August 23, 2026
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#112419] font-manrope">1. Information We Collect</h2>
              <p className="text-body-md text-[#48544D] leading-relaxed font-merriweather">
                When you place an order or contact GronLiv, we collect minimal necessary information including your name, delivery address, phone number, email address, and order selections to fulfill cold-chain delivery within Rajkot, Gujarat.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#112419] font-manrope">2. How We Use Your Data</h2>
              <p className="text-body-md text-[#48544D] leading-relaxed font-merriweather">
                Your personal data is strictly used for order processing, customer delivery updates, support inquiries, and improving our kitchen services. We do not sell, rent, or trade customer personal information to third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#112419] font-manrope">3. Payment & Financial Security</h2>
              <p className="text-body-md text-[#48544D] leading-relaxed font-merriweather">
                All digital transactions are processed securely through certified payment gateways. GronLiv does not store raw credit card numbers or UPI PINs on our servers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#112419] font-manrope">4. Contact & Grievance Officer</h2>
              <p className="text-body-md text-[#48544D] leading-relaxed font-merriweather">
                For any privacy concerns, data deletion requests, or grievances, please contact our support team at <strong className="text-[#112419]">hello@gronliv.com</strong> or via WhatsApp support.
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
