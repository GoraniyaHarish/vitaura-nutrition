import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // --- Image Optimization ---
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 390, 430, 768, 1024, 1280, 1920],
    imageSizes: [64, 128, 256, 384, 512],
    // Production CDN domains can be added here
    remotePatterns: [],
  },

  // --- Security Headers ---
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Clickjacking protection
          { key: "X-Frame-Options", value: "DENY" },
          // XSS protection
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer Policy
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions Policy
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), payment=()",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed for Next.js dev
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "connect-src 'self' https: http://localhost:8080",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // --- Compression ---
  compress: true,

  // --- Power optimizations ---
  poweredByHeader: false,

  // --- Experimental ---
  experimental: {
    // Enable optimizePackageImports for framer-motion
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
