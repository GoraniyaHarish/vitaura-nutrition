"use client";

import { useState, useCallback } from "react";
import { ProductCard, ProductCardSkeleton } from "@/components/ui/ProductCard";
import { type Product } from "@/lib/api";

// ── DEMO CATEGORIES ──────────────────────────────────────────
// DEMO DATA: Replace with API call to /api/categories
const DEMO_CATEGORIES = [
  { slug: "all", name: "All" },
  { slug: "shakes", name: "Shakes" },
  { slug: "bowls", name: "Bowls" },
  { slug: "healthy-bites", name: "Healthy Bites" },
];

// ── DEMO PRODUCTS ─────────────────────────────────────────────
// DEMO DATA: Replace with API call to /api/products
const DEMO_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "classic-vanilla-bean",
    name: "Classic Vanilla Bean",
    shortDescription:
      "Smooth, rich vanilla blended with plant-based protein for a clean energy boost.",
    description:
      "Our Classic Vanilla Bean shake is crafted from premium vanilla beans and high-quality plant-based protein. Each serving is freshly prepared to order.",
    price: 24900, // ₹249 in paise
    imageUrl: "/images/products/classic-vanilla-bean.jpg",
    category: { id: 1, slug: "shakes", name: "Nutrition Shakes" },
    tags: ["Vegan", "Smooth", "Plant-Based"],
    ingredients: [],
    nutritionInfo: {
      servingSize: "300ml",
      calories: 280,
      protein: 200,
      carbohydrates: 300,
      fat: 60,
      fiber: 30,
      sugar: 120,
    },
    available: true,
    featured: true,
  },
  {
    id: 2,
    slug: "double-dark-cacao",
    name: "Double Dark Cacao",
    shortDescription:
      "Intense raw cacao combined with dates and oats for robust recovery.",
    description:
      "The Double Dark Cacao blend combines premium raw cacao with the natural sweetness of Medjool dates and rolled oats.",
    price: 27900, // ₹279 in paise
    imageUrl: "/images/products/double-dark-cacao.jpg",
    category: { id: 1, slug: "shakes", name: "Nutrition Shakes" },
    tags: ["High Protein", "Energizing", "Antioxidant"],
    ingredients: [],
    nutritionInfo: {
      servingSize: "300ml",
      calories: 320,
      protein: 220,
      carbohydrates: 380,
      fat: 80,
      fiber: 50,
      sugar: 150,
    },
    available: true,
    featured: true,
  },
  {
    id: 3,
    slug: "berry-antioxidant",
    name: "Berry Antioxidant",
    shortDescription:
      "A vibrant mix of strawberries and blueberries packed with essential vitamins.",
    description:
      "Our Berry Antioxidant shake bursts with the natural flavor of fresh strawberries, blueberries, and seasonal berries.",
    price: 29900, // ₹299 in paise
    imageUrl: "/images/products/berry-antioxidant.jpg",
    category: { id: 1, slug: "shakes", name: "Nutrition Shakes" },
    tags: ["Antioxidant", "Fresh", "Vitamin-Rich"],
    ingredients: [],
    nutritionInfo: {
      servingSize: "300ml",
      calories: 240,
      protein: 150,
      carbohydrates: 420,
      fat: 30,
      fiber: 60,
      sugar: 200,
    },
    available: true,
    featured: true,
  },
  {
    id: 4,
    slug: "green-vitality",
    name: "Green Vitality",
    shortDescription:
      "Spinach, green apple, and ginger blended for a fresh daily detox.",
    description:
      "Start your day with the Green Vitality shake — a clean, refreshing blend of baby spinach, green apple, fresh ginger, and a squeeze of lime.",
    price: 27900, // ₹279 in paise
    imageUrl: "/images/products/green-vitality.jpg",
    category: { id: 1, slug: "shakes", name: "Nutrition Shakes" },
    tags: ["Detox", "Low Calorie", "Vegan"],
    ingredients: [],
    nutritionInfo: {
      servingSize: "300ml",
      calories: 180,
      protein: 80,
      carbohydrates: 350,
      fat: 20,
      fiber: 80,
      sugar: 140,
    },
    available: true,
    featured: false,
  },
];

export function MenuPageContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState<Record<number, number>>({});

  // DEMO: Filter locally — replace with API call when backend is connected
  const filteredProducts =
    activeCategory === "all"
      ? DEMO_PRODUCTS
      : DEMO_PRODUCTS.filter((p) => p.category.slug === activeCategory);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
    // TODO: Connect to cart state management (Context/Zustand)
  }, []);

  return (
    <div className="container-gronliv py-10 md:py-16">
      {/* Page Header */}
      <div className="mb-10 md:mb-12">
        <h1
          className="text-display-lg-mobile md:text-display-lg text-[#154212] mb-3"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Our Menu
        </h1>
        <p className="text-body-lg text-[#42493e] max-w-2xl">
          Fresh, natural ingredients crafted into delicious shakes to fuel your
          day. Made daily in our Rajkot kitchen.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div
        className="flex gap-3 mb-10 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 scroll-smooth"
        role="tablist"
        aria-label="Product categories"
      >
        {DEMO_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            role="tab"
            aria-selected={activeCategory === cat.slug}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wider transition-all duration-200 ${
              activeCategory === cat.slug
                ? "bg-[#154212] text-white shadow-sm"
                : "bg-white border border-[#c2c9bb]/40 text-[#42493e] hover:border-[#154212] hover:text-[#154212]"
            }`}
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p
            className="text-[#5f5e5a] text-lg"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            No products in this category yet.
          </p>
          <button
            onClick={() => setActiveCategory("all")}
            className="mt-4 text-[#154212] font-semibold underline underline-offset-4"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            View all products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      {/* Cart notification (minimal) */}
      {Object.values(cartItems).reduce((a, b) => a + b, 0) > 0 && (
        <div
          className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 bg-[#154212] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 z-40"
          role="status"
          aria-live="polite"
        >
          <span
            className="font-semibold"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {Object.values(cartItems).reduce((a, b) => a + b, 0)} item
            {Object.values(cartItems).reduce((a, b) => a + b, 0) > 1
              ? "s"
              : ""}{" "}
            in cart
          </span>
          <a
            href="/cart"
            className="bg-white text-[#154212] px-3 py-1 rounded-full text-sm font-bold"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            View Cart
          </a>
        </div>
      )}
    </div>
  );
}
