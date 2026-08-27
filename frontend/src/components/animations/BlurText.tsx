"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import React from "react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

export function BlurText({
  text = "",
  className = "",
  delay = 80,
  animateBy = "words",
  direction = "bottom",
  threshold = 0.1,
  rootMargin = "-50px",
  style,
  as: Component = "span",
}: BlurTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  if (shouldReduceMotion) {
    return (
      <Component className={className} style={style}>
        {text}
      </Component>
    );
  }

  const yOffset = direction === "top" ? -18 : 18;

  const defaultTransition: Transition = {
    type: "spring",
    damping: 24,
    stiffness: 180,
  };

  return (
    <Component
      className={`inline-block ${className}`}
      style={style}
      aria-label={text}
    >
      <span aria-hidden="true" className="inline-block">
        {elements.map((segment, index) => (
          <motion.span
            key={index}
            initial={{
              filter: "blur(10px)",
              opacity: 0,
              y: yOffset,
            }}
            whileInView={{
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true, amount: threshold, margin: rootMargin }}
            transition={{
              ...defaultTransition,
              delay: (index * delay) / 1000,
            }}
            className="inline-block whitespace-pre will-change-[transform,opacity,filter]"
          >
            {segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        ))}
      </span>
    </Component>
  );
}
