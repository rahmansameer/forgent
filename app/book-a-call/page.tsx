import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call | Forgent",
};

export default function BookACallPage() {
  return (
    <main className="w-full h-screen">
      <iframe
        src="https://cal.com/forgentsystems/book-a-call"
        className="w-full h-full border-0"
        allow="camera; microphone; fullscreen"
        loading="lazy"
      />
    </main>
  );
}
