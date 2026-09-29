import { type ReactNode } from "react";

interface FormCardProps {
  children: ReactNode;
}

export default function FormCard({ children }: FormCardProps) {
  return (
    <div className="bg-white border border-[#DBDBDB] rounded-2xl p-5 sm:p-8 lg:p-10">
      {children}
    </div>
  );
}
