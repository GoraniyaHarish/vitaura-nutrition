import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility: merge Tailwind classes safely, resolving conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in Indian Rupees (₹)
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Build WhatsApp click-to-chat URL
 * Number must be in international format without +
 * e.g. 919876543210 for +91 98765 43210
 */
export function buildWhatsAppUrl(
  number: string,
  message?: string
): string {
  const encoded = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${number}${encoded ? `?text=${encoded}` : ""}`;
}

/**
 * Slugify a string for clean URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}
