import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Forgent",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-[#F3F3F3]">{children}</div>;
}
