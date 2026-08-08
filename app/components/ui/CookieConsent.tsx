"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/app/components/ui/Button";

type CookiePrefs = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("forgent-cookie-consent");
    if (!saved) {
      setVisible(true);
    }
  }, []);

  function acceptAll() {
    const all: CookiePrefs = {
      necessary: true,
      analytics: true,
      marketing: true,
    };

    localStorage.setItem("forgent-cookie-consent", JSON.stringify(all));
    setVisible(false);
  }

  function rejectAll() {
    const necessaryOnly: CookiePrefs = {
      necessary: true,
      analytics: false,
      marketing: false,
    };

    localStorage.setItem(
      "forgent-cookie-consent",
      JSON.stringify(necessaryOnly),
    );
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[999]">
      <div className="max-w-sm rounded-xl border border-gray-200 bg-white px-6 py-5">
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          We use cookies to improve your experience. Read our{" "}
          <Link
            href="/legal/privacy-policy"
            className="text-gray-900 underline hover:opacity-80"
          >
            Cookie Policy
          </Link>
          .
        </p>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={rejectAll} className="h-10 px-4">
            Reject
          </Button>

          <Button onClick={acceptAll} className="h-10 px-4">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
