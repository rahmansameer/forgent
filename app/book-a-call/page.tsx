import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call | Forgent Systems",
  description:
    "Schedule a discovery call with Forgent Systems to discuss building a custom AI system tailored to your business and goals.",
};

export default function BookACallPage() {
  return (
    <iframe
      src="https://cal.com/forgentsystems/discovery-call"
      title="Book a discovery call"
      className="h-screen w-full border-0"
    />
  );
}
