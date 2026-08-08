"use client";

import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  variant = "primary",
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center cursor-pointer h-[44px] px-6 rounded-[8px] text-[15px] font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0150FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed";

  const primary =
    "bg-[#0150FF] text-white border border-[rgba(255,255,255,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#0146E0] active:scale-[0.98] disabled:bg-[#D1D5DB] disabled:text-white";

  const secondary =
    "bg-white text-[#111827] border border-[#E5E7EB] hover:bg-[#FAFAFA] active:scale-[0.98] disabled:bg-[#FAFAFA] disabled:text-[#D1D5DB]";

  const variantClass = variant === "primary" ? primary : secondary;

  return (
    <button
      className={`${base} ${variantClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
