"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const cartCount = 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ── Desktop Navigation ── */}
      <header
        className={cn(
          "hidden md:flex sticky top-0 z-50 w-full transition-all duration-300",
          "border-b border-[#183324]/8",
          scrolled
            ? "bg-[#FAF8F5]/94 backdrop-blur-md shadow-sm py-1.5"
            : "bg-[#FAF8F5]/88 backdrop-blur-sm py-2.5"
        )}
      >
        <nav
          className="container-gronliv flex items-center justify-between h-16 w-full"
          aria-label="Main navigation"
        >
          {/* Prominent Official Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group py-1"
            aria-label="GronLiv — Home"
          >
            <Image
              src="/images/logo.jpg"
              alt="GronLiv — Eat Better. Live Better."
              width={220}
              height={85}
              className="h-12 md:h-14 w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>

          {/* Nav Links */}
          <ul className="flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "text-label-md px-4 py-2.5 rounded-xl transition-all duration-200 font-manrope uppercase tracking-wider text-xs font-bold",
                      isActive
                        ? "text-[#112419] bg-[#183324]/10 font-bold"
                        : "text-[#48544D] hover:text-[#112419] hover:bg-[#183324]/6"
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
              className="relative p-2.5 rounded-full text-[#112419] hover:bg-[#183324]/10 transition-colors"
              aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
            >
              <ShoppingCart size={22} strokeWidth={2} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 bg-[#C8A265] text-[#112419] text-[10px] font-extrabold rounded-full w-4.5 h-4.5 flex items-center justify-center animate-pulse"
                  aria-hidden="true"
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* Order Now CTA */}
            <Link
              href="/menu"
              className="bg-[#112419] text-[#FAF8F5] hover:bg-[#183324] text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all shadow-xs font-manrope border border-[#C8A265]/20 cursor-pointer"
            >
              Order Now
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Mobile Navigation Top Bar ── */}
      <header className="md:hidden sticky top-0 z-50 bg-[#FAF8F5]/94 backdrop-blur-md border-b border-[#183324]/8 shadow-xs">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Visibly Large Mobile Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="GronLiv — Home"
          >
            <Image
              src="/images/logo.jpg"
              alt="GronLiv — Eat Better. Live Better."
              width={180}
              height={70}
              className="h-11 w-auto object-contain mix-blend-multiply"
              priority
            />
          </Link>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative p-2 rounded-full text-[#112419]"
              aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
            >
              <ShoppingCart size={22} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C8A265] text-[#112419] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[#112419] hover:bg-[#183324]/10 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Expanded Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-[#183324]/8 bg-[#FAF8F5] shadow-lg">
            <nav className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "text-label-md px-4 py-3 rounded-xl transition-colors font-manrope font-semibold text-sm",
                      isActive
                        ? "text-[#112419] font-bold bg-[#183324]/10"
                        : "text-[#48544D] hover:text-[#112419] hover:bg-[#183324]/6"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </Link>
                );
              })}
              <Link
                href="/menu"
                className="mt-3 bg-[#112419] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest px-4 py-3.5 rounded-xl text-center hover:bg-[#183324] transition-colors font-manrope"
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
