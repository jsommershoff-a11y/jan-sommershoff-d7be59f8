import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';
import { trackEvent } from '@/lib/tracking';

interface ThankYouProps {
  title: string;
  subtitle: string;
  eventName: string;
  /** Nur dokumentarisch — Meta-Conversion-Events werden zentral
   * vom MetaPixelRouterTracker auf /danke/kontakt bzw. /danke/lead gefeuert. */
  metaEvent?: 'Lead' | 'Contact' | 'Schedule' | 'Purchase' | 'CompleteRegistration' | 'ViewContent';
  value?: number;
  currency?: string;
  primaryHref?: string;
  primaryLabel?: string;
}

export function ThankYou({
  title,
  subtitle,
  eventName,
  value,
  currency,
  primaryHref = '/',
  primaryLabel = 'Zur Startseite',
}: ThankYouProps) {
  useEffect(() => {
    // Nur GA4 — Meta Lead/CompleteRegistration laufen über MetaPixelRouterTracker.
    trackEvent(eventName, {
      ...(value !== undefined ? { value } : {}),
      ...(currency ? { currency } : {}),
    });
  }, [eventName, value, currency]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center bg-card border border-border rounded-2xl p-8 md:p-12 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="size-9 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
          {title}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={primaryHref}
            className="inline-flex items-center justify-center gap-2 px-6 h-12 bg-accent text-white font-semibold rounded-md hover:opacity-90 transition"
          >
            {primaryLabel}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 h-12 border border-border text-foreground font-medium rounded-md hover:bg-muted transition"
          >
            <Home className="size-4" />
            Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
