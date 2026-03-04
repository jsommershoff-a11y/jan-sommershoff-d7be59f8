import { Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteData } from '@/data/siteData';
import logoLight from '@/assets/logo-light.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={logoLight} alt="Jan Sommershoff" className="h-8 w-auto" />
            <p className="text-sm text-muted-foreground">
              © {currentYear} {siteData.name}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Impressum
            </Link>
            <Link to="/datenschutz" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Datenschutz
            </Link>
            <a
              href={`mailto:${siteData.email}`}
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {siteData.email}
            </a>
            {siteData.socialLinks.instagram && (
              <a
                href={siteData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
            )}
            {siteData.socialLinks.linkedin && (
              <a
                href={siteData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
