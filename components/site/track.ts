/**
 * Eventos de conversión para GA4. gtag respeta el consentimiento de cookies
 * configurado en components/google-analytics.tsx; si no hay gtag, no hace nada.
 */
export type ConversionEvent =
  | 'whatsapp_click'
  | 'call_click'
  | 'directions_click'
  | 'portfolio_filter'
  | 'portfolio_open'
  | 'booking_cta_click';

export function track(event: ConversionEvent, params: Record<string, string> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, { page_path: window.location.pathname, ...params });
}
