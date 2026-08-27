"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Clock, Leaf } from "lucide-react";
import { BlurText } from "@/components/animations/BlurText";
import { Magnet } from "@/components/animations/Magnet";

interface HeroFormulation {
  id: number;
  slug: string;
  name: string;
  pricePaise: number;
  calories: string;
  protein: string;
  category: string;
  tagline: string;
  imageUrl: string;
  provenance1: { title: string; desc: string };
  provenance2: { title: string; desc: string };
  provenance3: { title: string; desc: string };
}

const HERO_FORMULATIONS: HeroFormulation[] = [
  {
    id: 1,
    slug: "vanilla-matcha-zen",
    name: "Vanilla Matcha Zen",
    pricePaise: 24900,
    calories: "280 kcal",
    protein: "20g Protein",
    category: "Signature Ceremonial Shake",
    tagline: "Ceremonial Uji Matcha • Organic Pea Protein • Cold-Pressed Almond Milk",
    imageUrl: "/images/vanilla-matcha-zen.jpg",
    provenance1: { title: "Ceremonial Uji Matcha", desc: "First-harvest stone ground" },
    provenance2: { title: "20g Clean Protein", desc: "Sprouted pea & almond bio-fuel" },
    provenance3: { title: "Zero Refined Sugar", desc: "Pure Madagascar vanilla pod" },
  },
  {
    id: 2,
    slug: "dark-cacao-recharge",
    name: "Dark Cacao Recharge",
    pricePaise: 27900,
    calories: "320 kcal",
    protein: "24g Protein",
    category: "Cellular Recovery Elixir",
    tagline: "Single-Origin Raw Cacao • Medjool Dates • Sprouted Whole Oats",
    imageUrl: "/images/dark-cacao-recharge.jpg",
    provenance1: { title: "Single-Origin Cacao", desc: "Raw unroasted South American" },
    provenance2: { title: "24g Peak Recovery", desc: "Cellular tissue repair formula" },
    provenance3: { title: "Medjool Date Puree", desc: "Unrefined whole energy reload" },
  },
  {
    id: 5,
    slug: "acai-power-bowl",
    name: "Acai Power Bowl",
    pricePaise: 34900,
    calories: "380 kcal",
    protein: "12g Protein",
    category: "Organic Antioxidant Bowl",
    tagline: "Organic Amazonian Acai • Wild Nordic Berries • Sprouted Hemp Granola",
    imageUrl: "/images/acai-power-bowl.jpg",
    provenance1: { title: "Wild Harvest Acai", desc: "Flash-frozen Amazonian berry" },
    provenance2: { title: "Wild Nordic Berries", desc: "Polyphenol & antioxidant rich" },
    provenance3: { title: "Sprouted Hemp Granola", desc: "Nutrient-dense whole seed crunch" },
  },
];

export function HeroSection() {
  const [selectedFormulation, setSelectedFormulation] = useState<HeroFormulation>(HERO_FORMULATIONS[0]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-[92vh] w-full flex items-center overflow-hidden bg-transparent border-b border-white/10">
      <div className="container-vitaura py-12 md:py-20 relative z-10 w-full">
        {/* ── Eyebrow & Headline ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center flex flex-col items-center mb-8 md:mb-12"
        >
          {/* Sourcing Promise Pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-[#1A1412]/85 border border-white/10 text-[#F7F2EA] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 shadow-sm tracking-wider font-sans uppercase backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C87D55] animate-pulse" />
            <span>Small-Batch • Chef-Crafted • Daily</span>
          </motion.div>

          {/* High-Fashion Cormorant Garamond Display Headline */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#F7F2EA] tracking-tight leading-[1.04] mb-5 text-center"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <BlurText
              text="Pure Superfoods."
              delay={60}
              animateBy="words"
              direction="bottom"
              className="inline-block font-normal text-[#F7F2EA]"
            />{" "}
            <span className="font-light italic text-[#C87D55] inline-block">
              <BlurText
                text="Chef-Crafted Daily."
                delay={60}
                animateBy="words"
                direction="bottom"
                className="inline-block text-[#C87D55]"
              />
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-[#C8BDB2] max-w-2xl text-center leading-relaxed font-sans font-normal"
          >
            Gastronomic nutrition formulations crafted with whole organic botanicals, raw nuts, and bioavailable plant protein. Prepared fresh daily and dispatched in protected cold-chain.
          </motion.p>
        </motion.div>

        {/* ── The Culinary Spotlight Stage ── */}
        <div className="max-w-5xl mx-auto">
          {/* Formulation Switcher Tabs */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-6 overflow-x-auto pb-2 scroll-smooth">
            {HERO_FORMULATIONS.map((f, idx) => {
              const isSelected = selectedFormulation.id === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFormulation(f)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-sans font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 shrink-0 backdrop-blur-md ${
                    isSelected
                      ? "bg-[#C87D55] text-[#12100F] shadow-lg border border-[#E09A72]"
                      : "bg-[#1A1412]/80 text-[#C8BDB2] hover:text-[#F7F2EA] hover:border-white/20 border border-white/10"
                  }`}
                  aria-label={`Select ${f.name}`}
                  aria-pressed={isSelected}
                >
                  <span className={`text-[10px] ${isSelected ? "text-[#12100F] font-extrabold" : "text-[#91857B]"}`}>
                    0{idx + 1}
                  </span>
                  <span>{f.name}</span>
                </button>
              );
            })}
          </div>

          {/* Hero Stage Container */}
          <div
            className="relative bg-[#1A1412]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-8 md:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.55)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Formulation Essence & Provenance (Desktop) */}
              <div className="hidden lg:flex lg:col-span-3 flex-col justify-between h-full space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedFormulation.id + "-left"}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C87D55] font-sans block">
                      {selectedFormulation.category}
                    </span>
                    <h3
                      className="text-2xl font-light text-[#F7F2EA] tracking-tight"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {selectedFormulation.name}
                    </h3>
                    <p className="text-xs text-[#C8BDB2] font-sans leading-relaxed">
                      {selectedFormulation.tagline}
                    </p>

                    <div className="pt-3 border-t border-white/10 space-y-3">
                      <div className="flex items-start gap-2.5">
                        <Leaf size={15} className="text-[#C87D55] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-[#F7F2EA] font-sans">
                            {selectedFormulation.provenance1.title}
                          </p>
                          <p className="text-[11px] text-[#91857B] font-sans">
                            {selectedFormulation.provenance1.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Sparkles size={15} className="text-[#C87D55] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-[#F7F2EA] font-sans">
                            {selectedFormulation.provenance2.title}
                          </p>
                          <p className="text-[11px] text-[#91857B] font-sans">
                            {selectedFormulation.provenance2.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Center: Hero Macro Product Presentation */}
              <div className="lg:col-span-6 flex justify-center items-center relative">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#211B18] border border-white/10 shadow-inner group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedFormulation.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.03 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={selectedFormulation.imageUrl}
                        alt={`Vitaura ${selectedFormulation.name}`}
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 550px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12100F]/80 via-transparent to-black/20 pointer-events-none" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Floating Price & Metric Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#12100F]/90 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C87D55] font-sans block">
                        Fresh Batch Available
                      </span>
                      <h4
                        className="text-base sm:text-lg font-semibold text-[#F7F2EA] font-serif"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {selectedFormulation.name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-base sm:text-lg font-extrabold text-[#F7F2EA] font-sans tabular-nums block">
                        ₹{Math.round(selectedFormulation.pricePaise / 100)}
                      </span>
                      <span className="text-[10px] font-bold text-[#C8BDB2] font-sans">
                        {selectedFormulation.calories}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions & Direct Link (Desktop) */}
              <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedFormulation.id + "-right"}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 14 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-[#211B18]/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xs">
                      <div className="flex items-center gap-2 mb-1 text-[#6D9B79]">
                        <ShieldCheck size={16} />
                        <span className="text-xs font-bold font-sans uppercase tracking-wider text-[#F7F2EA]">
                          Purity Verified
                        </span>
                      </div>
                      <p className="text-xs text-[#C8BDB2] font-sans">
                        {selectedFormulation.provenance3.desc}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <Magnet strength={0.14} radius={80} className="w-full">
                        <Link
                          href={`/product/${selectedFormulation.slug}`}
                          className="w-full py-3.5 bg-[#C87D55] text-[#12100F] rounded-full font-bold text-xs hover:bg-[#E09A72] transition-all duration-300 shadow-md inline-flex items-center justify-center gap-2 cursor-pointer font-sans tracking-widest uppercase border border-[#E09A72]/40"
                        >
                          <span>Explore Formulation</span>
                          <ArrowRight size={14} />
                        </Link>
                      </Magnet>

                      <Link
                        href="/menu"
                        className="w-full py-3 bg-[#211B18] border border-white/10 text-[#F7F2EA] rounded-full font-semibold text-xs hover:bg-[#2A221E] transition-all duration-300 text-center cursor-pointer font-sans uppercase tracking-wider block"
                      >
                        View Full Atelier Menu
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Mobile Provenance & Actions Row (< 1024px) */}
            <div className="mt-5 pt-5 border-t border-white/10 lg:hidden space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-left">
                <div className="p-2.5 bg-[#211B18] rounded-xl border border-white/10">
                  <p className="text-[11px] font-bold text-[#F7F2EA] font-sans">
                    {selectedFormulation.provenance1.title}
                  </p>
                  <p className="text-[10px] text-[#91857B] font-sans">
                    {selectedFormulation.provenance1.desc}
                  </p>
                </div>
                <div className="p-2.5 bg-[#211B18] rounded-xl border border-white/10">
                  <p className="text-[11px] font-bold text-[#F7F2EA] font-sans">
                    {selectedFormulation.provenance2.title}
                  </p>
                  <p className="text-[10px] text-[#91857B] font-sans">
                    {selectedFormulation.provenance2.desc}
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1 p-2.5 bg-[#211B18] rounded-xl border border-white/10">
                  <p className="text-[11px] font-bold text-[#F7F2EA] font-sans">
                    {selectedFormulation.provenance3.title}
                  </p>
                  <p className="text-[10px] text-[#91857B] font-sans">
                    {selectedFormulation.provenance3.desc}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/product/${selectedFormulation.slug}`}
                  className="w-full py-3.5 bg-[#C87D55] text-[#12100F] rounded-full font-bold text-xs hover:bg-[#E09A72] transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer font-sans tracking-widest uppercase border border-[#E09A72]/40"
                >
                  <span>Explore Formulation</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/menu"
                  className="w-full py-3.5 bg-[#211B18] border border-white/10 text-[#F7F2EA] rounded-full font-semibold text-xs hover:bg-[#2A221E] transition-all text-center cursor-pointer font-sans uppercase tracking-wider"
                >
                  View Full Menu
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* ── Reassurance Bar Under Hero ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto grid grid-cols-3 gap-3 sm:gap-6 pt-10 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <Clock size={16} className="text-[#C87D55] shrink-0" />
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold text-[#F7F2EA] font-sans">Fresh Daily</p>
              <p className="text-[10px] text-[#91857B] font-sans hidden sm:block">Small-batch kitchen</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <Leaf size={16} className="text-[#C87D55] shrink-0" />
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold text-[#F7F2EA] font-sans">Whole Foods</p>
              <p className="text-[10px] text-[#91857B] font-sans hidden sm:block">16 clean ingredients</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <ShieldCheck size={16} className="text-[#C87D55] shrink-0" />
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold text-[#F7F2EA] font-sans">Cold-Chain</p>
              <p className="text-[10px] text-[#91857B] font-sans hidden sm:block">Protected delivery</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
