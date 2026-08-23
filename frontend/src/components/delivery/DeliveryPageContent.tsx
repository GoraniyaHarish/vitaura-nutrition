"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Button } from "@/components/ui/Button";
import { MapPin, Clock, CheckCircle2, XCircle, Loader2, Bike } from "lucide-react";

// ── Delivery page is interactive — must be client component ──
// Note: Metadata cannot be exported from 'use client'. 
// A separate server component wrapper handles metadata.

const OPERATING_HOURS = [
  { day: "Monday – Friday", hours: "8:00 AM – 8:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 7:00 PM" },
  { day: "Sunday", hours: "10:00 AM – 5:00 PM" },
];

type DeliveryResult =
  | { status: "eligible"; zone: string; fee: string; time: string }
  | { status: "ineligible"; message: string }
  | null;

export function DeliveryPageContent() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DeliveryResult>(null);
  const [error, setError] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      // TODO: Connect to backend API /api/delivery/check?pincode=
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await fetch(
        `${apiUrl}/api/delivery/check?pincode=${encodeURIComponent(pincode)}`
      );

      if (!response.ok) {
        throw new Error("Delivery check failed");
      }

      const data = await response.json();

      if (data.available) {
        setResult({
          status: "eligible",
          zone: data.zoneName || "Rajkot Central",
          fee: data.deliveryFee === 0 ? "Free" : `₹${Math.round(data.deliveryFee / 100)}`,
          time: data.estimatedMinutes
            ? `${data.estimatedMinutes} mins`
            : "45 mins",
        });
      } else {
        setResult({
          status: "ineligible",
          message:
            data.message ||
            "We don't deliver to this pincode yet. Pickup is always available!",
        });
      }
    } catch {
      // API not yet available — demo mode
      // DEMO: Simulate response for development
      const DEMO_SERVICEABLE = ["360001", "360002", "360003", "360004", "360005"];
      if (DEMO_SERVICEABLE.includes(pincode)) {
        setResult({
          status: "eligible",
          zone: "Rajkot Central",
          fee: "₹30",
          time: "45 mins",
        });
      } else {
        setResult({
          status: "ineligible",
          message:
            "We don't deliver to this pincode yet. We're expanding soon! Pickup is always available at our Rajkot kitchen.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-gronliv py-10 md:py-16 space-y-12 md:space-y-16">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto">
        <h1
          className="text-display-lg-mobile md:text-display-lg text-[#154212] mb-4"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          FRESHLY MADE IN RAJKOT.
        </h1>
        <p className="text-body-lg text-[#42493e]">
          We prepare your shakes daily in our local kitchen, ensuring maximum
          freshness delivered straight to your door. Check if we deliver to
          your area.
        </p>
      </section>

      {/* Pincode Checker */}
      <section
        className="bg-white rounded-3xl border border-[#c2c9bb]/20 overflow-hidden"
        style={{ boxShadow: "0 4px 24px rgba(27,51,26,0.06)" }}
        aria-label="Delivery eligibility checker"
      >
        <div className="flex flex-col md:flex-row">
          {/* Form */}
          <div className="flex-1 p-8 md:p-10">
            <h2
              className="text-headline-sm text-[#154212] mb-2"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Check Delivery Eligibility
            </h2>
            <p className="text-body-md text-[#42493e] mb-6">
              Enter your 6-digit Rajkot pincode to check delivery availability.
            </p>

            <form onSubmit={handleCheck} noValidate>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#72796e]"
                    size={18}
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setPincode(val);
                      if (error) setError("");
                      if (result) setResult(null);
                    }}
                    placeholder="Enter pincode (e.g. 360001)"
                    className="w-full pl-11 pr-4 py-4 bg-[#fff8f3] border border-[#c2c9bb]/40 rounded-xl text-[#1f1b15] placeholder-[#72796e] focus:outline-none focus:border-[#154212] focus:ring-2 focus:ring-[#154212]/10 text-base transition-all"
                    style={{ fontFamily: "var(--font-merriweather)" }}
                    aria-label="Enter your pincode"
                    aria-describedby={error ? "pincode-error" : undefined}
                  />
                </div>
                <Button
                  type="submit"
                  loading={loading}
                  className="px-6 py-4 rounded-xl"
                  aria-label="Check delivery availability"
                >
                  {loading ? "" : "Check"}
                </Button>
              </div>

              {error && (
                <p
                  id="pincode-error"
                  className="mt-2 text-sm text-[#ba1a1a]"
                  style={{ fontFamily: "var(--font-manrope)" }}
                  role="alert"
                >
                  {error}
                </p>
              )}
            </form>

            {/* Result */}
            {result && (
              <div
                className={`mt-6 p-5 rounded-2xl border flex items-start gap-4 ${
                  result.status === "eligible"
                    ? "bg-[#154212]/5 border-[#154212]/20"
                    : "bg-[#ba1a1a]/5 border-[#ba1a1a]/20"
                }`}
                role="status"
                aria-live="polite"
              >
                {result.status === "eligible" ? (
                  <>
                    <CheckCircle2
                      size={24}
                      className="text-[#154212] flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p
                        className="font-bold text-[#154212] mb-1"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        Great news! We deliver to {pincode}.
                      </p>
                      <div className="flex gap-4 text-sm text-[#42493e]" style={{ fontFamily: "var(--font-manrope)" }}>
                        <span>📍 Zone: {result.zone}</span>
                        <span>🛵 {result.time}</span>
                        <span>💰 Delivery: {result.fee}</span>
                      </div>
                      <Link
                        href="/menu"
                        className="inline-block mt-3 bg-[#154212] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#2d5a27] transition-colors"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        Order Now →
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle
                      size={24}
                      className="text-[#ba1a1a] flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p
                        className="font-bold text-[#1f1b15] mb-1"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        Not available for delivery yet.
                      </p>
                      <p className="text-sm text-[#42493e]">
                        {result.message}
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Map Placeholder */}
          <div className="md:w-2/5 relative min-h-[250px] md:min-h-0 bg-[#eae1d7] flex items-center justify-center">
            <Image
              src="/images/rajkot-map.jpg"
              alt="Rajkot city map showing GronLiv delivery zones"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent md:block hidden" />
            <div className="relative z-10 text-center p-6">
              <MapPin size={48} className="text-[#154212] mx-auto mb-2 drop-shadow-md" />
              <p
                className="text-[#154212] font-bold text-sm"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Rajkot, Gujarat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Hours */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className="bg-white rounded-3xl p-8 border border-[#c2c9bb]/20"
          style={{ boxShadow: "0 4px 12px rgba(27,51,26,0.04)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#154212]/10 rounded-full flex items-center justify-center">
              <Clock size={20} className="text-[#154212]" />
            </div>
            <h2
              className="text-headline-sm text-[#154212]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Operating Hours
            </h2>
          </div>
          {/* DEMO: Replace with real operating hours */}
          <div className="space-y-4">
            {OPERATING_HOURS.map(({ day, hours }) => (
              <div
                key={day}
                className="flex justify-between items-center py-3 border-b border-[#c2c9bb]/20 last:border-0"
              >
                <span className="text-body-md text-[#42493e]">{day}</span>
                <span
                  className="text-label-md text-[#154212]"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {hours}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#72796e]" style={{ fontFamily: "var(--font-manrope)" }}>
            ⚠️ Demo hours — confirm actual hours before launch
          </p>
        </div>

        {/* Pickup Info */}
        <div
          className="bg-[#154212] rounded-3xl p-8 text-white"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bike size={20} />
            </div>
            <h2
              className="text-headline-sm"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Pickup Available
            </h2>
          </div>
          <p className="text-white/90 text-body-md mb-6">
            Can&apos;t get delivery? Pick up your order directly from our Rajkot
            kitchen. Order ahead and collect at your convenience.
          </p>
          <ul className="space-y-3 mb-6">
            {[
              "Order online, pick up ready in 20 mins",
              "No delivery fee for pickup",
              "Same fresh quality",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#a1d494] flex-shrink-0" />
                <span className="text-white/90 text-sm" style={{ fontFamily: "var(--font-manrope)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#154212] text-label-md px-6 py-3 rounded-xl font-bold hover:bg-[#f0e7dd] transition-colors"
          >
            Get Directions →
          </Link>
        </div>
      </section>
    </div>
  );
}
