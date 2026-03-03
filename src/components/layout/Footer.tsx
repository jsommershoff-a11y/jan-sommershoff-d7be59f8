import { Linkedin } from 'lucide-react';
import { siteData } from '@/data/siteData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {siteData.name}. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${siteData.email}`}
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {siteData.email}
            </a>
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
