"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, CheckCircle2, XCircle, Bike } from "lucide-react";

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
      const apiUrl =
        process.env.NEXT_PUBLIC_VITAURA_API_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:8080";
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
          zone: data.zoneName || "Vitaura Express Zone",
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
      // Demo mode fallback
      const DEMO_SERVICEABLE = ["360001", "360002", "360003", "360004", "360005"];
      if (DEMO_SERVICEABLE.includes(pincode)) {
        setResult({
          status: "eligible",
          zone: "Vitaura Express Zone",
          fee: "₹30",
          time: "45 mins",
        });
      } else {
        setResult({
          status: "ineligible",
          message:
            "We don't deliver to this pincode yet. We're expanding soon! Pickup is always available at our artisan kitchen.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-vitaura py-10 md:py-16 space-y-12 md:space-y-16 bg-transparent">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#C87D55] uppercase tracking-widest block mb-2 font-sans">
          COLD-CHAIN DISPATCH
        </span>
        <h1
          className="text-3xl sm:text-5xl font-light text-[#F7F2EA] mb-4 tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Fresh Direct Delivery.
        </h1>
        <p className="text-base text-[#C8BDB2] font-sans leading-relaxed">
          We prepare your shakes, wellness bowls, and power bites fresh in our kitchen, ensuring maximum
          vitality delivered cold to your door. Check if we deliver to your area.
        </p>
      </section>

      {/* Pincode Checker */}
      <section
        className="bg-[#1A1412]/85 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
        aria-label="Delivery eligibility checker"
      >
        <div className="flex flex-col md:flex-row">
          {/* Form */}
          <div className="flex-1 p-8 md:p-10">
            <h2
              className="text-2xl font-light text-[#F7F2EA] mb-2 font-serif"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Check Delivery Eligibility
            </h2>
            <p className="text-sm text-[#C8BDB2] mb-6 font-sans">
              Enter your 6-digit pincode to verify active cold-chain delivery service.
            </p>

            <form onSubmit={handleCheck} noValidate>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91857B]"
                    size={16}
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
                    className="w-full pl-11 pr-4 py-3.5 bg-[#211B18] border border-white/10 rounded-full text-[#F7F2EA] placeholder-[#91857B] focus:outline-none focus:border-[#C87D55] text-xs sm:text-sm transition-all font-sans"
                    aria-label="Enter your pincode"
                    aria-describedby={error ? "pincode-error" : undefined}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-3.5 rounded-full bg-[#C87D55] text-[#12100F] hover:bg-[#E09A72] border border-[#E09A72]/40 font-bold uppercase tracking-widest text-xs font-sans cursor-pointer shadow-md shrink-0"
                  aria-label="Check delivery availability"
                >
                  {loading ? "Checking..." : "Verify"}
                </button>
              </div>

              {error && (
                <p
                  id="pincode-error"
                  className="mt-2 text-xs text-red-400 font-sans"
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
                    ? "bg-[#211B18] border-[#6D9B79]/40"
                    : "bg-red-950/40 border-red-800/60"
                }`}
                role="status"
                aria-live="polite"
              >
                {result.status === "eligible" ? (
                  <>
                    <CheckCircle2
                      size={22}
                      className="text-[#6D9B79] flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p
                        className="font-semibold text-[#F7F2EA] mb-1 font-serif text-base"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        Great news! Cold-chain dispatch is active for {pincode}.
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-[#C8BDB2] font-sans">
                        <span>📍 Zone: {result.zone}</span>
                        <span>🛵 {result.time}</span>
                        <span>💰 Delivery: {result.fee}</span>
                      </div>
                      <Link
                        href="/menu"
                        className="inline-block mt-3 bg-[#C87D55] text-[#12100F] text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#E09A72] transition-colors font-sans uppercase tracking-widest border border-[#E09A72]/40 shadow-md"
                      >
                        Order Formulations →
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle
                      size={22}
                      className="text-red-400 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p
                        className="font-semibold text-[#F7F2EA] mb-1 font-sans text-sm"
                      >
                        Not available for direct delivery yet.
                      </p>
                      <p className="text-xs text-[#C8BDB2] font-sans">
                        {result.message}
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Map Image */}
          <div className="md:w-2/5 relative min-h-[250px] md:min-h-0 bg-[#211B18] flex items-center justify-center border-t md:border-t-0 md:border-l border-white/10">
            <Image
              src="/images/rajkot-map.jpg"
              alt="Vitaura direct delivery service map"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="relative z-10 text-center p-5 bg-[#12100F]/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/15">
              <MapPin size={28} className="text-[#C87D55] mx-auto mb-1 drop-shadow-sm" />
              <p
                className="text-[#F7F2EA] font-bold text-xs font-sans uppercase tracking-widest"
              >
                Artisan Kitchen Hub
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Hours & Pickup */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className="bg-[#1A1412]/85 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#211B18] rounded-full flex items-center justify-center text-[#C87D55] border border-white/10">
              <Clock size={18} />
            </div>
            <h2
              className="text-xl font-semibold text-[#F7F2EA] font-serif"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Operating Hours
            </h2>
          </div>
          <div className="space-y-4">
            {OPERATING_HOURS.map(({ day, hours }) => (
              <div
                key={day}
                className="flex justify-between items-center py-3 border-b border-white/10 last:border-0"
              >
                <span className="text-sm text-[#C8BDB2] font-sans">{day}</span>
                <span
                  className="text-sm font-bold text-[#F7F2EA] font-sans"
                >
                  {hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pickup Info */}
        <div className="bg-[#211B18]/85 backdrop-blur-xl rounded-3xl p-8 text-[#F7F2EA] border border-white/15 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-[#C87D55] border border-white/15">
              <Bike size={18} />
            </div>
            <h2
              className="text-xl font-light font-serif text-[#F7F2EA]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Artisan Pickup Available
            </h2>
          </div>
          <p className="text-[#C8BDB2] text-sm mb-6 font-sans leading-relaxed">
            Can&apos;t get direct delivery? Pick up your order directly from our
            artisan kitchen. Order ahead and collect at your convenience.
          </p>
          <ul className="space-y-3 mb-6">
            {[
              "Order online, ready in 20 minutes",
              "Zero delivery fee for direct pickup",
              "Guaranteed small-batch freshness",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-[#C87D55] flex-shrink-0" />
                <span className="text-[#F7F2EA] text-xs font-sans">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="inline-block bg-[#C87D55] text-[#12100F] text-xs uppercase tracking-widest px-6 py-3 rounded-full font-bold hover:bg-[#E09A72] transition-all font-sans shadow-md border border-[#E09A72]/40"
          >
            Get Directions →
          </Link>
        </div>
      </section>
    </div>
  );
}
