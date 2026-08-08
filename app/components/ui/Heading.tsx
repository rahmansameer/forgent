import { ReactNode } from "react";

export default function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
      {children}
    </h2>
  );
}
