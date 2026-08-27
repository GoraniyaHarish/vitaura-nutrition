import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Leaf, Clock, Heart, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About Vitaura Nutrition — Pure Superfoods. Chef-Crafted Daily.",
  description:
    "Vitaura is a private culinary atelier offering chef-crafted protein shakes, organic wellness bowls, and nutrient-dense power bites made from 100% whole, clean superfoods.",
};

const VALUES = [
  {
    icon: Leaf,
    title: "100% Whole Superfoods",
    description:
      "Every formulation begins with unrefined whole foods, cold-pressed botanicals, raw nuts, and sprouted seeds.",
  },
  {
    icon: Star,
    title: "Clean Label Integrity",
    description:
      "Zero refined sugars, artificial preservatives, synthetic gums, or chemical fillers. Ever.",
  },
  {
    icon: Clock,
    title: "Chef-Crafted Daily",
    description:
      "Small-batch culinary preparation ensures peak nutrient bioavailability, exquisite aroma, and velvety texture.",
  },
  {
    icon: Heart,
    title: "Cold-Chain Freshness",
    description:
      "Protected temperature-monitored dispatch delivers peak enzymatic vitality directly from our kitchen to your doorstep.",
  },
];

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow pb-20 md:pb-0 bg-transparent">
        {/* ── Hero ── */}
        <section className="relative w-full min-h-[60vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/about-hero.jpg"
              alt="Vitaura Nutrition whole superfood ingredients"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#12100F]/80 backdrop-blur-[1px]" />
          </div>
          <div className="relative z-10 text-center px-5 md:px-16 max-w-4xl mx-auto">
            <span
              className="inline-block px-4 py-1.5 mb-6 bg-white/10 backdrop-blur-md text-[#C87D55] text-xs font-bold uppercase tracking-widest rounded-full border border-white/15 font-sans"
            >
              OUR PHILOSOPHY
            </span>
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-light text-[#F7F2EA] mb-6 drop-shadow-sm tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Pure Superfoods. <br />
              <span className="text-[#C87D55] italic">Chef-Crafted Daily.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#C8BDB2] max-w-2xl mx-auto leading-relaxed backdrop-blur-md bg-[#12100F]/70 p-6 rounded-2xl font-sans border border-white/10">
              We believe that eating well shouldn&apos;t be a compromise between vitality and gastronomic excellence.
              Vitaura is where uncompromised culinary artistry meets clean, whole-ingredient nutrition.
            </p>
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="py-20 md:py-32 container-vitaura">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <span className="text-xs font-bold text-[#C87D55] uppercase tracking-widest font-sans">
                THE ATELIER STANDARD
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F2EA] leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Crafted for Vitality. Designed for Life.
              </h2>
              <p className="text-base text-[#C8BDB2] leading-relaxed font-sans font-normal">
                Vitaura was founded with a single uncompromising mission: to create clean, nutrient-dense nutrition products that elevate everyday living without artificial shortcuts.
              </p>
              <p className="text-base text-[#C8BDB2] leading-relaxed font-sans font-normal">
                From our ceremonial matcha shakes and raw cacao blends to our organic wellness bowls and cold-pressed protein bars, each recipe is developed in small batches with strict culinary precision.
              </p>

              {/* Freshness Philosophy Card */}
              <div className="flex items-start gap-4 p-6 bg-[#1A1412] rounded-3xl border border-white/10 shadow-xs">
                <div className="w-12 h-12 bg-[#211B18] rounded-full flex items-center justify-center flex-shrink-0 text-[#C87D55] border border-white/10">
                  <Leaf size={20} />
                </div>
                <div>
                  <h3
                    className="text-lg text-[#F7F2EA] mb-1 font-serif font-semibold"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    100% Clean Label Commitment
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C8BDB2] font-sans">
                    Every ingredient is selected for its bioactive value, pure flavor profile, and clean origin.
                  </p>
                </div>
              </div>
            </div>

            {/* Brand Image */}
            <div className="relative order-1 md:order-2">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="/images/kitchen.jpg"
                  alt="Vitaura artisan kitchen preparation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Floating label */}
              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-[#12100F]/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/15">
                <p
                  className="text-[10px] text-[#C87D55] font-extrabold tracking-widest mb-0.5 font-sans uppercase"
                >
                  SMALL BATCH
                </p>
                <p
                  className="text-sm text-[#F7F2EA] font-semibold font-serif"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Artisan Kitchen
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-20 md:py-28 bg-[#1A1412] border-y border-white/10">
          <div className="container-vitaura">
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-[#C87D55] uppercase tracking-widest font-sans block mb-2">
                OUR PILLARS
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F2EA] mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                What We Stand For
              </h2>
              <p className="text-base text-[#C8BDB2] max-w-2xl mx-auto font-sans">
                Four guiding principles form the bedrock of the Vitaura standard.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-[#211B18] p-6 rounded-3xl border border-white/10 text-center shadow-xs"
                >
                  <div className="w-13 h-13 bg-[#12100F] rounded-full flex items-center justify-center mx-auto mb-4 text-[#C87D55] border border-white/10">
                    <Icon size={22} />
                  </div>
                  <h3
                    className="text-lg font-semibold text-[#F7F2EA] mb-2 font-serif"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[#C8BDB2] font-sans text-xs sm:text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Ingredient Sourcing ── */}
        <section className="py-20 md:py-32 container-vitaura">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#C87D55] uppercase tracking-widest font-sans block mb-2">
              TRANSPARENCY
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F2EA] mb-4 tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Nothing to Hide. Everything to Love.
            </h2>
            <p className="text-base text-[#C8BDB2] max-w-2xl mx-auto font-sans">
              Explore the raw, vibrant ingredients that power our formulations. Sourced with integrity, crafted with care.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:h-[500px]">
            {/* Large featured */}
            <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="/images/ingredients/fresh-produce.jpg"
                alt="Fresh whole produce and botanicals"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="inline-block px-3 py-1 mb-2 bg-[#C87D55] text-[#12100F] text-[10px] font-bold rounded-full tracking-widest uppercase font-sans border border-[#E09A72]/40">
                  CLEAN HARVEST
                </span>
                <h3
                  className="text-white text-2xl font-serif font-light"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Whole Superfoods
                </h3>
                <p className="text-white/80 text-xs sm:text-sm mt-1 font-sans">
                  Fresh, bioactive ingredients selected for vitality.
                </p>
              </div>
            </div>

            {/* Small items */}
            <div className="relative group overflow-hidden rounded-3xl aspect-square md:aspect-auto border border-white/10">
              <Image
                src="/images/ingredients/nuts.jpg"
                alt="Raw almonds, flaxseeds, and nuts"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3
                  className="text-white font-serif font-medium text-lg"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Heirloom Almonds & Seeds
                </h3>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-3xl aspect-square md:aspect-auto border border-white/10">
              <Image
                src="/images/ingredients/cacao.jpg"
                alt="Single-origin raw cacao"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3
                  className="text-white font-serif font-medium text-lg"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Single-Origin Cacao
                </h3>
              </div>
            </div>

            <div className="col-span-2 relative group overflow-hidden rounded-3xl aspect-video md:aspect-auto border border-white/10">
              <Image
                src="/images/story-crafted.jpg"
                alt="Vitaura small batch crafting"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3
                  className="text-white font-serif font-medium text-xl"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Small-Batch Precision
                </h3>
                <p className="text-white/80 text-xs sm:text-sm mt-1 font-sans">
                  Crafted daily in our dedicated nutrition kitchen.
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
