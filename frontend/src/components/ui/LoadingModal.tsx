"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Leaf, ShieldCheck, HeartPulse } from "lucide-react";

interface LoadingModalProps {
  isOpen: boolean;
  title?: string;
}

const NUTRITION_FACTS = [
  {
    icon: Leaf,
    fact: "100% Whole Food Ingredients — Zero Artificial Preservatives or Synthetic Additives",
  },
  {
    icon: ShieldCheck,
    fact: "Cold-Chain Prepared Daily in Rajkot — Dispatched Under Strict Thermal Control",
  },
  {
    icon: Sparkles,
    fact: "Unrefined Botanical Nutrients — Preserving Natural Enzymes & Pure Antioxidants",
  },
  {
    icon: HeartPulse,
    fact: "Optimum Bioavailability — Formulated for Sustained Daily Energy & Gut Health",
  },
];

export function LoadingModal({ isOpen, title = "Preparing Your Order..." }: LoadingModalProps) {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % NUTRITION_FACTS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const CurrentIcon = NUTRITION_FACTS[factIndex].icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99990] flex items-center justify-center bg-[#0B1911]/80 backdrop-blur-md p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 12 }}
          className="relative w-full max-w-md bg-[#112419] border border-[#C8A265]/30 rounded-3xl p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Ambient Radial Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#C8A265]/15 blur-3xl rounded-full pointer-events-none animate-pulse" />

          {/* Dual-Tone Liquid Spinner */}
          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-[#C8A265]/20 border-t-[#C8A265] border-r-[#2E523E] animate-spin" />
            <div className="w-10 h-10 rounded-full bg-[#183324] border border-[#C8A265]/40 flex items-center justify-center text-[#C8A265]">
              <Sparkles size={20} className="animate-pulse" />
            </div>
          </div>

          <h3
            className="text-xl md:text-2xl font-extrabold text-[#FAF8F5] mb-2 tracking-tight"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            {title}
          </h3>

          <p className="text-xs font-manrope font-semibold uppercase tracking-widest text-[#C8A265] mb-6">
            GrønLiv Organic Nutrition
          </p>

          {/* Rotating Botanical Knowledge Carousel */}
          <div className="min-h-[64px] flex items-center justify-center bg-[#183324]/80 border border-[#C8A265]/20 rounded-2xl p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={factIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 text-left"
              >
                <CurrentIcon size={20} className="text-[#C8A265] shrink-0" />
                <p className="text-xs text-[#FAF8F5]/90 font-manrope leading-relaxed">
                  {NUTRITION_FACTS[factIndex].fact}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
