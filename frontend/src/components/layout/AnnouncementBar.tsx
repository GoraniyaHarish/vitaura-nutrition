"use client";

import { X, Sparkles } from "lucide-react";
import { useState } from "react";

interface AnnouncementBarProps {
  message?: string;
  dismissible?: boolean;
}

export function AnnouncementBar({
  message = "Fresh Cold-Chain Delivery across Rajkot — Order by 6 PM for Same-Day Dispatch",
  dismissible = true,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="bg-[#112419] text-[#FAF8F5] py-2 px-4 relative border-b border-[#C8A265]/20"
      role="banner"
      aria-label="Site announcement"
    >
      <div
        className="text-center text-xs flex items-center justify-center gap-2 pr-8 md:pr-0 font-manrope font-semibold tracking-wider uppercase text-[#D8B778]"
      >
        <Sparkles size={13} className="shrink-0" />
        <span>{message}</span>
      </div>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
