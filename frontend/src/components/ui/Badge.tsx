import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "default" | "featured";
  className?: string;
}

/**
 * Dietary tag / chip — matches Stitch design
 * Background: #F1EDE4 (warm beige), Text: #3d563a (forest green)
 */
export function Badge({ label, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider",
        variant === "default"
          ? "bg-[#F1EDE4] text-[#3d563a]"
          : "bg-[#154212] text-white",
        className
      )}
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      {label}
    </span>
  );
}
