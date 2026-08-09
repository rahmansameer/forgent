interface StepHeaderProps {
  title: string;
  subtitle?: string;
}

export default function StepHeader({ title, subtitle }: StepHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-[28px] font-semibold text-[#111827] leading-[36px]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-[16px] text-[#6B7280] leading-[24px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
