import { ProductCard } from "@/components/ui/ProductCard";
import { type Product } from "@/lib/api";

export function FeaturedProducts() {
  const demoProducts: Product[] = [
    {
      id: 1,
      slug: "classic-vanilla-bean",
      name: "Classic Vanilla Bean",
      shortDescription: "Smooth plant-based protein blend crafted with real Madagascar vanilla.",
      description: "Smooth plant-based protein blend crafted with natural vanilla.",
      price: 24900,
      imageUrl: "/images/products/classic-vanilla-bean.jpg",
      category: { id: 1, slug: "shakes", name: "Nutrition Shakes" },
      tags: ["Vegan", "Clean Protein"],
      ingredients: [],
      nutritionInfo: { servingSize: "300ml", calories: 280, protein: 200, carbohydrates: 300, fat: 60, fiber: 30, sugar: 120 },
      available: true,
      featured: true,
    },
    {
      id: 2,
      slug: "double-dark-cacao",
      name: "Double Dark Cacao",
      shortDescription: "Intense single-origin raw cacao with Medjool dates and whole oats.",
      description: "Intense raw cacao combined with dates and oats for robust recovery.",
      price: 27900,
      imageUrl: "/images/products/double-dark-cacao.jpg",
      category: { id: 1, slug: "shakes", name: "Nutrition Shakes" },
      tags: ["High Protein", "Raw Cacao"],
      ingredients: [],
      nutritionInfo: { servingSize: "300ml", calories: 320, protein: 220, carbohydrates: 380, fat: 80, fiber: 50, sugar: 150 },
      available: true,
      featured: true,
    },
    {
      id: 3,
      slug: "berry-antioxidant",
      name: "Berry Antioxidant",
      shortDescription: "Vibrant wild strawberries and blueberries packed with essential antioxidants.",
      description: "A vibrant mix of strawberries and blueberries packed with essential vitamins.",
      price: 29900,
      imageUrl: "/images/products/berry-antioxidant.jpg",
      category: { id: 1, slug: "shakes", name: "Nutrition Shakes" },
      tags: ["Antioxidant", "Superfood"],
      ingredients: [],
      nutritionInfo: { servingSize: "300ml", calories: 240, protein: 150, carbohydrates: 420, fat: 30, fiber: 60, sugar: 200 },
      available: true,
      featured: true,
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="container-gronliv">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#C8A265] uppercase tracking-widest block mb-2 font-manrope">
            Handcrafted Signature Formulations
          </span>
          <h2
            className="text-headline-md md:text-3xl font-extrabold text-[#112419] mb-4"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            Our Bestselling Shakes
          </h2>
          <p className="text-body-md text-[#48544D] max-w-xl mx-auto font-merriweather">
            Discover our most loved blends, freshly prepared daily with pure organic superfoods and zero artificial additives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
