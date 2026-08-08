"use client";

import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-[14px] font-medium text-[#111827]"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`h-[52px] w-full rounded-[10px] border bg-white px-4 text-[16px] text-[#111827] placeholder-[#9CA3AF] transition-colors duration-200 outline-none focus:border-[#9CA3AF] ${
          error ? "border-red-500 focus:border-red-500" : "border-[#E5E7EB]"
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-[13px] text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
