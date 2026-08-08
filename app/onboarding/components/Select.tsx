"use client";

import { type SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly SelectOption[];
  error?: string;
}

export default function Select({
  label,
  options,
  error,
  id,
  className = "",
  ...props
}: SelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={selectId}
        className="text-[14px] font-medium text-[#111827]"
      >
        {label}
      </label>
      <select
        id={selectId}
        className={`h-[52px] w-full rounded-[10px] border bg-white px-4 text-[16px] text-[#111827] transition-colors duration-200 outline-none focus:border-[#9CA3AF] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10 ${
          error ? "border-red-500 focus:border-red-500" : "border-[#E5E7EB]"
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-[13px] text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
