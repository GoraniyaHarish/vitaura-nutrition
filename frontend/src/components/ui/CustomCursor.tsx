"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  AnimatePresence,
} from "framer-motion";

type CursorState = "default" | "hover" | "view" | "drag" | "text";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  // Mouse Coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Velocity Calculation for fluid squish dynamics
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  // Spring physics interpolation
  const springX = useSpring(mouseX, { damping: 28, stiffness: 350, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 350, mass: 0.5 });

  const [angle, setAngle] = useState(0);
  const [stretch, setStretch] = useState(1);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const vx = velocityX.get();
      const vy = velocityY.get();
      const speed = Math.sqrt(vx * vx + vy * vy);

      const dynamicStretch = Math.min(1 + speed / 1800, 1.45);
      setStretch(dynamicStretch);

      if (speed > 40) {
        const rad = Math.atan2(vy, vx);
        setAngle((rad * 180) / Math.PI);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const viewTarget = target.closest("[data-cursor='view']");
      const dragTarget = target.closest("[data-cursor='drag']");
      const textTarget = target.closest("h1, h2, h3, p, [data-cursor='text']");
      const interactiveTarget = target.closest(
        "button, a, input, select, textarea, [data-cursor='pointer']"
      );

      if (viewTarget) {
        setCursorState("view");
        setCursorLabel("DISCOVER");
      } else if (dragTarget) {
        setCursorState("drag");
        setCursorLabel("EXPLORE");
      } else if (interactiveTarget) {
        setCursorState("hover");
        setCursorLabel("");
      } else if (textTarget && !target.closest("button, a")) {
        setCursorState("text");
        setCursorLabel("");
      } else {
        setCursorState("default");
        setCursorLabel("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, velocityX, velocityY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden hidden md:block select-none">
      {/* 1. Ambient Gold Glow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full blur-[14px] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorState === "hover" ? 90 : cursorState === "view" ? 120 : 45,
          height: cursorState === "hover" ? 90 : cursorState === "view" ? 120 : 45,
          backgroundColor:
            cursorState === "view"
              ? "rgba(200, 162, 101, 0.28)"
              : cursorState === "hover"
              ? "rgba(17, 36, 25, 0.22)"
              : "rgba(200, 162, 101, 0.12)",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* 2. Fluid Capsule & Morphology */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center backdrop-blur-[3px]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: cursorState === "default" ? angle : 0,
          scaleX: cursorState === "default" ? stretch : 1,
          scaleY: cursorState === "default" ? 1 / (stretch * 0.9) : 1,
        }}
        animate={{
          width:
            cursorState === "view"
              ? 96
              : cursorState === "drag"
              ? 84
              : cursorState === "hover"
              ? 52
              : cursorState === "text"
              ? 4
              : 20,
          height:
            cursorState === "view"
              ? 96
              : cursorState === "drag"
              ? 84
              : cursorState === "hover"
              ? 52
              : cursorState === "text"
              ? 26
              : 20,
          borderRadius:
            cursorState === "text"
              ? "2px"
              : cursorState === "view" || cursorState === "drag"
              ? "50%"
              : cursorState === "hover"
              ? "16px"
              : "50%",
          backgroundColor:
            cursorState === "view"
              ? "#112419"
              : cursorState === "drag"
              ? "#C8A265"
              : cursorState === "text"
              ? "#C8A265"
              : cursorState === "hover"
              ? "rgba(200, 162, 101, 0.25)"
              : "rgba(200, 162, 101, 0.9)",
          border:
            cursorState === "view"
              ? "1.5px solid #C8A265"
              : cursorState === "hover"
              ? "1px solid rgba(200, 162, 101, 0.8)"
              : "none",
          boxShadow:
            cursorState === "view"
              ? "0 16px 36px rgba(17, 36, 25, 0.35)"
              : "0 4px 12px rgba(200, 162, 101, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
      >
        <AnimatePresence>
          {cursorLabel && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="flex flex-col items-center justify-center pointer-events-none"
            >
              <span className="font-serif text-[10px] tracking-[0.25em] font-medium uppercase text-[#FAF8F5]">
                {cursorLabel}
              </span>
              <div className="w-4 h-[1px] bg-[#C8A265] mt-1 opacity-80" />
            </motion.div>
          )}
        </AnimatePresence>

        {cursorState === "hover" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-1.5 h-1.5 rotate-45 bg-[#C8A265]"
          />
        )}
      </motion.div>
    </div>
  );
}
