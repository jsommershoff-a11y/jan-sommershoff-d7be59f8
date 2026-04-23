import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Briefcase,
  Mailbox,
  LineChart,
  LifeBuoy,
  User,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react';

type Sitelink = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

const SITELINKS: Sitelink[] = [
  {
    title: 'KI-Beratung & Leistungen',
    description: 'Alle Beratungs- und Automatisierungs-Leistungen im Überblick.',
    href: '/leistungen',
    icon: Briefcase,
  },
  {
    title: 'Postautomatisierung',
    description: 'OCR, KI-Klassifikation und Routing für deinen Posteingang.',
    href: '/postautomatisierung',
    icon: Mailbox,
  },
  {
    title: 'Kostenfreie Potenzialanalyse',
    description: 'Unverbindliche KI-Analyse für Unternehmer und Mittelstand.',
    href: '/kontakt?ziel=potenzialanalyse',
    icon: LineChart,
  },
  {
    title: 'KI Notfallkoffer sichern',
    description: 'Kostenloser Lead-Magnet mit Sofort-Hilfe für KI-Einsteiger.',
    href: '/kontakt?ziel=notfallkoffer',
    icon: LifeBuoy,
  },
  {
    title: 'Über Jan Sommershoff',
    description: 'Unternehmer, KI-Stratege und Systemarchitekt.',
    href: '/#story',
    icon: User,
  },
  {
    title: 'Kontakt aufnehmen',
    description: 'Formular, WhatsApp oder Terminbuchung – direkt zu Jan.',
    href: '/kontakt',
    icon: MessageSquare,
  },
];

/**
 * Sichtbare Sitelinks-Sektion (footer-nah).
 * Mobile-first: 1 Spalte auf Mobile, 2 ab sm, 3 ab lg.
 * Spiegelt die JSON-LD ItemList in `Home.tsx` als UI für Nutzer.
 */
export function SitelinksSection() {
  return (
    <section
      aria-labelledby="sitelinks-heading"
      className="bg-background py-12 md:py-20"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            Schnellzugriff
          </p>
          <h2
            id="sitelinks-heading"
            className="mt-2 text-2xl md:text-4xl font-bold tracking-tight text-foreground"
          >
            Beliebte Bereiche
          </h2>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl md:mx-0 mx-auto">
            Direkter Sprung zu den meistgesuchten Inhalten – Beratung, Tools und Kontakt.
          </p>
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {SITELINKS.map((link) => {
            const Icon = link.icon;
            const content = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-base font-semibold text-foreground leading-tight">
                      {link.title}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground leading-snug">
                    {link.description}
                  </span>
                </span>
              </>
            );

            const className =
              'group flex items-start gap-4 rounded-xl border border-border/60 bg-card/50 p-4 sm:p-5 min-h-[88px] transition-all hover:border-primary/40 hover:bg-card hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

            return (
              <li key={link.href}>
                {link.external ? (
                  <a
                    href={link.href}
                    className={className}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {content}
                  </a>
                ) : (
                  <Link to={link.href} className={className}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
