"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingBag, Contact } from "lucide-react";
import { cn } from "@/lib/utils";

const BOTTOM_NAV_ITEMS = [
  {
    href: "/",
    label: "Home",
    icon: Home,
    exact: true,
  },
  {
    href: "/menu",
    label: "Menu",
    icon: UtensilsCrossed,
    exact: false,
  },
  {
    href: "/cart",
    label: "Cart",
    icon: ShoppingBag,
    exact: false,
  },
  {
    href: "/contact",
    label: "Support",
    icon: Contact,
    exact: false,
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#12100F]/95 backdrop-blur-md border-t border-white/10 safe-area-bottom shadow-[0_-8px_24px_rgba(0,0,0,0.6)]"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-stretch justify-around px-2 py-1.5" role="list">
        {BOTTOM_NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname.startsWith(href) && href !== "/";
          const isHome = exact && pathname === "/";
          const active = isActive || isHome;

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-xl transition-all duration-200 min-h-[48px]",
                  active
                    ? "text-[#F7F2EA] bg-[#211B18] font-bold"
                    : "text-[#91857B] hover:text-[#F7F2EA]"
                )}
                aria-label={label}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  size={19}
                  strokeWidth={active ? 2.25 : 1.75}
                  className={cn(active ? "text-[#C87D55]" : "text-[#91857B]")}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "text-[10px] leading-none tracking-wide font-sans",
                    active ? "font-bold text-[#F7F2EA]" : "font-medium text-[#91857B]"
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
