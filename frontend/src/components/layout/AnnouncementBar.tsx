"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface AnnouncementBarProps {
  message?: string;
  dismissible?: boolean;
}

export function AnnouncementBar({
  message = "Chef-Crafted in Small Batches • Cold-Chain Protected Delivery Across Rajkot",
  dismissible = true,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="bg-[#1A1412] text-[#FBF9F5] py-2 px-4 relative border-b border-white/10"
      role="banner"
      aria-label="Site announcement"
    >
      <div
        className="text-center text-xs flex items-center justify-center gap-2 pr-8 md:pr-0 font-sans font-medium tracking-wide text-[#FBF9F5]/90"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#C87D55] shrink-0" aria-hidden="true" />
        <span>{message}</span>
      </div>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X size={13} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
