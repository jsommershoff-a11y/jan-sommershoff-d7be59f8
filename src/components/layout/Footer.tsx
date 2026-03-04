import { Instagram, Linkedin, Youtube, Podcast } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteData } from '@/data/siteData';
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Top: Logo + Social */}
        <div className="flex flex-col items-center gap-8 mb-8">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2.5">
            <img src={logoIcon} alt="JS" className="h-9 w-9 rounded-md object-cover" />
            <span className="text-sm font-semibold tracking-[0.2em] text-foreground">
              JAN SOMMERSHOFF
            </span>
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
          <p className="text-xs text-muted-foreground">
            © {currentYear} {siteData.name}. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Impressum
            </Link>
            <Link to="/datenschutz" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Datenschutz
            </Link>
            <a
              href={`mailto:${siteData.email}`}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {siteData.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}