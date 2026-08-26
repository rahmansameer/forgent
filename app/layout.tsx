import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const metadata: Metadata = {
  title: "Forgent | AI-Powered Business Systems",
  description:
    "Forgent help businesses automate sales, customer support, reporting, and operations with AI systems.",

  openGraph: {
    url: "https://forgentsystems.com",
    siteName: "Forgent",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  icons: {
    icon: "/favicon.ico",
  },

  metadataBase: new URL("https://forgentsystems.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
