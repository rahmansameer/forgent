"use client";

import { type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  id,
  className = "",
  ...props
}: TextareaProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-[14px] font-medium text-[#111827]"
      >
        {label}
      </label>
      <textarea
        id={inputId}
        rows={4}
        className={`w-full rounded-[10px] border bg-white px-4 py-3 text-[16px] text-[#111827] placeholder-[#9CA3AF] transition-colors duration-200 outline-none focus:border-[#9CA3AF] resize-none ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-[#E5E7EB]"
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
