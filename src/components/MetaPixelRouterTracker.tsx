import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
  }
}

function isMetaReady() {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

function trackPageView() {
  if (!isMetaReady()) return;
  window.fbq!('track', 'PageView');
}

function trackOncePerSession(
  eventName: 'Lead' | 'CompleteRegistration',
  key: string,
  payload: Record<string, unknown>
) {
  if (!isMetaReady() || typeof window === 'undefined') return;
  if (window.sessionStorage.getItem(key) === '1') return;
  window.fbq!('track', eventName, payload);
  window.sessionStorage.setItem(key, '1');
}

/**
 * Globaler SPA-Tracker für Meta Pixel.
 * - Feuert PageView bei jedem Routenwechsel (BASE-Pageview wird bereits initial vom fbq('track','PageView') im loader gesetzt).
 * - Feuert Lead / CompleteRegistration einmal pro Session auf den Danke-Seiten.
 */
export function MetaPixelRouterTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView();

    if (location.pathname === '/danke/kontakt') {
      trackOncePerSession('Lead', 'meta_lead_tracked_danke_kontakt', {
        content_name: 'Potenzialanalyse Anfrage',
        content_category: 'High Intent Consulting Lead',
        value: 1,
        currency: 'EUR',
      });
    }

    if (location.pathname === '/danke/posteingang') {
      trackOncePerSession('Lead', 'meta_lead_tracked_danke_posteingang', {
        content_name: 'Briefpost-Eingangsautomatisierung Anfrage',
        content_category: 'High Intent Automation Lead',
        value: 1,
        currency: 'EUR',
      });
    }
  }, [location.pathname, location.search]);

  return null;
}
