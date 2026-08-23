"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Sparkles } from "lucide-react";
import { type Product } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

/**
 * Product card following Aesop/Ritual D2C Luxury standards:
 * - 4/5 aspect ratio image wrapper in warm linen frame (#F4F0E8)
 * - Frosted glass floating pill tags
 * - Clear weight hierarchy for typography & pricing
 * - Tactile Add-to-Cart button with instant feedback
 */
export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const priceInRupees = product.price / 100;

  return (
    <article className="bg-white rounded-2xl overflow-hidden flex flex-col group border border-[#183324]/10 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(17,36,25,0.08)] hover:-translate-y-1">
      {/* 4/5 Aspect Ratio Image Wrapper */}
      <Link
        href={`/product/${product.slug}`}
        data-cursor="view"
        className="block relative aspect-[4/5] bg-[#F4F0E8] overflow-hidden flex-shrink-0"
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

        {/* Top Badges: Frosted Glass Floating Pills */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.featured ? (
            <span className="bg-white/85 backdrop-blur-md text-[#112419] text-[11px] font-bold px-3 py-1 rounded-full border border-white/40 shadow-xs flex items-center gap-1 font-manrope">
              <Sparkles size={11} className="text-[#C8A265]" />
              <span>Bestseller</span>
            </span>
          ) : <span />}

          {product.tags?.[0] && (
            <span className="bg-[#112419]/80 backdrop-blur-md text-[#FAF8F5] text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20 font-manrope">
              {product.tags[0]}
            </span>
          )}
        </div>
      </Link>

      {/* Content Body */}
      <div className="p-5 flex flex-col flex-grow gap-3">
        {/* Rating & Category */}
        <div className="flex items-center justify-between text-xs text-[#48544D]">
          <span className="font-manrope font-medium text-[11px] uppercase tracking-wider text-[#C8A265]">
            {product.category?.name || "Organic Nutrition"}
          </span>
          <div className="flex items-center gap-1 font-manrope font-semibold text-[#112419]">
            <Star size={13} className="fill-[#C8A265] text-[#C8A265]" />
            <span>4.9</span>
          </div>
        </div>

        {/* Name + Price Stack */}
        <div className="flex items-start justify-between gap-3">
          <Link href={`/product/${product.slug}`}>
            <h3
              className="text-[#171D19] font-bold text-lg leading-snug group-hover:text-[#2E523E] transition-colors"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {product.name}
            </h3>
          </Link>
          <span
            className="text-[#112419] font-extrabold text-xl flex-shrink-0"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {formatPrice(priceInRupees)}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-body-md text-[#48544D] flex-grow leading-relaxed line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Nutrition Highlight Pill */}
        {product.nutritionInfo && (
          <div className="flex items-center gap-2 text-xs font-semibold text-[#112419] bg-[#FAF8F5] border border-[#183324]/10 px-3 py-1.5 rounded-lg font-manrope">
            <span>🔥 {product.nutritionInfo.calories} kcal</span>
            <span className="text-[#C8A265]">•</span>
            <span>💪 {Math.round(product.nutritionInfo.protein / 10)}g protein</span>
          </div>
        )}

        {/* Add to Cart CTA */}
        <button
          onClick={() => onAddToCart?.(product)}
          disabled={!product.available}
          className="w-full flex items-center justify-center gap-2 bg-[#112419] text-[#FAF8F5] py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#183324] active:scale-[0.98] transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed mt-1 cursor-pointer font-manrope border border-[#C8A265]/20"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={15} strokeWidth={2.2} aria-hidden="true" />
          {product.available ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#183324]/10 animate-pulse">
      <div className="aspect-[4/5] bg-[#F4F0E8]" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-5 bg-[#F4F0E8] rounded w-2/3" />
          <div className="h-5 bg-[#F4F0E8] rounded w-16" />
        </div>
        <div className="h-4 bg-[#F4F0E8] rounded w-full" />
        <div className="h-4 bg-[#F4F0E8] rounded w-4/5" />
        <div className="h-11 bg-[#F4F0E8] rounded-xl w-full" />
      </div>
    </div>
  );
}
