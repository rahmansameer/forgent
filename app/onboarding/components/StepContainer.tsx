"use client";

import { type ReactNode } from "react";
import Progress from "./Progress";

interface StepContainerProps {
  currentStep: number;
  totalSteps: number;
  children: ReactNode;
}

export default function StepContainer({
  currentStep,
  totalSteps,
  children,
}: StepContainerProps) {
  return (
    <div className="w-full max-w-[720px] mx-auto pt-[72px] pb-[120px] px-4 sm:px-8">
      <div className="mb-8">
        <Progress currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      {children}
    </div>
  );
}
