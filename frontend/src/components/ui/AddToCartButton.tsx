"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
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
        "w-full bg-[#112419] text-[#FAF8F5] hover:bg-[#183324] font-bold text-sm py-4 px-8 rounded-xl transition-all text-center flex items-center justify-center gap-2 shadow-md font-manrope uppercase tracking-wider active:scale-[0.99] border border-[#C8A265]/20 cursor-pointer"
      }
    >
      {added ? (
        <>
          <Check size={18} className="text-[#C8A265]" />
          <span>Added to Cart!</span>
        </>
      ) : (
        <>
          <ShoppingCart size={18} strokeWidth={2.2} />
          <span>Add to Cart — ₹{Math.round(product.price / 100)}</span>
        </>
      )}
    </button>
  );
}
