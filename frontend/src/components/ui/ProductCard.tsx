"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Sparkles } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { type Product } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToCart } = useCart();
  const priceInRupees = product.price / 100;
  const cardRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!cardRef.current || shouldReduceMotion) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty("--spotlight-x", `${x}px`);
      cardRef.current.style.setProperty("--spotlight-y", `${y}px`);
    },
    [shouldReduceMotion]
  );

  const handleMouseEnter = useCallback(() => {
    if (!shouldReduceMotion) setIsHovered(true);
  }, [shouldReduceMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#1A1412]/90 backdrop-blur-md rounded-3xl p-3 sm:p-4 overflow-hidden flex flex-col group border border-white/10 transition-all duration-500 hover:shadow-[0_20px_48px_rgba(0,0,0,0.6)] hover:border-white/20 hover:-translate-y-1"
    >
      {/* Interactive Spotlight Radial Overlay */}
      {!shouldReduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out z-20"
          style={{
            opacity: isHovered ? 1 : 0,
            background:
              "radial-gradient(350px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(200, 125, 85, 0.12), transparent 80%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* 4/5 Aspect Ratio Framed Image Wrapper */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative aspect-[4/5] bg-[#211B18] rounded-2xl overflow-hidden flex-shrink-0 border border-white/10"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.imageUrl || "/images/placeholder-product.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          {product.featured ? (
            <span className="bg-[#12100F]/90 backdrop-blur-md text-[#F7F2EA] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-white/15 shadow-sm flex items-center gap-1 font-sans">
              <Sparkles size={11} className="text-[#C87D55]" />
              <span>Signature</span>
            </span>
          ) : <span />}

          {product.tags?.[0] && (
            <span className="bg-[#C87D55]/90 backdrop-blur-md text-[#12100F] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#E09A72]/30 font-sans">
              {product.tags[0]}
            </span>
          )}
        </div>
      </Link>

      {/* Content Body */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow gap-2.5">
        {/* Rating & Category */}
        <div className="flex items-center justify-between text-xs text-[#91857B]">
          <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-[#C87D55]">
            {product.category?.name || "Clean Formulation"}
          </span>
          <div className="flex items-center gap-1 font-sans font-semibold text-[#C8BDB2] text-[11px]">
            <Star size={12} className="fill-[#D97706] text-[#D97706]" />
            <span>Chef-Crafted</span>
          </div>
        </div>

        {/* Name + Price Stack */}
        <div className="flex items-start justify-between gap-2">
          <Link href={`/product/${product.slug}`}>
            <h3
              className="text-[#F7F2EA] font-semibold text-lg sm:text-xl leading-snug group-hover:text-[#C87D55] transition-colors"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {product.name}
            </h3>
          </Link>
          <span
            className="text-[#F7F2EA] font-extrabold text-lg flex-shrink-0 font-sans tabular-nums"
          >
            {formatPrice(priceInRupees)}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-[#C8BDB2] flex-grow leading-relaxed line-clamp-2 font-sans text-xs sm:text-sm">
          {product.shortDescription}
        </p>

        {/* Nutrition Highlight Pill */}
        {product.nutritionInfo && (
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#F7F2EA] bg-[#211B18] border border-white/10 px-3 py-1.5 rounded-xl font-sans mt-0.5">
            <span>🔥 {product.nutritionInfo.calories} kcal</span>
            <span className="text-[#C87D55]">•</span>
            <span>💪 {Math.round(product.nutritionInfo.protein / 10)}g protein</span>
          </div>
        )}

        {/* Add to Cart CTA */}
        <button
          onClick={handleAddToCart}
          disabled={!product.available}
          className="w-full flex items-center justify-center gap-2 bg-[#C87D55] text-[#12100F] py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#E09A72] active:scale-[0.98] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-1 cursor-pointer font-sans border border-[#E09A72]/40"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag size={14} strokeWidth={2} aria-hidden="true" />
          {product.available ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-[#1A1412] rounded-3xl p-4 border border-white/10 animate-pulse">
      <div className="aspect-[4/5] bg-[#211B18] rounded-2xl" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-5 bg-[#211B18] rounded w-2/3" />
          <div className="h-5 bg-[#211B18] rounded w-16" />
        </div>
        <div className="h-4 bg-[#211B18] rounded w-full" />
        <div className="h-4 bg-[#211B18] rounded w-4/5" />
        <div className="h-10 bg-[#211B18] rounded-full w-full" />
      </div>
    </div>
  );
}
