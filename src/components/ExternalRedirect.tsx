import { useEffect } from 'react';
import { LoadingFallback } from '@/components/ui/LoadingFallback';

interface ExternalRedirectProps {
  to: string;
}

/**
 * Client-side redirect to an external URL. Sets canonical + meta-refresh
 * fallback for SEO/no-JS environments before forcing the browser navigation.
 */
export function ExternalRedirect({ to }: ExternalRedirectProps) {
  useEffect(() => {
    // Canonical hint for crawlers
    let canonical = document.head.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', to);

    // Meta refresh fallback (no-JS)
    let refresh = document.head.querySelector(
      'meta[http-equiv="refresh"]',
    ) as HTMLMetaElement | null;
    if (!refresh) {
      refresh = document.createElement('meta');
      refresh.setAttribute('http-equiv', 'refresh');
      document.head.appendChild(refresh);
    }
    refresh.setAttribute('content', `0;url=${to}`);

    // Discourage indexing of the redirect path itself
    let robots = document.head.querySelector(
      'meta[name="robots"]',
    ) as HTMLMetaElement | null;
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, follow');

    window.location.replace(to);
  }, [to]);

  return <LoadingFallback />;
}

export default ExternalRedirect;
