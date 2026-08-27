import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { type Product } from "@/lib/api";

export function FeaturedProducts() {
  const demoProducts: Product[] = [
    {
      id: 1,
      slug: "vanilla-matcha-zen",
      name: "Vanilla Matcha Zen",
      shortDescription: "Ceremonial grade Uji matcha blended with rich Madagascar vanilla and organic plant protein.",
      description: "Our signature blend of ceremonial Uji matcha, Madagascar vanilla, and cold-pressed organic almond milk.",
      price: 24900,
      imageUrl: "/images/vanilla-matcha-zen.jpg",
      category: { id: 1, slug: "shakes", name: "Shakes" },
      tags: ["Ceremonial Matcha", "Plant-Based", "Zen Focus"],
      ingredients: [],
      nutritionInfo: { servingSize: "350ml", calories: 280, protein: 200, carbohydrates: 260, fat: 60, fiber: 40, sugar: 90 },
      available: true,
      featured: true,
    },
    {
      id: 2,
      slug: "dark-cacao-recharge",
      name: "Dark Cacao Recharge",
      shortDescription: "Intense raw South American cacao, medjool dates, and sprouted whole rolled oats.",
      description: "Deep, satisfying dark chocolate flavor crafted with single-origin raw cacao and energizing dates for cellular recovery.",
      price: 27900,
      imageUrl: "/images/dark-cacao-recharge.jpg",
      category: { id: 1, slug: "shakes", name: "Shakes" },
      tags: ["High Protein", "Raw Cacao", "Recovery"],
      ingredients: [],
      nutritionInfo: { servingSize: "350ml", calories: 320, protein: 240, carbohydrates: 340, fat: 80, fiber: 50, sugar: 120 },
      available: true,
      featured: true,
    },
    {
      id: 3,
      slug: "wild-berry-collagen",
      name: "Wild Berry Collagen",
      shortDescription: "Antioxidant-dense wild Nordic blueberries, organic strawberries, and botanical collagen boosters.",
      description: "A restorative powerhouse of Nordic wild blueberries, fresh strawberries, and clean botanical collagen.",
      price: 29900,
      imageUrl: "/images/wild-berry-collagen.jpg",
      category: { id: 1, slug: "shakes", name: "Shakes" },
      tags: ["Antioxidant", "Collagen Boost", "Superfood"],
      ingredients: [],
      nutritionInfo: { servingSize: "350ml", calories: 240, protein: 180, carbohydrates: 360, fat: 30, fiber: 60, sugar: 140 },
      available: true,
      featured: true,
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-transparent border-b border-white/10">
      <div className="container-vitaura">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#C87D55] uppercase tracking-widest block mb-2 font-sans">
              Chef-Crafted Signatures
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F2EA] tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Featured Formulations
            </h2>
            <p className="text-[#C8BDB2] text-base md:text-lg mt-3 font-sans leading-relaxed">
              Explore our curated creations, prepared fresh daily from 100% bioavailable whole superfoods.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F7F2EA] hover:text-[#C87D55] transition-colors font-sans group shrink-0"
          >
            <span>View Full Menu (8)</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {demoProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
