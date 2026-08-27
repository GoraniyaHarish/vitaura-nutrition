import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { WhatsAppFAB } from "@/components/ui/WhatsAppFAB";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { ArrowLeft, ShieldCheck, Flame, Zap, Star, CheckCircle2, Truck } from "lucide-react";
import { type Product } from "@/lib/api";

const PRODUCTS_DATA: Record<string, {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number; // in rupees
  category: string;
  categorySlug: string;
  tags: string[];
  imageUrl: string;
  nutrition: { calories: number; protein: string; carbs: string; fat: string; fiber: string };
  ingredients: string[];
}> = {
  "vanilla-matcha-zen": {
    id: 1,
    name: "Vanilla Matcha Zen",
    shortDescription: "Smooth ceremonial grade matcha blended with rich vanilla and organic plant protein.",
    description: "Our signature blend of ceremonial Uji matcha, Madagascar vanilla, and cold-pressed organic almond milk. Balanced with bioavailable plant protein to provide steady morning clarity, focus, and clean energy with zero jitters.",
    price: 249,
    category: "Shakes",
    categorySlug: "shakes",
    tags: ["Ceremonial Matcha", "Plant Protein", "Zen Focus"],
    imageUrl: "/images/vanilla-matcha-zen.jpg",
    nutrition: { calories: 280, protein: "20g", carbs: "26g", fat: "6g", fiber: "4g" },
    ingredients: ["Ceremonial Uji Matcha", "Madagascar Vanilla Bean", "Pea & Rice Protein Isolate", "Cold-Pressed Almond Milk", "Medjool Date Puree"],
  },
  "dark-cacao-recharge": {
    id: 2,
    name: "Dark Cacao Recharge",
    shortDescription: "Intense single-origin raw cacao combined with Medjool dates and oats for deep recovery.",
    description: "The Dark Cacao Recharge combines single-origin raw South American cacao with Medjool dates and sprouted whole oats. Rich in antioxidants, magnesium, and plant protein for sustained cellular rejuvenation.",
    price: 279,
    category: "Shakes",
    categorySlug: "shakes",
    tags: ["High Protein", "Raw Cacao", "Recovery"],
    imageUrl: "/images/dark-cacao-recharge.jpg",
    nutrition: { calories: 320, protein: "24g", carbs: "34g", fat: "8g", fiber: "5g" },
    ingredients: ["Raw South American Cacao", "Medjool Dates", "Sprouted Rolled Oats", "Organic Almond Butter", "Clean Plant Protein"],
  },
  "wild-berry-collagen": {
    id: 3,
    name: "Wild Berry Collagen",
    shortDescription: "Wild Nordic blueberries, fresh strawberries, and botanical collagen boosters.",
    description: "A concentrated blend of wild forest berries, organic strawberry purée, and clean botanical collagen precursors designed to nurture skin radiance, joint vitality, and cellular antioxidant defense.",
    price: 299,
    category: "Shakes",
    categorySlug: "shakes",
    tags: ["Antioxidant", "Collagen Boost", "Superfood"],
    imageUrl: "/images/wild-berry-collagen.jpg",
    nutrition: { calories: 240, protein: "18g", carbs: "36g", fat: "3g", fiber: "6g" },
    ingredients: ["Wild Nordic Blueberries", "Fresh Strawberries", "Organic Plant Collagen Precursors", "Chia Seeds", "Coconut Water"],
  },
  "golden-turmeric-cleanse": {
    id: 4,
    name: "Golden Turmeric Cleanse",
    shortDescription: "Cold-pressed organic turmeric root, ginger, cracked black pepper, and almond milk.",
    description: "A restorative golden elixir powered by fresh turmeric root, warm ginger, cracked Tellicherry pepper for curcumin bioavailability, and organic vanilla spice.",
    price: 269,
    category: "Shakes",
    categorySlug: "shakes",
    tags: ["Anti-Inflammatory", "Ginger Root", "Cleanse"],
    imageUrl: "/images/golden-turmeric-cleanse.jpg",
    nutrition: { calories: 220, protein: "14g", carbs: "28g", fat: "5g", fiber: "4g" },
    ingredients: ["Fresh Cold-Pressed Turmeric Root", "Fresh Ginger", "Tellicherry Black Pepper", "Almond Milk", "Ceylon Cinnamon"],
  },
  "acai-power-bowl": {
    id: 5,
    name: "Acai Power Bowl",
    shortDescription: "Organic wild acai purée topped with fresh sliced banana, blueberries, and toasted coconut flakes.",
    description: "Thick, velvety organic Amazonian acai blended with frozen berries, topped with crunchy gluten-free granola, chia seeds, and raw hemp hearts for complete breakfast vitality.",
    price: 349,
    category: "Bowls",
    categorySlug: "bowls",
    tags: ["Organic Acai", "Antioxidant Rich", "Whole Foods"],
    imageUrl: "/images/acai-power-bowl.jpg",
    nutrition: { calories: 380, protein: "12g", carbs: "54g", fat: "11g", fiber: "9g" },
    ingredients: ["Wild Organic Acai Puree", "Fresh Banana", "Fresh Blueberries", "Chia Seeds", "Gluten-Free Oat Granola", "Toasted Coconut Flakes"],
  },
  "quinoa-avocado-harvest": {
    id: 6,
    name: "Quinoa Avocado Harvest",
    shortDescription: "Warm tri-color quinoa, sliced Hass avocado, edamame, baby spinach, and lemon-tahini dressing.",
    description: "Nutrient-dense savory wellness bowl packed with fluffy tri-color quinoa, ripe avocado, steamed edamame, organic greens, and pumpkin seeds with artisan tahini drizzle.",
    price: 329,
    category: "Bowls",
    categorySlug: "bowls",
    tags: ["Savory Bowl", "Healthy Fats", "Complete Protein"],
    imageUrl: "/images/quinoa-avocado-harvest.jpg",
    nutrition: { calories: 420, protein: "16g", carbs: "46g", fat: "18g", fiber: "11g" },
    ingredients: ["Organic Tri-Color Quinoa", "Hass Avocado", "Steamed Edamame", "Baby Spinach", "Roasted Chickpeas", "Artisan Lemon Tahini"],
  },
  "cacao-hazelnut-energy-bites": {
    id: 7,
    name: "Cacao Hazelnut Energy Bites",
    shortDescription: "Cold-formed truffles made with raw cacao, roasted hazelnuts, chia, and dates.",
    description: "Artisan small-batch energy bites rolled in raw cocoa nibs and crushed roasted hazelnuts. The ultimate clean on-the-go fuel with zero refined sugar.",
    price: 199,
    category: "Healthy Bites",
    categorySlug: "healthy-bites",
    tags: ["Raw Cacao", "Hazelnut", "No Added Sugar"],
    imageUrl: "/images/cacao-hazelnut-energy-bites.jpg",
    nutrition: { calories: 260, protein: "9g", carbs: "28g", fat: "14g", fiber: "5g" },
    ingredients: ["Raw Cacao Powder", "Roasted Hazelnuts", "Medjool Dates", "Chia Seeds", "Raw Cacao Nibs"],
  },
  "almond-flax-protein-bar": {
    id: 8,
    name: "Almond Flax Protein Bar",
    shortDescription: "Cold-pressed whole almond, toasted golden flaxseed, and oat protein bar.",
    description: "Handcrafted whole-ingredient nutrition bar combining freshly ground almond butter, organic golden flax, chia seeds, and plant protein.",
    price: 179,
    category: "Healthy Bites",
    categorySlug: "healthy-bites",
    tags: ["Clean Protein", "Omega-3", "Gluten-Free"],
    imageUrl: "/images/almond-flax-protein-bar.jpg",
    nutrition: { calories: 240, protein: "15g", carbs: "22g", fat: "11g", fiber: "6g" },
    ingredients: ["Stone-Ground Almond Butter", "Organic Golden Flaxseed", "Gluten-Free Oats", "Chia Seeds", "Plant Protein Isolate"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS_DATA[slug];
  if (!product) return { title: "Formulation Not Found — Vitaura Nutrition" };
  return {
    title: `${product.name} — Vitaura Nutrition`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS_DATA[slug] || PRODUCTS_DATA["vanilla-matcha-zen"];

  if (!product) {
    notFound();
  }

  const fullProduct: Product = {
    id: product.id,
    slug: slug,
    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    price: product.price * 100, // in paise
    imageUrl: product.imageUrl,
    category: { id: 1, slug: product.categorySlug, name: product.category },
    tags: product.tags,
    ingredients: product.ingredients.map((name, i) => ({ id: i + 1, name })),
    nutritionInfo: {
      servingSize: "Per serving",
      calories: product.nutrition.calories,
      protein: parseInt(product.nutrition.protein) * 10,
      carbohydrates: parseInt(product.nutrition.carbs) * 10,
      fat: parseInt(product.nutrition.fat) * 10,
      fiber: parseInt(product.nutrition.fiber) * 10,
      sugar: 100,
    },
    available: true,
    featured: true,
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow pb-24 md:pb-16 bg-transparent">
        <div className="container-vitaura py-6 md:py-10">
          {/* Breadcrumb / Back button */}
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold font-sans text-[#F7F2EA] hover:text-[#C87D55] transition-colors mb-6 uppercase tracking-widest"
          >
            <ArrowLeft size={14} />
            <span>Back to Formulations</span>
          </Link>

          {/* Main PDP Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 bg-[#1A1412]/85 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
            
            {/* Left Column: Product Gallery */}
            <div className="lg:col-span-6 flex flex-col items-center lg:sticky lg:top-24 lg:self-start">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#211B18] border border-white/10 shadow-sm flex items-center justify-center group">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 550px"
                  priority
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="bg-[#12100F]/90 backdrop-blur-md text-[#F7F2EA] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/15 font-sans shadow-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Decision Stack */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#C87D55] uppercase tracking-widest font-sans">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 font-sans text-xs font-semibold text-[#C8BDB2]">
                    <Star size={13} className="fill-[#D97706] text-[#D97706]" />
                    <span>Chef-Crafted Formulation</span>
                  </div>
                </div>

                {/* Title */}
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F2EA] mb-3 leading-tight tracking-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-white/10">
                  <span className="text-3xl font-extrabold text-[#F7F2EA] font-sans tabular-nums">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-[#C8BDB2] font-sans">
                    (Inclusive of all taxes • Free cold-chain dispatch over ₹500)
                  </span>
                </div>

                {/* Description */}
                <p className="text-base text-[#C8BDB2] font-sans mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Add-to-Cart Purchase Bar */}
                <div className="bg-[#211B18] p-5 rounded-2xl border border-white/10 mb-6 space-y-3 shadow-xs">
                  <AddToCartButton product={fullProduct} />

                  <div className="flex items-center justify-between text-xs text-[#C8BDB2] px-2 font-sans font-semibold pt-1">
                    <span className="flex items-center gap-1.5 text-[#F7F2EA]">
                      <Truck size={15} className="text-[#C87D55]" />
                      <span>Cold-Chain Delivery</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[#F7F2EA]">
                      <ShieldCheck size={15} className="text-[#C87D55]" />
                      <span>100% Clean Ingredients</span>
                    </span>
                  </div>
                </div>

                {/* Nutrition Breakdown Card */}
                <div className="mb-6 bg-[#211B18] rounded-2xl p-5 border border-white/10 shadow-xs">
                  <h3 className="text-xs font-bold text-[#F7F2EA] mb-3 flex items-center gap-1.5 uppercase tracking-wider font-sans">
                    <Flame size={15} className="text-[#C87D55]" />
                    <span>Nutritional Breakdown (per serving)</span>
                  </h3>
                  <div className="grid grid-cols-5 gap-2 text-center bg-[#1A1412] p-3.5 rounded-xl border border-white/10 text-xs font-sans">
                    <div>
                      <span className="block font-extrabold text-[#F7F2EA] text-sm tabular-nums">{product.nutrition.calories}</span>
                      <span className="text-[10px] text-[#91857B] uppercase font-semibold">Calories</span>
                    </div>
                    <div>
                      <span className="block font-extrabold text-[#F7F2EA] text-sm tabular-nums">{product.nutrition.protein}</span>
                      <span className="text-[10px] text-[#91857B] uppercase font-semibold">Protein</span>
                    </div>
                    <div>
                      <span className="block font-extrabold text-[#F7F2EA] text-sm tabular-nums">{product.nutrition.carbs}</span>
                      <span className="text-[10px] text-[#91857B] uppercase font-semibold">Carbs</span>
                    </div>
                    <div>
                      <span className="block font-extrabold text-[#F7F2EA] text-sm tabular-nums">{product.nutrition.fat}</span>
                      <span className="text-[10px] text-[#91857B] uppercase font-semibold">Fat</span>
                    </div>
                    <div>
                      <span className="block font-extrabold text-[#F7F2EA] text-sm tabular-nums">{product.nutrition.fiber}</span>
                      <span className="text-[10px] text-[#91857B] uppercase font-semibold">Fiber</span>
                    </div>
                  </div>
                </div>

                {/* Fresh Ingredients Card */}
                <div className="bg-[#211B18] rounded-2xl p-5 border border-white/10 shadow-xs">
                  <h3 className="text-xs font-bold text-[#F7F2EA] mb-2 flex items-center gap-1.5 uppercase tracking-wider font-sans">
                    <Zap size={15} className="text-[#C87D55]" />
                    <span>Whole Superfood Ingredients</span>
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.ingredients.map((ing, idx) => (
                      <span key={idx} className="bg-[#1A1412] text-[#F7F2EA] text-xs font-medium px-3 py-1.5 rounded-xl border border-white/10 font-sans flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-[#C87D55]" />
                        <span>{ing}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
      <MobileBottomNav />
    </>
  );
}
