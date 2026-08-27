"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/menu", label: "Our Menu" },
  { href: "/about", label: "About" },
  { href: "/delivery", label: "Delivery" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, isHydrated } = useCart();
  const displayCartCount = isHydrated ? cartCount : 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Desktop Navigation ── */}
      <header
        className={cn(
          "hidden md:flex sticky top-0 z-50 w-full transition-all duration-300",
          "border-b border-white/10",
          scrolled
            ? "bg-[#12100F]/95 backdrop-blur-md shadow-md py-2"
            : "bg-[#12100F]/90 backdrop-blur-sm py-3"
        )}
      >
        <nav
          className="container-vitaura flex items-center justify-between h-16 w-full"
          aria-label="Main navigation"
        >
          {/* Prominent Official Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group py-1"
            aria-label="Vitaura Nutrition — Home"
          >
            <Image
              src="/images/logo.png"
              alt="Vitaura Nutrition — Pure Nutrition. Elevated Living."
              width={200}
              height={70}
              className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300 brightness-110"
              priority
            />
          </Link>

          {/* Nav Links */}
          <ul className="flex items-center gap-1.5" role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 font-sans tracking-wide uppercase",
                      isActive
                        ? "text-[#F7F2EA] bg-[#211B18] border border-white/15 font-bold shadow-xs"
                        : "text-[#C8BDB2] hover:text-[#F7F2EA] hover:bg-[#211B18]/60"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Icon with badge */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-full text-[#F7F2EA] hover:bg-[#211B18] transition-colors border border-transparent hover:border-white/10"
              aria-label={`Shopping cart${displayCartCount > 0 ? `, ${displayCartCount} items` : ""}`}
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {displayCartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 bg-[#C87D55] text-[#12100F] text-[10px] font-extrabold rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-sm"
                  aria-hidden="true"
                >
                  {displayCartCount > 9 ? "9+" : displayCartCount}
                </span>
              )}
            </Link>

            {/* Order Now CTA */}
            <Link
              href="/menu"
              className="bg-[#C87D55] text-[#12100F] hover:bg-[#E09A72] text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all shadow-md font-sans border border-[#E09A72]/40 cursor-pointer"
            >
              Order Now
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Mobile Navigation Top Bar ── */}
      <header className="md:hidden sticky top-0 z-50 bg-[#12100F]/95 backdrop-blur-md border-b border-white/10 shadow-md">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Visibly Large Mobile Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2"
            aria-label="Vitaura Nutrition — Home"
          >
            <Image
              src="/images/logo.png"
              alt="Vitaura Nutrition — Pure Nutrition. Elevated Living."
              width={160}
              height={55}
              className="h-9 w-auto object-contain brightness-110"
              priority
            />
          </Link>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="relative p-2 rounded-full text-[#F7F2EA]"
              aria-label={`Shopping cart${displayCartCount > 0 ? `, ${displayCartCount} items` : ""}`}
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {displayCartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C87D55] text-[#12100F] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {displayCartCount > 9 ? "9+" : displayCartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[#F7F2EA] hover:bg-[#211B18] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Expanded Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#12100F] shadow-2xl">
            <nav className="px-5 py-4 flex flex-col gap-1.5">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-xs font-semibold px-4 py-3 rounded-xl transition-colors font-sans uppercase tracking-wider",
                      isActive
                        ? "text-[#F7F2EA] font-bold bg-[#211B18] border border-white/15"
                        : "text-[#C8BDB2] hover:text-[#F7F2EA] hover:bg-[#211B18]/60"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </Link>
                );
              })}
              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 bg-[#C87D55] text-[#12100F] text-xs font-bold uppercase tracking-widest px-4 py-3.5 rounded-full text-center hover:bg-[#E09A72] transition-colors font-sans border border-[#E09A72]/40"
              >
                Order Now
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
