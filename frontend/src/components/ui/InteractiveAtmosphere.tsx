"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function InteractiveAtmosphere() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  // Normalized pointer coordinates (-1 to 1)
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  // Layer A: Primary Responsive Spring (Fast, responsive follow - Terracotta Spotlight)
  const springA_X = useSpring(targetX, { damping: 35, stiffness: 80, mass: 1.0 });
  const springA_Y = useSpring(targetY, { damping: 35, stiffness: 80, mass: 1.0 });

  // Layer B: Delayed Counter-Parallax Spring (Heavier mass, inverted lag - Amber Glow)
  const targetB_X = useMotionValue(0);
  const targetB_Y = useMotionValue(0);
  const springB_X = useSpring(targetB_X, { damping: 48, stiffness: 45, mass: 2.0 });
  const springB_Y = useSpring(targetB_Y, { damping: 48, stiffness: 45, mass: 2.0 });

  // Layer C: Deep Volumetric Tilt Spring (Heavy atmosphere - Shadow & Specular)
  const targetC_X = useMotionValue(0);
  const targetC_Y = useMotionValue(0);
  const springC_X = useSpring(targetC_X, { damping: 60, stiffness: 30, mass: 2.6 });
  const springC_Y = useSpring(targetC_Y, { damping: 60, stiffness: 30, mass: 2.6 });

  // Idle decay timer ref
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || shouldReduceMotion) return;

    // Visibility listener for tab backgrounding to save resources
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const { innerWidth, innerHeight } = window;
      // Normalized from -1 (left/top) to +1 (right/bottom)
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;

      // Layer A: Direct displacement (+55px)
      targetX.set(nx * 55);
      targetY.set(ny * 55);

      // Layer B: Counter-parallax displacement (-35px)
      targetB_X.set(nx * -35);
      targetB_Y.set(ny * -35);

      // Layer C: Deep subtle displacement (+25px)
      targetC_X.set(nx * 25);
      targetC_Y.set(ny * 25);

      // Reset smooth return to equilibrium when user stops moving for > 4 seconds
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        targetX.set(0);
        targetY.set(0);
        targetB_X.set(0);
        targetB_Y.set(0);
        targetC_X.set(0);
        targetC_Y.set(0);
      }, 4000);
    };

    const handleMouseLeave = () => {
      targetX.set(0);
      targetY.set(0);
      targetB_X.set(0);
      targetB_Y.set(0);
      targetC_X.set(0);
      targetC_Y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [shouldReduceMotion, targetX, targetY, targetB_X, targetB_Y, targetC_X, targetC_Y]);

  // Reduced Motion Fallback: Pure static atmospheric dark canvas
  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 50% 35%, rgba(200, 125, 85, 0.22), transparent 70%),
              radial-gradient(circle 50% at 80% 65%, rgba(217, 119, 6, 0.14), transparent 60%),
              radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, #12100F 100%),
              #12100F
            `,
          }}
        />
      </div>
    );
  }

  // Full Desktop Experience: Visible Autonomous Ambient Motion + Multi-Layer Spring Cursor Parallax
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-[#12100F]">
      
      {/* ── Layer 1: Base Nocturnal Smoked Cacao Foundation ── */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(circle 85% at 50% 30%, rgba(26, 20, 18, 0.95), transparent 85%),
            radial-gradient(circle 70% at 50% 90%, rgba(13, 11, 10, 0.98), #12100F)
          `,
        }}
      />

      {/* ── Layer 2: Primary Tuscan Terracotta Living Light Field ── */}
      {/* Spring Physics Wrapper A */}
      <motion.div
        className="absolute w-[140vw] h-[140vh] -top-[20vh] -left-[20vw] pointer-events-none will-change-transform"
        style={{
          x: springA_X,
          y: springA_Y,
        }}
      >
        {/* Continuous Autonomous Drifting Terracotta Light Field (24s cycle) */}
        <motion.div
          className="w-full h-full opacity-65 blur-[95px]"
          animate={
            isVisible
              ? {
                  x: [0, 65, -45, 35, 0],
                  y: [0, -50, 40, -25, 0],
                  scale: [1, 1.18, 0.92, 1.10, 1],
                  rotate: [0, 8, -6, 4, 0],
                }
              : {}
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 48% 38%, rgba(200, 125, 85, 0.35) 0%, rgba(200, 125, 85, 0.12) 45%, rgba(200, 125, 85, 0.02) 68%, transparent 78%)
            `,
          }}
        />
      </motion.div>

      {/* ── Layer 3: Secondary Amber Honey Botanical Warmth (Counter-Parallax) ── */}
      {/* Spring Physics Wrapper B */}
      <motion.div
        className="absolute w-[130vw] h-[130vh] -top-[15vh] -left-[15vw] pointer-events-none will-change-transform"
        style={{
          x: springB_X,
          y: springB_Y,
        }}
      >
        {/* Continuous Autonomous Drifting Amber Field (31s out-of-phase cycle) */}
        <motion.div
          className="w-full h-full opacity-55 blur-[105px]"
          animate={
            isVisible
              ? {
                  x: [0, -70, 50, -35, 0],
                  y: [0, 55, -45, 25, 0],
                  scale: [1.10, 0.90, 1.20, 0.95, 1.10],
                  rotate: [0, -12, 10, -5, 0],
                }
              : {}
          }
          transition={{
            duration: 31,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: `
              radial-gradient(circle 52% at 68% 46%, rgba(217, 119, 6, 0.28) 0%, rgba(217, 119, 6, 0.08) 48%, rgba(217, 119, 6, 0.01) 68%, transparent 78%)
            `,
          }}
        />
      </motion.div>

      {/* ── Layer 4: Deep Volumetric Shadow & Espresso Contrast ── */}
      <motion.div
        className="absolute w-[120vw] h-[120vh] -top-[10vh] -left-[10vw] pointer-events-none will-change-transform"
        style={{
          x: springC_X,
          y: springC_Y,
        }}
      >
        <motion.div
          className="w-full h-full opacity-55 blur-[80px]"
          animate={
            isVisible
              ? {
                  x: [0, 45, -55, 20, 0],
                  y: [0, 40, -30, 15, 0],
                  scale: [0.94, 1.12, 0.90, 1.05, 0.94],
                }
              : {}
          }
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: `
              radial-gradient(ellipse 50% 60% at 26% 68%, rgba(26, 20, 18, 0.92) 0%, rgba(18, 16, 15, 0.55) 45%, transparent 72%)
            `,
          }}
        />
      </motion.div>

      {/* ── Layer 5: Warm Bone Specular Core (Subtle Breathing Culinary Spotlight) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={
          isVisible
            ? {
                opacity: [0.04, 0.09, 0.035, 0.08, 0.04],
                scale: [0.96, 1.06, 0.94, 1.04, 0.96],
              }
            : {}
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `
            radial-gradient(ellipse 40% 35% at 50% 40%, rgba(247, 242, 234, 0.15) 0%, rgba(247, 242, 234, 0.03) 50%, transparent 75%)
          `,
        }}
      />

      {/* ── Layer 6: Film Editorial Micro-Texture (Cinematic Depth Grain) ── */}
      <motion.div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        animate={
          isVisible
            ? {
                opacity: [0.025, 0.045, 0.028, 0.042, 0.025],
              }
            : {}
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `radial-gradient(rgba(247, 242, 234, 0.20) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Layer 7: Master Vignette Framing (Focus Center Atmosphere) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, #12100F 100%)",
        }}
      />

    </div>
  );
}
