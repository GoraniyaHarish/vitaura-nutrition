import type { Metadata, Viewport } from "next";
import { Manrope, Merriweather } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

// --- Self-hosted Fonts ---
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "600", "700"],
  preload: true,
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
  weight: ["400", "700"],
  preload: true,
});

// --- Site Metadata ---
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://gronliv.in"
  ),
  title: {
    default: "GronLiv 🧋 — Eat Better. Live Better. | Fresh Nutrition Shakes in Rajkot",
    template: "%s | GronLiv",
  },
  description:
    "Freshly prepared premium nutrition shakes made with real ingredients. No artificial preservatives. Delivered across Rajkot, Gujarat. Eat Better. Live Better.",
  keywords: [
    "GronLiv",
    "nutrition shakes Rajkot",
    "fresh protein shakes",
    "healthy shakes Rajkot",
    "fresh nutrition delivery",
    "healthy everyday fuel",
    "premium nutrition drinks",
    "Rajkot food delivery",
    "fresh shakes Gujarat",
    "no preservatives protein shake",
  ],
  authors: [{ name: "GronLiv" }],
  creator: "GronLiv",
  publisher: "GronLiv",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "GronLiv",
    title: "GronLiv 🧋 — Eat Better. Live Better.",
    description:
      "Freshly prepared premium nutrition shakes made with real ingredients. No artificial preservatives. Delivered across Rajkot.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GronLiv — Fresh Premium Nutrition Shakes in Rajkot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GronLiv 🧋 — Eat Better. Live Better.",
    description:
      "Freshly prepared premium nutrition shakes made with real ingredients. Delivered across Rajkot.",
    images: ["/og-image.jpg"],
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
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Rajkot",
    "geo.position": "22.3039;70.8022",
    "ICBM": "22.3039, 70.8022",
  },
};

export const viewport: Viewport = {
  themeColor: "#154212",
  colorScheme: "light",
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
    <html lang="en" className={`${manrope.variable} ${merriweather.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#FAF8F5] text-[#112419]">
        <NextTopLoader
          color="#C8A265"
          height={3}
          showSpinner={false}
          shadow="0 0 10px #C8A265, 0 0 5px #FAF8F5"
          easing="cubic-bezier(0.16, 1, 0.3, 1)"
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
