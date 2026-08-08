"use client";

import { useRouter } from "next/navigation";
import Button from "../../components/ui/Button";

export default function SuccessState() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-6">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M8 16.5L13.5 22L24 11"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="text-[40px] font-semibold text-[#111827] leading-[48px] mb-4">
        Thank you!
      </h2>
      <p className="text-[16px] text-[#6B7280] leading-[24px] max-w-[350px] mb-8">
        We have received your inquiry and will get back to you within 24 to 48
        hours.
      </p>
      <Button onClick={() => router.push("/")}>Back to Home</Button>
    </div>
  );
}
