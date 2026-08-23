import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Leaf, Clock, Heart, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About GronLiv — Our Story",
  description:
    "GronLiv started with a simple belief: nutrition should feel real, taste good, and fit into everyday life. Made fresh daily in Rajkot, Gujarat.",
};

const VALUES = [
  {
    icon: Leaf,
    title: "100% Fresh",
    description:
      "Every shake is prepared fresh to order. We never pre-mix or store finished products.",
  },
  {
    icon: Star,
    title: "Real Ingredients",
    description:
      "Premium quality ingredients — no artificial preservatives, no hidden sugars, no compromises.",
  },
  {
    icon: Clock,
    title: "Made Daily",
    description:
      "Our kitchen operates fresh every day. What you receive was made specifically for you.",
  },
  {
    icon: Heart,
    title: "Local Rajkot",
    description:
      "Rooted in Rajkot, built for Rajkot. We're your neighbourhood nutrition kitchen.",
  },
];

// Bento grid ingredients — for illustration
const INGREDIENTS = [
  { name: "Fresh Berries", src: "/images/ingredients/berries.jpg", span: "col-span-2 row-span-2", label: "Seasonal Fruits" },
  { name: "Almonds", src: "/images/ingredients/almonds.jpg", span: "col-span-1", label: "Nuts & Seeds" },
  { name: "Dark Cacao", src: "/images/ingredients/cacao.jpg", span: "col-span-1", label: "Raw Cacao" },
  { name: "Dates", src: "/images/ingredients/dates.jpg", span: "col-span-2", label: "Crafted Daily" },
];

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow pb-20 md:pb-0">
        {/* ── Hero ── */}
        <section className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/about-hero.jpg"
              alt="Fresh ingredients beautifully arranged — the GronLiv philosophy"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#154212]/50" />
          </div>
          <div className="relative z-10 text-center px-5 md:px-16 max-w-4xl mx-auto">
            <span
              className="inline-block px-4 py-1.5 mb-6 bg-white/20 backdrop-blur-sm text-white/90 text-sm font-semibold tracking-widest rounded-full border border-white/30"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              OUR STORY
            </span>
            <h1
              className="text-display-lg-mobile md:text-display-lg text-white mb-6 drop-shadow-sm"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              NUTRITION SHOULD FEEL REAL.
            </h1>
            <p className="text-body-lg text-white/90 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-black/20 p-6 rounded-2xl">
              We believe that eating well shouldn&apos;t be a compromise. It
              should be a celebration of nature, flavor, and vitality. Welcome
              to GronLiv — where everyday nutrition meets genuine quality.
            </p>
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="py-16 md:py-24 container-gronliv">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <h2
                className="text-headline-md text-[#154212]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Rooted in Rajkot, Designed for Life.
              </h2>
              <p className="text-body-md text-[#42493e] leading-relaxed">
                GronLiv started with a simple question: why is convenient food
                rarely real, and real food rarely convenient? Our mission is to
                bridge that gap — bringing freshly prepared, genuinely
                nourishing shakes directly to the people of Rajkot.
              </p>
              <p className="text-body-md text-[#42493e] leading-relaxed">
                Every shake is prepared fresh in our local kitchen using premium
                ingredients. We source with care, prepare with intention, and
                deliver with pride.
              </p>

              {/* Freshness Philosophy Card */}
              <div className="flex items-start gap-4 p-6 bg-[#fbf2e8] rounded-2xl border border-[#c2c9bb]/30">
                <div className="w-12 h-12 bg-[#154212] rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="text-white" size={20} />
                </div>
                <div>
                  <h3
                    className="text-headline-sm text-[#1f1b15] mb-2"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    The Freshness Philosophy
                  </h3>
                  <p className="text-body-md text-[#42493e]">
                    No artificial preservatives, no hidden sugars. Just vibrant,
                    nutrient-dense ingredients acting exactly as nature intended.
                  </p>
                </div>
              </div>
            </div>

            {/* Brand Image */}
            <div className="relative order-1 md:order-2">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/about-kitchen.jpg"
                  alt="GronLiv fresh preparation — real ingredients being blended in our Rajkot kitchen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Floating label */}
              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white p-4 rounded-2xl shadow-lg border border-[#c2c9bb]/20">
                <p
                  className="text-xs text-[#154212] font-bold tracking-widest mb-1"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  FRESH DAILY
                </p>
                <p
                  className="text-sm text-[#1f1b15] font-semibold"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Made in Rajkot 🧋
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-16 md:py-20 bg-[#fbf2e8]">
          <div className="container-gronliv">
            <div className="text-center mb-12">
              <h2
                className="text-headline-md text-[#154212] mb-4"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                What We Stand For
              </h2>
              <p className="text-body-lg text-[#42493e] max-w-2xl mx-auto">
                Four pillars guide everything we do at GronLiv.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white p-6 rounded-2xl border border-[#c2c9bb]/20 text-center"
                  style={{ boxShadow: "0 4px 12px rgba(27,51,26,0.04)" }}
                >
                  <div className="w-14 h-14 bg-[#154212]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-[#154212]" />
                  </div>
                  <h3
                    className="text-headline-sm text-[#1f1b15] mb-3"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-body-md text-[#42493e]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Ingredient Gallery — "Nothing to Hide" ── */}
        <section className="py-16 md:py-24 container-gronliv">
          <div className="text-center mb-12">
            <h2
              className="text-display-lg-mobile md:text-headline-md text-[#154212] mb-4"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Nothing to Hide.
            </h2>
            <p className="text-body-lg text-[#42493e] max-w-2xl mx-auto">
              Explore the real, vibrant ingredients that power our menu. Sourced
              responsibly, prepared with care.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:h-[500px]">
            {/* Large featured */}
            <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-3xl">
              <Image
                src="/images/ingredients/fresh-produce.jpg"
                alt="Fresh produce — the foundation of every GronLiv shake"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="inline-block px-3 py-1 mb-2 bg-[#2d5a27] text-white text-xs font-bold rounded-full tracking-widest">
                  LOCAL SOURCE
                </span>
                <h3
                  className="text-white text-2xl font-bold"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Premium Produce
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  Fresh ingredients prepared every morning.
                </p>
              </div>
            </div>

            {/* Small items */}
            <div className="relative group overflow-hidden rounded-3xl aspect-square md:aspect-auto">
              <Image
                src="/images/ingredients/nuts.jpg"
                alt="Premium nuts and seeds"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3
                  className="text-white font-bold text-lg"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Nuts & Seeds
                </h3>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-3xl aspect-square md:aspect-auto">
              <Image
                src="/images/ingredients/cacao.jpg"
                alt="Raw cacao — rich in antioxidants"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3
                  className="text-white font-bold text-lg"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Raw Cacao
                </h3>
              </div>
            </div>

            <div className="col-span-2 relative group overflow-hidden rounded-3xl aspect-video md:aspect-auto">
              <Image
                src="/images/about-crafted.jpg"
                alt="GronLiv shakes being freshly crafted in our Rajkot kitchen"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3
                  className="text-white font-bold text-xl"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Crafted Daily
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  Prepared fresh in our Rajkot hub every morning.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
