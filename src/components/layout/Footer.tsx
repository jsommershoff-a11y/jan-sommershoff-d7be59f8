import { Instagram, Linkedin, Youtube, Podcast, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteData } from '@/data/siteData';
import { openCookieSettings } from '@/components/CookieBanner';
import logoIcon from '@/assets/logo-icon.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { key: 'linkedin', href: siteData.socialLinks.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { key: 'instagram', href: siteData.socialLinks.instagram, icon: Instagram, label: 'Instagram' },
    { key: 'youtube', href: siteData.socialLinks.youtube, icon: Youtube, label: 'YouTube', comingSoon: true },
    { key: 'podcast', href: siteData.socialLinks.podcast, icon: Podcast, label: 'Podcast', comingSoon: true },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 pb-40 sm:pb-24">
        {/* Top: Logo + Contact + Social */}
        <div className="flex flex-col items-center gap-8 mb-8">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2.5">
            <img src={logoIcon} alt="JS" className="h-9 w-9 rounded-md object-cover" />
            <span className="text-sm font-semibold tracking-[0.2em] text-foreground">
              JAN SOMMERSHOFF
            </span>
          </a>

          {/* Contact info bar */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <a href="tel:+491751127114" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="size-4" />
              +49 175 1127114
            </a>
            <a href={`mailto:${siteData.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="size-4" />
              {siteData.email}
            </a>
            <a
              href="https://wa.me/message/VSNLCZXNWTSKO1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#25D366] transition-colors"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* CTA Button */}
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:opacity-90 transition-all shadow-[0_4px_20px_rgba(15,61,46,0.3)]"
          >
            Kostenlose Analyse starten
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            {socialLinks.map(({ key, href, icon: Icon, label, comingSoon }) => (
              href && (
                <div key={key} className="flex flex-col items-center gap-1.5">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={label}
                  >
                    <Icon className="size-5" />
                  </a>
                  {comingSoon && (
                    <span className="text-[10px] text-muted-foreground/60 leading-tight text-center max-w-[72px]">
                      Coming soon
                    </span>
                  )}
                </div>
              )
            ))}
          </div>
        </div>

        {/* Bottom: Links + Copyright */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {currentYear} SMB Consulting UG (haftungsbeschränkt) – Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 md:gap-6">
            <Link to="/impressum" className="text-sm text-foreground/70 hover:text-primary transition-colors underline-offset-4 hover:underline px-2 py-2 min-h-11 inline-flex items-center">
              Impressum
            </Link>
            <Link to="/datenschutz" className="text-sm text-foreground/70 hover:text-primary transition-colors underline-offset-4 hover:underline px-2 py-2 min-h-11 inline-flex items-center">
              Datenschutz
            </Link>
            <Link to="/agb" className="text-sm text-foreground/70 hover:text-primary transition-colors underline-offset-4 hover:underline px-2 py-2 min-h-11 inline-flex items-center">
              AGB
            </Link>
            <button
              type="button"
              onClick={openCookieSettings}
              className="text-sm text-foreground/70 hover:text-primary transition-colors underline-offset-4 hover:underline px-2 py-2 min-h-11 inline-flex items-center"
            >
              Cookie-Einstellungen
            </button>
            <Link to="/admin/login" className="text-xs text-muted-foreground/60 hover:text-primary transition-colors px-2 py-2 min-h-11 inline-flex items-center">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
