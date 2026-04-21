import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteData } from '@/data/siteData';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  /** Override the canonical URL (defaults to the current pathname). */
  canonicalPath?: string;
  /** Optional JSON-LD object — will be embedded as application/ld+json. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Set to true to discourage indexing (e.g. for /auth, /admin). */
  noIndex?: boolean;
}

const SITE_URL = 'https://jan-sommershoff.de';
const DEFAULT_OG = `${SITE_URL}/og-image.png`;

/**
 * SEO meta-tag manager. Handles title, description, Open Graph, Twitter,
 * canonical, robots and optional JSON-LD structured data.
 */
export function SEOHead({
  title,
  description,
  image = DEFAULT_OG,
  type = 'website',
  canonicalPath,
  jsonLd,
  noIndex = false,
}: SEOHeadProps) {
  const location = useLocation();

  const fullTitle = title
    ? `${title} | ${siteData.name}`
    : `${siteData.name} – ${siteData.tagline}`;

  const fullDescription = description || siteData.heroSubheadline;
  const path = canonicalPath ?? location.pathname;
  const canonicalUrl = `${SITE_URL}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', fullDescription);
    setMeta('author', siteData.name);
    setMeta(
      'keywords',
      'Jan Sommershoff, KI Beratung, Künstliche Intelligenz Unternehmer, Automatisierung, Prozessoptimierung, KI-Strategie, Datensicherheit, Digitalisierung Mittelstand',
    );
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', fullDescription, true);
    setMeta('og:type', type, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:image', image, true);
    setMeta('og:site_name', siteData.name, true);
    setMeta('og:locale', 'de_DE', true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', fullDescription);
    setMeta('twitter:image', image);

    // Canonical
    let canonical = document.head.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // JSON-LD
    const existing = document.head.querySelector(
      'script[data-seo-jsonld="true"]',
    );
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo-jsonld', 'true');
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [fullTitle, fullDescription, canonicalUrl, image, type, noIndex, jsonLd]);

  return null;
}
