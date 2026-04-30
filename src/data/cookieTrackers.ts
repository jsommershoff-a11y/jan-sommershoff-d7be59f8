/**
 * Cookie-Tracker-Register
 * ---------------------------------------
 * Standardisierte Anzeige aller Tracker im Cookie-Banner.
 *
 * Pflegehinweis:
 *   • Neuer Drittanbieter mit PII-Zugriff → ZUERST in `avvRegistry.ts` ergänzen,
 *     dann hier per `avvId` referenzieren. So bleiben Cookie-Banner,
 *     AVV-Register und Datenschutz-Seite konsistent.
 *
 * Die `category` steuert, in welchem Consent-Block der Tracker erscheint.
 */

import { AVV_REGISTRY, type AvvEntry } from './avvRegistry';

export type TrackerCategory = 'necessary' | 'analytics' | 'marketing';

export type Tracker = {
  /** Verweis auf einen Eintrag im AVV-Registry (Single Source of Truth). */
  avvId: string;
  category: TrackerCategory;
  /** Kurzname für die Cookie-Banner-Liste (überschreibt avv.service). */
  displayName: string;
  /** 1 Satz: was tut dieser Tracker konkret? */
  shortPurpose: string;
  /** Cookie-/Storage-Lebensdauer (kurz, menschlich lesbar). */
  retention: string;
};

export const TRACKERS: Tracker[] = [
  // ── Notwendig ────────────────────────────────────────────────
  {
    avvId: 'supabase',
    category: 'necessary',
    displayName: 'Supabase Session',
    shortPurpose: 'Sicherheits-Token & Formular-Submission (kein Tracking).',
    retention: 'Session',
  },
  {
    avvId: 'lovable',
    category: 'necessary',
    displayName: 'Hosting / CDN',
    shortPurpose: 'Auslieferung der Website über Edge-CDN.',
    retention: 'Session',
  },

  // ── Analyse ──────────────────────────────────────────────────
  {
    avvId: 'google',
    category: 'analytics',
    displayName: 'Google Analytics 4 (via GTM)',
    shortPurpose: 'Anonymisierte Reichweitenmessung & Seitenaufrufe.',
    retention: 'bis zu 14 Monate',
  },

  // ── Marketing ────────────────────────────────────────────────
  {
    avvId: 'meta',
    category: 'marketing',
    displayName: 'Meta Pixel',
    shortPurpose: 'Conversion-Tracking & Remarketing (Facebook/Instagram).',
    retention: 'bis zu 90 Tage',
  },
  {
    avvId: 'apollo',
    category: 'marketing',
    displayName: 'Apollo.io Website-Tracker',
    shortPurpose: 'B2B-Besucher-Identifikation via Reverse-IP-Lookup.',
    retention: 'bis zu 12 Monate',
  },
];

export type EnrichedTracker = Tracker & { avv: AvvEntry };

/** Liefert alle Tracker einer Kategorie, angereichert mit den AVV-Daten. */
export function getTrackersByCategory(
  category: TrackerCategory,
): EnrichedTracker[] {
  return TRACKERS.filter((t) => t.category === category)
    .map((t) => {
      const avv = AVV_REGISTRY.find((a) => a.id === t.avvId);
      return avv ? { ...t, avv } : null;
    })
    .filter((x): x is EnrichedTracker => x !== null);
}
