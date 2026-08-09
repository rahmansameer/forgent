import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started | Forgent",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-[#F3F3F3]">{children}</div>;
}
