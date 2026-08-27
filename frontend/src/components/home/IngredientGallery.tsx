"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { SpotlightCard } from '@/components/animations/SpotlightCard';

interface BotanicalIngredient {
  id: string;
  name: string;
  scientificRole: string;
  origin: string;
  benefit: string;
  imageUrl: string;
  featuredIn: string;
  productSlug: string;
}

const BOTANICAL_INGREDIENTS: BotanicalIngredient[] = [
  {
    id: 'matcha',
    name: 'Ceremonial Uji Matcha',
    scientificRole: 'Sustained Clarity & L-Theanine',
    origin: 'Kyoto, Japan',
    benefit: 'Shade-grown stone-ground green tea leaves rich in chlorophyll and natural L-theanine for calm, steady morning focus without caffeine spikes.',
    imageUrl: '/images/matcha.jpg',
    featuredIn: 'Vanilla Matcha Zen',
    productSlug: 'vanilla-matcha-zen',
  },
  {
    id: 'cacao',
    name: 'Single-Origin Raw Cacao',
    scientificRole: 'Flavanols & Cellular Recovery',
    origin: 'South America',
    benefit: 'Cold-processed unroasted cacao retaining dense natural magnesium, iron, and antioxidant polyphenols for deep muscle and cellular rejuvenation.',
    imageUrl: '/images/raw-cacao.jpg',
    featuredIn: 'Dark Cacao Recharge',
    productSlug: 'dark-cacao-recharge',
  },
  {
    id: 'berries',
    name: 'Wild Nordic Blueberries',
    scientificRole: 'Anthocyanins & Antioxidants',
    origin: 'Nordic Wildlands',
    benefit: 'Hand-harvested arctic forest berries with concentrated purple anthocyanin pigments to protect cells from oxidative stress and support daily vitality.',
    imageUrl: '/images/berries.jpg',
    featuredIn: 'Wild Berry Collagen',
    productSlug: 'wild-berry-collagen',
  },
  {
    id: 'almonds',
    name: 'Sprouted Almonds & Golden Flax',
    scientificRole: 'Clean Plant Protein & Omega-3s',
    origin: 'Certified Organic Groves',
    benefit: 'Sprouted to unlock maximum bioavailability, providing natural essential amino acids, plant lipids, and soluble fiber for steady digestion.',
    imageUrl: '/images/almonds.jpg',
    featuredIn: 'Almond Flax Protein Bar',
    productSlug: 'almond-flax-protein-bar',
  },
];

export function IngredientGallery() {
  const [activeId, setActiveId] = useState<string>('matcha');
  const activeIngredient = BOTANICAL_INGREDIENTS.find(i => i.id === activeId) || BOTANICAL_INGREDIENTS[0];

  return (
    <section className="py-20 md:py-32 bg-[#0D0B0A]/60 backdrop-blur-md text-[#F7F2EA] border-b border-white/10">
      <div className="container-vitaura">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#211B18] text-[#C87D55] text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest font-sans border border-white/10 shadow-xs">
            <Sparkles size={13} className="text-[#C87D55]" aria-hidden="true" />
            <span>Botanical Provenance</span>
          </div>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F2EA] mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Nothing to Hide. Everything to Fuel.
          </h2>
          <p 
            className="text-base sm:text-lg text-[#C8BDB2] leading-relaxed font-sans font-normal"
          >
            We celebrate radical botanical transparency. Every whole superfood, seed, and cold-pressed extract is purposefully chosen for bioavailable nutrient density.
          </p>
        </div>

        {/* Desktop & Tablet Interactive Botanical Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Ingredient Selector Cards */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {BOTANICAL_INGREDIENTS.map((ingredient) => {
              const isSelected = ingredient.id === activeId;
              return (
                <SpotlightCard
                  key={ingredient.id}
                  onClick={() => setActiveId(ingredient.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveId(ingredient.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`Select ${ingredient.name}`}
                  className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C87D55] ${
                    isSelected
                      ? 'bg-[#211B18] border-[#C87D55] shadow-md -translate-y-0.5'
                      : 'bg-[#1A1412] hover:bg-[#211B18] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#C87D55] uppercase tracking-widest font-sans block">
                        {ingredient.origin}
                      </span>
                      <h3 className="text-base sm:text-lg font-semibold text-[#F7F2EA] font-serif mt-0.5" style={{ fontFamily: 'var(--font-serif)' }}>
                        {ingredient.name}
                      </h3>
                      <p className="text-xs text-[#C8BDB2] font-sans mt-1">
                        {ingredient.scientificRole}
                      </p>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[#C87D55] text-[#12100F]'
                          : 'bg-white/10 text-[#C8BDB2]'
                      }`}
                    >
                      <ArrowRight size={14} className={isSelected ? 'translate-x-0.5' : ''} />
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* Right Column: Featured Botanical Provenance Deep Dive */}
          <div className="lg:col-span-7 bg-[#1A1412] rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Botanical Macro Imagery */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#12100F] border border-white/10">
                <Image
                  src={activeIngredient.imageUrl}
                  alt={activeIngredient.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-all duration-700 ease-out"
                  priority
                />
                <div className="absolute top-3 left-3 bg-[#12100F]/90 backdrop-blur-md text-[#F7F2EA] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/15 font-sans">
                  {activeIngredient.origin}
                </div>
              </div>

              {/* Botanical Details & Formulation Link */}
              <div className="flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold text-[#C87D55] uppercase tracking-widest font-sans">
                    Nutritional Function
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-semibold text-[#F7F2EA] mt-1 mb-2 font-serif"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {activeIngredient.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#C87D55] font-sans mb-3">
                    {activeIngredient.scientificRole}
                  </p>
                  <p className="text-xs sm:text-sm text-[#C8BDB2] leading-relaxed font-sans">
                    {activeIngredient.benefit}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-[#91857B] font-sans uppercase tracking-wider block">Featured Formulation</span>
                    <span className="text-sm font-semibold text-[#F7F2EA] font-serif" style={{ fontFamily: 'var(--font-serif)' }}>{activeIngredient.featuredIn}</span>
                  </div>

                  <Link
                    href={`/product/${activeIngredient.productSlug}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C87D55] text-[#12100F] text-xs font-bold rounded-full hover:bg-[#E09A72] transition-colors font-sans uppercase tracking-widest shadow-md"
                  >
                    <span>View Product</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Botanical Standard Footer Banner */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2.5 text-xs text-[#91857B] font-sans">
              <ShieldCheck size={16} className="text-[#C87D55] shrink-0" />
              <span>100% whole botanical sourcing with zero artificial extracts, fillers, or synthetic preservatives.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
