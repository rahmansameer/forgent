import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | Forgent",
  description:
    "Start your AI automation project with forgent. Tell us about your business and we'll build the right solution for you.",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-[#F3F3F3]">{children}</div>;
}
