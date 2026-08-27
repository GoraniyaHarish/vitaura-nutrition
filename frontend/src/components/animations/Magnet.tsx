"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Distance multiplier (0.1 to 0.4)
  radius?: number; // Interaction radius in pixels
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
}

export function Magnet({
  children,
  className = "",
  strength = 0.18,
  radius = 90,
  springConfig = { damping: 16, stiffness: 150, mass: 0.4 },
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        !ref.current ||
        shouldReduceMotion ||
        (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches)
      )
        return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < radius) {
        // Subtle restrained pull (max 10px displacement)
        const pullX = Math.max(-10, Math.min(10, distanceX * strength));
        const pullY = Math.max(-10, Math.min(10, distanceY * strength));
        setPosition({ x: pullX, y: pullY });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    },
    [shouldReduceMotion, radius, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  if (shouldReduceMotion) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        damping: springConfig.damping,
        stiffness: springConfig.stiffness,
        mass: springConfig.mass,
      }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
