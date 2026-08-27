import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { InteractiveAtmosphere } from "@/components/ui/InteractiveAtmosphere";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

// --- The Culinary Atelier Google Fonts ---
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

// --- Site Metadata ---
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_VITAURA_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://vitauranutrition.com"
  ),
  title: {
    default: "Vitaura Nutrition — Pure Nutrition. Elevated Living.",
    template: "%s | Vitaura Nutrition",
  },
  description:
    "Vitaura is a premium D2C health and nutrition platform offering chef-crafted protein shakes, organic wellness bowls, and nutrient-dense power bites made from 100% whole, clean ingredients.",
  keywords: [
    "Vitaura",
    "Vitaura Nutrition",
    "pure nutrition",
    "elevated living",
    "chef crafted protein shakes",
    "organic wellness bowls",
    "nutrient dense power bites",
    "clean label nutrition",
    "whole ingredients",
    "premium D2C wellness",
  ],
  authors: [{ name: "Vitaura Nutrition" }],
  creator: "Vitaura Nutrition",
  publisher: "Vitaura Nutrition",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Vitaura Nutrition",
    title: "Vitaura Nutrition — Pure Nutrition. Elevated Living.",
    description:
      "Vitaura is a premium D2C health and nutrition platform offering chef-crafted protein shakes, organic wellness bowls, and nutrient-dense power bites made from 100% whole, clean ingredients.",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1024,
        height: 1024,
        alt: "Vitaura Nutrition — Pure Nutrition. Elevated Living.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitaura Nutrition — Pure Nutrition. Elevated Living.",
    description:
      "Chef-crafted protein shakes, organic wellness bowls, and nutrient-dense power bites made from 100% whole, clean ingredients.",
    images: ["/images/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#12100F",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#12100F] text-[#F7F2EA] font-sans selection:bg-[#C87D55] selection:text-[#12100F] relative overflow-x-hidden">
        <CartProvider>
          <NextTopLoader
            color="#C87D55"
            height={3}
            showSpinner={false}
            shadow="0 0 10px #C87D55, 0 0 5px #12100F"
            easing="cubic-bezier(0.16, 1, 0.3, 1)"
          />
          {/* Global Living Cinematic Background Canvas */}
          <InteractiveAtmosphere />
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
