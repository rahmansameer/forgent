import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Forgent",
  description:
    "Let's discuss how AI-powered systems can help your business. Fill out the form, and we'll get back to you soon.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-[#F3F3F3]">{children}</div>;
}
