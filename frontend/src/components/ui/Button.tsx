import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#154212] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variants = {
      primary:
        "bg-[#154212] text-white hover:bg-[#2d5a27] active:scale-[0.98] shadow-sm",
      secondary:
        "border-2 border-[#154212] text-[#154212] bg-transparent hover:bg-[#154212]/5 active:scale-[0.98]",
      ghost:
        "text-[#154212] hover:bg-[#154212]/8 active:scale-[0.98]",
    };

    const sizes = {
      sm: "text-xs px-4 py-2 tracking-wider",
      md: "text-sm px-6 py-3 tracking-wider",
      lg: "text-sm px-8 py-4 tracking-wider",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        aria-busy={loading}
        style={{ fontFamily: "var(--font-manrope)" }}
        {...props}
      >
        {loading ? (
          <>
            <span
              className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
              aria-hidden="true"
            />
            <span>Loading…</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
