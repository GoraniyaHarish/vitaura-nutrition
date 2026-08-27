"use client";

import React, { useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(217, 119, 6, 0.09)", // Warm amber glow
  spotlightSize = 350,
  ...props
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || shouldReduceMotion) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty("--spotlight-x", `${x}px`);
      containerRef.current.style.setProperty("--spotlight-y", `${y}px`);
    },
    [shouldReduceMotion]
  );

  const handleMouseEnter = useCallback(() => {
    if (!shouldReduceMotion) setIsHovered(true);
  }, [shouldReduceMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Interactive Spotlight Radial Overlay */}
      {!shouldReduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(${spotlightSize}px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${spotlightColor}, transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
