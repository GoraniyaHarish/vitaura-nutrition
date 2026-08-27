"use client";

import { useState, useCallback } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { type Product } from "@/lib/api";
import { useCart } from "@/context/CartContext";

const DEMO_CATEGORIES = [
  { slug: "all", name: "All Formulations" },
  { slug: "shakes", name: "Shakes" },
  { slug: "bowls", name: "Bowls" },
  { slug: "healthy-bites", name: "Healthy Bites" },
];

const DEMO_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "vanilla-matcha-zen",
    name: "Vanilla Matcha Zen",
    shortDescription:
      "Smooth ceremonial grade matcha blended with rich vanilla and organic plant protein.",
    description:
      "Our signature blend of ceremonial Uji matcha, Madagascar vanilla, and cold-pressed organic almond milk. Balanced with plant protein to provide steady, zen-like morning clarity and clean energy.",
    price: 24900,
    imageUrl: "/images/vanilla-matcha-zen.jpg",
    category: { id: 1, slug: "shakes", name: "Shakes" },
    tags: ["Ceremonial Matcha", "Plant Protein", "Zen Focus"],
    ingredients: [],
    nutritionInfo: {
      servingSize: "350ml",
      calories: 280,
      protein: 200,
      carbohydrates: 260,
      fat: 60,
      fiber: 40,
      sugar: 90,
    },
    available: true,
    featured: true,
  },
  {
    id: 2,
    slug: "dark-cacao-recharge",
    name: "Dark Cacao Recharge",
    shortDescription:
      "Intense single-origin raw cacao combined with Medjool dates and whole rolled oats.",
    description:
      "The Dark Cacao Recharge combines single-origin raw South American cacao with Medjool dates and sprouted whole oats for deep cellular recovery and sustained fuel.",
    price: 27900,
    imageUrl: "/images/dark-cacao-recharge.jpg",
    category: { id: 1, slug: "shakes", name: "Shakes" },
    tags: ["High Protein", "Raw Cacao", "Recovery"],
    ingredients: [],
    nutritionInfo: {
      servingSize: "350ml",
      calories: 320,
      protein: 240,
      carbohydrates: 340,
      fat: 80,
      fiber: 50,
      sugar: 120,
    },
    available: true,
    featured: true,
  },
  {
    id: 3,
    slug: "wild-berry-collagen",
    name: "Wild Berry Collagen",
    shortDescription:
      "Wild Nordic blueberries, fresh strawberries, and botanical collagen boosters.",
    description:
      "A concentrated blend of wild forest berries, organic strawberry purée, and clean botanical collagen precursors designed to nurture skin radiance and cellular health.",
    price: 29900,
    imageUrl: "/images/wild-berry-collagen.jpg",
    category: { id: 1, slug: "shakes", name: "Shakes" },
    tags: ["Antioxidant", "Collagen", "Superfood"],
    ingredients: [],
    nutritionInfo: {
      servingSize: "350ml",
      calories: 240,
      protein: 180,
      carbohydrates: 360,
      fat: 30,
      fiber: 60,
      sugar: 140,
    },
    available: true,
    featured: true,
  },
  {
    id: 4,
    slug: "golden-turmeric-cleanse",
    name: "Golden Turmeric Cleanse",
    shortDescription:
      "Cold-pressed organic turmeric root, ginger, cracked black pepper, and almond milk.",
    description:
      "A restorative golden elixir powered by fresh turmeric root, warm ginger, cracked Tellicherry pepper for curcumin bioavailability, and organic vanilla spice.",
    price: 26900,
    imageUrl: "/images/golden-turmeric-cleanse.jpg",
    category: { id: 1, slug: "shakes", name: "Shakes" },
    tags: ["Anti-Inflammatory", "Ginger Root", "Cleanse"],
    ingredients: [],
    nutritionInfo: {
      servingSize: "350ml",
      calories: 220,
      protein: 140,
      carbohydrates: 280,
      fat: 50,
      fiber: 40,
      sugar: 80,
    },
    available: true,
    featured: false,
  },
  {
    id: 5,
    slug: "acai-power-bowl",
    name: "Acai Power Bowl",
    shortDescription:
      "Organic wild acai purée topped with fresh sliced banana, blueberries, and toasted coconut flakes.",
    description:
      "Thick, velvety organic Amazonian acai blended with frozen berries, topped with crunchy gluten-free granola, chia seeds, and raw hemp hearts.",
    price: 34900,
    imageUrl: "/images/acai-power-bowl.jpg",
    category: { id: 2, slug: "bowls", name: "Bowls" },
    tags: ["Organic Acai", "Antioxidant Rich", "Whole Foods"],
    ingredients: [],
    nutritionInfo: {
      servingSize: "400g",
      calories: 380,
      protein: 120,
      carbohydrates: 540,
      fat: 110,
      fiber: 90,
      sugar: 180,
    },
    available: true,
    featured: true,
  },
  {
    id: 6,
    slug: "quinoa-avocado-harvest",
    name: "Quinoa Avocado Harvest",
    shortDescription:
      "Warm tri-color quinoa, sliced Hass avocado, edamame, baby spinach, and lemon-tahini dressing.",
    description:
      "Nutrient-dense savory wellness bowl packed with fluffy tri-color quinoa, ripe avocado, steamed edamame, organic greens, and pumpkin seeds with artisan tahini drizzle.",
    price: 32900,
    imageUrl: "/images/quinoa-avocado-harvest.jpg",
    category: { id: 2, slug: "bowls", name: "Bowls" },
    tags: ["Savory Bowl", "Healthy Fats", "Complete Protein"],
    ingredients: [],
    nutritionInfo: {
      servingSize: "420g",
      calories: 420,
      protein: 160,
      carbohydrates: 460,
      fat: 180,
      fiber: 110,
      sugar: 40,
    },
    available: true,
    featured: false,
  },
  {
    id: 7,
    slug: "cacao-hazelnut-energy-bites",
    name: "Cacao Hazelnut Energy Bites",
    shortDescription:
      "Cold-formed truffles made with raw cacao, roasted hazelnuts, chia, and dates.",
    description:
      "Artisan small-batch energy bites rolled in raw cocoa nibs and crushed roasted hazelnuts. The ultimate clean on-the-go fuel with zero refined sugar.",
    price: 19900,
    imageUrl: "/images/cacao-hazelnut-energy-bites.jpg",
    category: { id: 3, slug: "healthy-bites", name: "Healthy Bites" },
    tags: ["Raw Cacao", "Hazelnut", "No Added Sugar"],
    ingredients: [],
    nutritionInfo: {
      servingSize: "120g (4 bites)",
      calories: 260,
      protein: 90,
      carbohydrates: 280,
      fat: 140,
      fiber: 50,
      sugar: 110,
    },
    available: true,
    featured: true,
  },
  {
    id: 8,
    slug: "almond-flax-protein-bar",
    name: "Almond Flax Protein Bar",
    shortDescription:
      "Cold-pressed whole almond, toasted golden flaxseed, and oat protein bar.",
    description:
      "Handcrafted whole-ingredient nutrition bar combining freshly ground almond butter, organic golden flax, chia seeds, and plant protein.",
    price: 17900,
    imageUrl: "/images/almond-flax-protein-bar.jpg",
    category: { id: 3, slug: "healthy-bites", name: "Healthy Bites" },
    tags: ["Clean Protein", "Omega-3", "Gluten-Free"],
    ingredients: [],
    nutritionInfo: {
      servingSize: "75g",
      calories: 240,
      protein: 150,
      carbohydrates: 220,
      fat: 110,
      fiber: 60,
      sugar: 60,
    },
    available: true,
    featured: false,
  },
];

export function MenuPageContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addToCart, cartCount } = useCart();

  const filteredProducts =
    activeCategory === "all"
      ? DEMO_PRODUCTS
      : DEMO_PRODUCTS.filter((p) => p.category.slug === activeCategory);

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart(product);
    },
    [addToCart]
  );

  return (
    <div className="container-vitaura py-10 md:py-16">
      {/* Page Header */}
      <div className="mb-10 md:mb-12">
        <span className="text-xs font-bold text-[#C87D55] uppercase tracking-widest block mb-2 font-sans">
          Curated Pure Nutrition
        </span>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F2EA] mb-3 tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Our Formulations
        </h1>
        <p className="text-base md:text-lg text-[#C8BDB2] max-w-2xl font-sans font-normal leading-relaxed">
          Chef-crafted protein shakes, organic wellness bowls, and nutrient-dense power bites made from 100% whole, clean ingredients.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div
        className="flex gap-2.5 mb-10 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 scroll-smooth"
        role="tablist"
        aria-label="Product categories"
      >
        {DEMO_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            role="tab"
            aria-selected={activeCategory === cat.slug}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer font-sans ${
              activeCategory === cat.slug
                ? "bg-[#C87D55] text-[#12100F] shadow-md border border-[#E09A72]"
                : "bg-[#1A1412] border border-white/10 text-[#C8BDB2] hover:border-white/20 hover:text-[#F7F2EA]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p
            className="text-[#C8BDB2] text-lg font-sans"
          >
            No products in this category yet.
          </p>
          <button
            onClick={() => setActiveCategory("all")}
            className="mt-4 text-[#F7F2EA] font-semibold underline underline-offset-4 cursor-pointer font-sans"
          >
            View all products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      {/* Cart notification */}
      {cartCount > 0 && (
        <div
          className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 bg-[#1A1412] text-[#F7F2EA] border border-white/15 px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 z-40 backdrop-blur-md"
          role="status"
          aria-live="polite"
        >
          <span
            className="font-semibold text-xs uppercase tracking-wider font-sans"
          >
            {cartCount} formulation{cartCount > 1 ? "s" : ""} in cart
          </span>
          <a
            href="/cart"
            className="bg-[#C87D55] text-[#12100F] px-4 py-1.5 rounded-full text-xs font-bold font-sans uppercase tracking-wider hover:bg-[#E09A72] transition-colors"
          >
            View Cart
          </a>
        </div>
      )}
    </div>
  );
}
