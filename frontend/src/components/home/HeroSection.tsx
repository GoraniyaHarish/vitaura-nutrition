"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Clock, Leaf } from "lucide-react";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-[#112419]">
      {/* Background Media with Premium Cinematic Lighting Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="GronLiv crafted organic nutrition bottles"
          fill
          className="object-cover object-center scale-105 transition-transform duration-1000"
          priority
          sizes="100vw"
        />
        {/* Multilayer Radial Ambient Halo Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1911] via-[#112419]/80 to-black/60" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C8A265]/15 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      </div>

      {/* Hero Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container-gronliv py-20 md:py-28 text-center text-[#FAF8F5] flex flex-col items-center max-w-4xl mx-auto"
      >
        {/* Brand Promise Pill */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#FAF8F5] text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 shadow-sm tracking-wide"
        >
          <Sparkles size={14} className="text-[#D8B778]" aria-hidden="true" />
          <span>Cold-Chain Prepared Daily in Rajkot • Zero Preservatives</span>
        </motion.div>

        {/* Hero Editorial Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#FAF8F5] mb-6 tracking-tight leading-[1.15]"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          EAT BETTER. <br className="hidden sm:inline" />
          <span className="text-[#D8B778] font-normal italic">LIVE BETTER.</span>
        </motion.h1>

        {/* Editorial Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-[#FAF8F5]/90 max-w-2xl mb-10 leading-relaxed font-normal"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          Wholesome nutrition shakes and superfood blends crafted daily with raw, unrefined ingredients. Pure vitality delivered cold to your doorstep.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-14"
        >
          <Link
            href="/menu"
            className="px-8 py-4 bg-[#C8A265] text-[#112419] rounded-xl font-bold text-sm md:text-base hover:bg-[#D8B778] hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2 cursor-pointer font-manrope tracking-wider uppercase"
          >
            <span>Explore Collection</span>
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/25 text-[#FAF8F5] rounded-xl font-semibold text-sm md:text-base hover:bg-white/20 hover:scale-105 transition-all duration-300 text-center cursor-pointer font-manrope"
          >
            Our Kitchen Story
          </Link>
        </motion.div>

        {/* Social Proof & Trust Strip below Hero */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 md:gap-8 pt-6 border-t border-white/15 w-full max-w-2xl text-left"
        >
          <div className="flex items-center gap-2.5">
            <Clock size={20} className="text-[#D8B778] shrink-0" />
            <div>
              <p className="text-xs md:text-sm font-bold text-white font-manrope">45-Min</p>
              <p className="text-[11px] text-white/70 font-merriweather">Cold-chain delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Leaf size={20} className="text-[#D8B778] shrink-0" />
            <div>
              <p className="text-xs md:text-sm font-bold text-white font-manrope">100% Organic</p>
              <p className="text-[11px] text-white/70 font-merriweather">Whole superfoods</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={20} className="text-[#D8B778] shrink-0" />
            <div>
              <p className="text-xs md:text-sm font-bold text-white font-manrope">Lab Tested</p>
              <p className="text-[11px] text-white/70 font-merriweather">Zero artificial sugars</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
