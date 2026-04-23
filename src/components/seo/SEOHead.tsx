import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteData } from '@/data/siteData';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  /** Optional alt text for the OG/Twitter image. */
  imageAlt?: string;
  type?: 'website' | 'article';
  /** Override the canonical URL (defaults to the current pathname). */
  canonicalPath?: string;
  /** Override the site origin used for canonical + og:url.
   *  Default: window.location.origin (fallback: https://dein-automatisierungsberater.de). */
  siteUrl?: string;
  /** Optional JSON-LD object — will be embedded as application/ld+json. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Set to true to discourage indexing (e.g. for /auth, /admin). */
  noIndex?: boolean;
  /** Twitter handle for site/creator (with @). Optional. */
  twitterHandle?: string;
}

const DEFAULT_SITE_URL = 'https://dein-automatisierungsberater.de';

function resolveSiteUrl(explicit?: string): string {
  if (explicit) return explicit.replace(/\/$/, '');
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/$/, '');
  }
  return DEFAULT_SITE_URL;
}

/**
 * SEO meta-tag manager. Handles title, description, Open Graph, Twitter,
 * canonical, robots and optional JSON-LD structured data.
 *
 * Multi-domain aware: canonical + og:url are derived from either an explicit
 * `siteUrl` prop (preferred, prevents SSR drift) or `window.location.origin`.
 */
export function SEOHead({
  title,
  description,
  image,
  imageAlt,
  type = 'website',
  canonicalPath,
  siteUrl,
  jsonLd,
  noIndex = false,
  twitterHandle,
}: SEOHeadProps) {
  const location = useLocation();
  const resolvedSiteUrl = resolveSiteUrl(siteUrl);
  const defaultOg = `${resolvedSiteUrl}/og-image.png`;
  const resolvedImage = image ?? defaultOg;
  const resolvedImageAlt =
    imageAlt ?? (title ? `${title} – ${siteData.name}` : `${siteData.name} – ${siteData.tagline}`);

  const fullTitle = title
    ? `${title} | ${siteData.name}`
    : `${siteData.name} – ${siteData.tagline}`;

  const fullDescription = description || siteData.heroSubheadline;
  const path = canonicalPath ?? location.pathname;
  const canonicalUrl = `${resolvedSiteUrl}${path}`;

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
    setMeta('og:image', resolvedImage, true);
    setMeta('og:image:secure_url', resolvedImage, true);
    setMeta('og:image:alt', resolvedImageAlt, true);
    setMeta('og:image:type', resolvedImage.endsWith('.jpg') || resolvedImage.endsWith('.jpeg') ? 'image/jpeg' : 'image/png', true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:site_name', siteData.name, true);
    setMeta('og:locale', 'de_DE', true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', fullDescription);
    setMeta('twitter:image', resolvedImage);
    setMeta('twitter:image:alt', resolvedImageAlt);
    if (twitterHandle) {
      setMeta('twitter:site', twitterHandle);
      setMeta('twitter:creator', twitterHandle);
    }

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
  }, [fullTitle, fullDescription, canonicalUrl, resolvedImage, resolvedImageAlt, type, noIndex, jsonLd, twitterHandle]);

  return null;
}
