import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { Instagram } from 'lucide-react';
import { siteData } from '@/data/siteData';
import logoIcon from '@/assets/logo-icon.png';

const navLinks = [
  { name: 'Meine Geschichte', href: '#story' },
  { name: 'Leistungen', href: '/leistungen' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'Projekte', href: '#projects' },
  { name: 'Kontakt', href: '#contact' },
];

const sectionIds = navLinks.map((l) => l.href.slice(1));

function HamburgerIcon({ open, transparent }: { open: boolean; transparent: boolean }) {
  const lineClass = cn(
    'block h-[2px] w-6 rounded-full transition-all duration-300 origin-center',
    transparent && !open ? 'bg-white' : 'bg-foreground'
  );
  return (
    <div className="flex flex-col justify-center items-center gap-[5px] w-6 h-6">
      <span className={cn(lineClass, open && 'translate-y-[7px] rotate-45')} />
      <span className={cn(lineClass, open && 'opacity-0 scale-x-0')} />
      <span className={cn(lineClass, open && '-translate-y-[7px] -rotate-45')} />
    </div>
  );
}

export function Header() {
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isTransparent = !isScrolled && !mobileMenuOpen;
  const activeSection = useActiveSection(sectionIds);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isTransparent
            ? 'bg-transparent'
            : 'bg-background/90 backdrop-blur-lg border-b border-border shadow-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
              className="flex items-center gap-2.5 z-50"
            >
              <img
                src={logoIcon}
                alt="JS"
                className="h-9 w-9 rounded-md object-cover"
              />
              <span
                className={cn(
                  'text-sm font-semibold tracking-[0.2em] transition-colors duration-300 hidden sm:block',
                  isTransparent ? 'text-white' : 'text-foreground'
                )}
              >
                JAN SOMMERSHOFF
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                    className="relative"
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={cn(
                        'text-sm font-medium tracking-wide transition-colors duration-300',
                        isTransparent
                          ? isActive ? 'text-white' : 'text-white/60 hover:text-white'
                          : isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {link.name}
                    </a>
                    {/* Active indicator dot */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.25 }}
                          className={cn(
                            'absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full',
                            isTransparent ? 'bg-white' : 'bg-[#0F3D2E] dark:bg-[#6fcfab]'
                          )}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              <a
                href={siteData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'transition-colors duration-300',
                  isTransparent ? 'text-white/60 hover:text-white' : 'text-muted-foreground hover:text-foreground'
                )}
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <ThemeToggle />
            </nav>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center gap-3 z-50">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative p-1 focus:outline-none"
                aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={mobileMenuOpen}
              >
                <HamburgerIcon open={mobileMenuOpen} transparent={isTransparent} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-background/98 backdrop-blur-md flex flex-col"
          >
            <nav className="flex-1 flex flex-col justify-center items-center gap-2 px-8">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35, delay: 0.08 * i }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={cn(
                        'block text-2xl font-light tracking-wide transition-colors py-4 text-center',
                        isActive
                          ? 'text-[#0F3D2E] dark:text-[#6fcfab]'
                          : 'text-foreground/60 hover:text-[#0F3D2E] dark:hover:text-[#6fcfab]'
                      )}
                    >
                      {link.name}
                    </a>
                  </motion.div>
                );
              })}

              {/* CTA in mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35, delay: 0.08 * navLinks.length }}
                className="mt-6"
              >
                <a
                  href="https://krs-signature.de/auth?src=jan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:opacity-90 transition-all shadow-[0_4px_20px_rgba(15,61,46,0.4)]"
                >
                  Gespräch starten
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
              </motion.div>
            </nav>

            {/* Bottom branding */}
            <div className="pb-10 text-center">
              <p className="text-xs text-muted-foreground tracking-widest uppercase">
                Entrepreneur · Stratege · AI-Systeme
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
