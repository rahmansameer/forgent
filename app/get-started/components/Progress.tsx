"use client";

interface ProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function Progress({ currentStep, totalSteps }: ProgressProps) {
  return (
    <div className="w-full" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps} aria-label={`Step ${currentStep} of ${totalSteps}`}>
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < currentStep - 1
                ? "bg-[#0150FF]"
                : i === currentStep - 1
                  ? "bg-[#0150FF]"
                  : "bg-[#E5E7EB]"
            }`}
          />
        ))}
      </div>
      <p className="text-[13px] text-[#6B7280]">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
