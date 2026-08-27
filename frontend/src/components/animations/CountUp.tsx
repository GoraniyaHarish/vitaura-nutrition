"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number; // duration in seconds
  delay?: number; // delay in seconds
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  delay = 0,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const [value, setValue] = useState(shouldReduceMotion ? to : from);

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Out-Expo easing for smooth organic deceleration
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        const currentValue = from + (to - from) * (progress === 1 ? 1 : easeOutExpo);
        
        setValue(currentValue);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setValue(to);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, from, to, duration, delay, shouldReduceMotion]);

  const formattedValue = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <span ref={ref} className={`inline-block tabular-nums ${className}`}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
