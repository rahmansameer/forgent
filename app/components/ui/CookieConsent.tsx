"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Button from "@/app/components/ui/Button";

type CookiePrefs = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_STORAGE_KEY = "forgent-cookie-consent";
const CONSENT_CHANGE_EVENT = "forgent-cookie-consent-change";

function subscribeToConsentChanges(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getConsentVisibility() {
  return (
    typeof window !== "undefined" &&
    localStorage.getItem(CONSENT_STORAGE_KEY) === null
  );
}

function getServerConsentVisibility() {
  return false;
}

function saveConsent(preferences: CookiePrefs) {
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export default function CookieConsent() {
  const visible = useSyncExternalStore(
    subscribeToConsentChanges,
    getConsentVisibility,
    getServerConsentVisibility,
  );

  function acceptAll() {
    const all: CookiePrefs = {
      necessary: true,
      analytics: true,
      marketing: true,
    };

    saveConsent(all);
  }

  function rejectAll() {
    const necessaryOnly: CookiePrefs = {
      necessary: true,
      analytics: false,
      marketing: false,
    };

    saveConsent(necessaryOnly);
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
