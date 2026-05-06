"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-YWHV6CQSM6";
const COOKIE_CONSENT_KEY = "cookie-consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: number;
}

const readConsent = (): CookieConsent | null => {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
};

const applyConsent = (consent: CookieConsent | null) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: consent?.analytics ? "granted" : "denied",
    ad_storage: consent?.advertising ? "granted" : "denied",
    ad_user_data: consent?.advertising ? "granted" : "denied",
    ad_personalization: consent?.advertising ? "granted" : "denied",
  });
};

const GoogleAnalytics = () => {
  useEffect(() => {
    applyConsent(readConsent());

    const handleConsentUpdate = () => applyConsent(readConsent());
    window.addEventListener("cookie-consent-updated", handleConsentUpdate);
    window.addEventListener("storage", (e) => {
      if (e.key === COOKIE_CONSENT_KEY) handleConsentUpdate();
    });
    return () => {
      window.removeEventListener("cookie-consent-updated", handleConsentUpdate);
    };
  }, []);

  return (
    <>
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
