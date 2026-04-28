import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { Instagram, ChevronDown } from 'lucide-react';
import { siteData } from '@/data/siteData';
import logoIcon from '@/assets/logo-icon.png';

type ProductChild = { name: string; href: string; description?: string; external?: boolean };
type NavLink =
  | { name: string; href: string; children?: undefined }
  | { name: string; href?: undefined; children: ProductChild[] };

const navLinks: NavLink[] = [
  { name: 'Meine Geschichte', href: '#story' },
  { name: 'Leistungen', href: '/leistungen' },
  { name: 'Expertise', href: '#expertise' },
  {
    name: 'Produkte',
    children: [
      {
        name: 'Postautomatisierung',
        href: '/postautomatisierung',
        description: 'OCR, KI-Klassifikation & Routing für deinen Posteingang.',
      },
      {
        name: 'KI-Automationen',
        href: 'https://ki-automationen.io/automatisierungen',
        description: 'Maßgeschneiderte KI-Workflows & Automationen für dein Unternehmen.',
        external: true,
      },
    ],
  },
  { name: 'Kontakt', href: '/kontakt?ziel=potenzialanalyse' },
];

const sectionIds = navLinks
  .filter((l): l is { name: string; href: string } => typeof l.href === 'string' && l.href.startsWith('#'))
  .map((l) => l.href.slice(1));

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
    
    // Small delay to let menu close animation start before navigating
    const doNavigate = () => {
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

    // Allow menu to close before navigating
    setTimeout(doNavigate, 50);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                if (link.children) {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * i }}
                      className="relative group"
                    >
                      <button
                        type="button"
                        className={cn(
                          'inline-flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300',
                          isTransparent
                            ? 'text-white/60 hover:text-white'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                        aria-haspopup="true"
                      >
                        {link.name}
                        <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
                      </button>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 focus-within:visible focus-within:opacity-100 focus-within:translate-y-0 transition-all duration-200">
                        <div className="min-w-[280px] rounded-xl border border-border bg-popover/95 backdrop-blur-md shadow-xl p-2">
                          {link.children.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              onClick={(e) => handleNavClick(e, child.href)}
                              className="block rounded-lg px-3 py-2.5 hover:bg-muted transition-colors"
                            >
                              <span className="block text-sm font-semibold text-foreground">
                                {child.name}
                              </span>
                              {child.description && (
                                <span className="mt-0.5 block text-xs text-muted-foreground leading-snug">
                                  {child.description}
                                </span>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                }

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
            <div className="md:hidden flex items-center gap-1 z-50">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative inline-flex items-center justify-center size-11 -mr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
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
            className="fixed inset-0 z-[55] bg-background/98 backdrop-blur-md flex flex-col overflow-y-auto pt-20 pb-8"
          >
            <nav className="flex-1 flex flex-col justify-center items-center gap-1 px-6">
              {navLinks.map((link, i) => {
                if (link.children) {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.35, delay: 0.08 * i }}
                      className="w-full max-w-xs"
                    >
                      <div className="py-2 text-center">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/70">
                          {link.name}
                        </span>
                        <div className="mt-1 flex flex-col">
                          {link.children.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              onClick={(e) => handleNavClick(e, child.href)}
                              className="block text-xl sm:text-2xl font-light tracking-wide py-3 min-h-11 text-foreground/80 hover:text-[#0F3D2E] dark:hover:text-[#6fcfab] transition-colors"
                            >
                              {child.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                const isActive = activeSection === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35, delay: 0.08 * i }}
                    className="w-full max-w-xs"
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={cn(
                        'block text-xl sm:text-2xl font-light tracking-wide transition-colors py-3 text-center min-h-11',
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
                  href="/kontakt?ziel=potenzialanalyse"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setTimeout(() => navigate('/kontakt?ziel=potenzialanalyse'), 50);
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3 min-h-12 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:opacity-90 transition-all shadow-[0_4px_20px_rgba(15,61,46,0.4)]"
                >
                  Potenzialanalyse anfragen
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
              </motion.div>
            </nav>

            {/* Bottom branding */}
            <div className="pt-6 pb-2 text-center px-6">
              <p className="text-[10px] sm:text-xs text-muted-foreground tracking-widest uppercase">
                Entrepreneur · Stratege · AI-Systeme
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
