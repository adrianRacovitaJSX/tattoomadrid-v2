/**
 * Consent Mode v2 por defecto (todo denegado). Se inyecta como <script> inline
 * en el <head> del layout raíz para que corra antes que gtag.js.
 */
export const GA_CONSENT_DEFAULT_SCRIPT = `
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
`;
