"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { type Product } from "@/lib/api";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ||
        "w-full bg-[#1A1412] text-[#FBF9F5] hover:bg-[#2C221E] font-bold text-xs py-4 px-8 rounded-full transition-all text-center flex items-center justify-center gap-2.5 shadow-md font-sans uppercase tracking-widest active:scale-[0.99] border border-[#C87D55]/30 cursor-pointer"
      }
    >
      {added ? (
        <>
          <Check size={16} className="text-[#C87D55]" />
          <span>Added to Atelier Cart</span>
        </>
      ) : (
        <>
          <ShoppingBag size={16} strokeWidth={2} />
          <span>Add to Cart — ₹{Math.round(product.price / 100)}</span>
        </>
      )}
    </button>
  );
}
