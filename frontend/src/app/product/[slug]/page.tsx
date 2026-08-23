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
  tags: string[];
  imageUrl: string;
  nutrition: { calories: number; protein: string; carbs: string; fat: string; fiber: string };
  ingredients: string[];
}> = {
  "classic-vanilla-bean": {
    id: 1,
    name: "Classic Vanilla Bean",
    shortDescription: "Smooth, rich Madagascar vanilla blended with plant-based protein for clean, sustained vitality.",
    description: "Our Classic Vanilla Bean shake is crafted from pure, natural vanilla beans and bio-available plant protein. Each serving is freshly prepared to order in Rajkot, delivering a smooth velvet texture with zero artificial sweeteners, synthetic gums, or preservatives.",
    price: 249,
    category: "Nutrition Shakes",
    tags: ["Vegan", "Clean Protein", "Zero Preservatives"],
    imageUrl: "/images/products/classic-vanilla-bean.jpg",
    nutrition: { calories: 280, protein: "20g", carbs: "30g", fat: "6g", fiber: "3g" },
    ingredients: ["Fresh Madagascar Vanilla Bean", "Pea & Rice Protein Isolate", "Almond Milk", "Medjool Dates"],
  },
  "double-dark-cacao": {
    id: 2,
    name: "Double Dark Cacao",
    shortDescription: "Intense raw single-origin cacao combined with Medjool dates and oats for deep post-workout recovery.",
    description: "The Double Dark Cacao blend combines raw organic cacao with organic dates and whole oats. Rich in natural antioxidants, magnesium, and plant protein without artificial additives.",
    price: 279,
    category: "Nutrition Shakes",
    tags: ["High Protein", "Raw Cacao", "Recovery"],
    imageUrl: "/images/products/double-dark-cacao.jpg",
    nutrition: { calories: 320, protein: "22g", carbs: "38g", fat: "8g", fiber: "5g" },
    ingredients: ["Raw Cacao Powder", "Medjool Dates", "Organic Rolled Oats", "Unsweetened Almond Milk"],
  },
  "berry-antioxidant": {
    id: 3,
    name: "Berry Antioxidant",
    shortDescription: "A vibrant infusion of wild strawberries and blueberries packed with essential cellular vitamins.",
    description: "Our Berry Antioxidant shake bursts with real hand-picked strawberries and blueberries. Every bottle delivers high-potency antioxidants and natural vitamin C.",
    price: 299,
    category: "Nutrition Shakes",
    tags: ["Antioxidant Boost", "Fresh Fruit"],
    imageUrl: "/images/products/berry-antioxidant.jpg",
    nutrition: { calories: 240, protein: "15g", carbs: "42g", fat: "3g", fiber: "6g" },
    ingredients: ["Fresh Wild Strawberries", "Fresh Blueberries", "Chia Seeds", "Raw Coconut Water"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS_DATA[slug];
  if (!product) return { title: "Product Not Found — GronLiv" };
  return {
    title: `${product.name} — GronLiv Organic Nutrition`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS_DATA[slug] || PRODUCTS_DATA["classic-vanilla-bean"];

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
    category: { id: 1, slug: "shakes", name: product.category },
    tags: product.tags,
    ingredients: [],
    nutritionInfo: {
      servingSize: "300ml",
      calories: product.nutrition.calories,
      protein: parseInt(product.nutrition.protein) * 10,
      carbohydrates: parseInt(product.nutrition.carbs) * 10,
      fat: parseInt(product.nutrition.fat) * 10,
      fiber: parseInt(product.nutrition.fiber) * 10,
      sugar: 120,
    },
    available: true,
    featured: true,
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow pb-24 md:pb-16 bg-[#FAF8F5]">
        <div className="container-gronliv py-6 md:py-10">
          {/* Breadcrumb / Back button */}
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold font-manrope text-[#112419] hover:text-[#C8A265] transition-colors mb-6 uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>Back to Menu Collection</span>
          </Link>

          {/* Desktop & Mobile Main PDP Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 bg-white rounded-3xl p-6 md:p-10 border border-[#183324]/10 shadow-[0_4px_24px_rgba(17,36,25,0.04)]">
            
            {/* Left Column: Sticky Gallery */}
            <div className="lg:col-span-6 flex flex-col items-center lg:sticky lg:top-24 lg:self-start">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F4F0E8] border border-[#183324]/10 shadow-sm flex items-center justify-center group">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 550px"
                  priority
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="bg-white/90 backdrop-blur-md text-[#112419] text-[11px] font-bold px-3 py-1 rounded-full border border-[#183324]/10 font-manrope shadow-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Decision-Making Stack */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#C8A265] uppercase tracking-widest font-manrope">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 font-manrope text-xs font-bold text-[#112419]">
                    <Star size={14} className="fill-[#C8A265] text-[#C8A265]" />
                    <span>4.9 / 5.0 (120+ reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <h1
                  className="text-2xl md:text-4xl font-extrabold text-[#112419] mb-3 leading-tight"
                  style={{ fontFamily: "var(--font-merriweather)" }}
                >
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-[#183324]/10">
                  <span className="text-3xl font-extrabold text-[#112419] font-manrope">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-[#48544D] font-merriweather">
                    (Inclusive of all taxes • Free delivery over ₹500)
                  </span>
                </div>

                {/* Short Benefit Subtitle */}
                <p className="text-body-md text-[#48544D] font-merriweather mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Mobile & Desktop Add-to-Cart Purchase Bar */}
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#183324]/10 mb-6 space-y-3">
                  <AddToCartButton product={fullProduct} />

                  <div className="flex items-center justify-between text-xs text-[#48544D] px-2 font-manrope font-semibold">
                    <span className="flex items-center gap-1.5 text-[#112419]">
                      <Truck size={15} className="text-[#C8A265]" />
                      <span>Cold-Chain Delivery in Rajkot</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[#112419]">
                      <ShieldCheck size={15} className="text-[#C8A265]" />
                      <span>100% Organic Purity</span>
                    </span>
                  </div>
                </div>

                {/* Nutrition Breakdown Card */}
                <div className="mb-6 bg-white rounded-2xl p-5 border border-[#183324]/10 shadow-xs">
                  <h3 className="text-xs font-bold text-[#112419] mb-3 flex items-center gap-1.5 uppercase tracking-wider font-manrope">
                    <Flame size={16} className="text-[#C8A265]" />
                    <span>Nutritional Breakdown (per 300ml bottle)</span>
                  </h3>
                  <div className="grid grid-cols-5 gap-2 text-center bg-[#FAF8F5] p-3.5 rounded-xl border border-[#183324]/10 text-xs font-manrope">
                    <div>
                      <span className="block font-extrabold text-[#112419] text-sm">{product.nutrition.calories}</span>
                      <span className="text-[11px] text-[#48544D]">Calories</span>
                    </div>
                    <div>
                      <span className="block font-extrabold text-[#112419] text-sm">{product.nutrition.protein}</span>
                      <span className="text-[11px] text-[#48544D]">Protein</span>
                    </div>
                    <div>
                      <span className="block font-extrabold text-[#112419] text-sm">{product.nutrition.carbs}</span>
                      <span className="text-[11px] text-[#48544D]">Carbs</span>
                    </div>
                    <div>
                      <span className="block font-extrabold text-[#112419] text-sm">{product.nutrition.fat}</span>
                      <span className="text-[11px] text-[#48544D]">Fat</span>
                    </div>
                    <div>
                      <span className="block font-extrabold text-[#112419] text-sm">{product.nutrition.fiber}</span>
                      <span className="text-[11px] text-[#48544D]">Fiber</span>
                    </div>
                  </div>
                </div>

                {/* Fresh Ingredients Card */}
                <div className="bg-white rounded-2xl p-5 border border-[#183324]/10 shadow-xs">
                  <h3 className="text-xs font-bold text-[#112419] mb-2 flex items-center gap-1.5 uppercase tracking-wider font-manrope">
                    <Zap size={16} className="text-[#C8A265]" />
                    <span>Pure Organic Ingredients</span>
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.ingredients.map((ing, idx) => (
                      <span key={idx} className="bg-[#FAF8F5] text-[#112419] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#183324]/10 font-manrope flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-[#2E523E]" />
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
