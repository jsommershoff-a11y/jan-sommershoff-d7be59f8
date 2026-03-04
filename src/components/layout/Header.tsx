import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Meine Geschichte', href: '#story' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'Projekte', href: '#projects' },
  { name: 'Kontakt', href: '#contact' },
];

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
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
              className={cn(
                'text-lg font-semibold tracking-widest transition-colors duration-300 z-50',
                isTransparent ? 'text-white hover:text-white/80' : 'text-foreground hover:text-foreground/80'
              )}
            >
              JAN SOMMERSHOFF
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      'text-sm font-medium tracking-wide transition-colors duration-300',
                      isTransparent ? 'text-white/90 hover:text-white' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
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
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-md flex flex-col"
          >
            <nav className="flex-1 flex flex-col justify-center items-center gap-2 px-8">
              {navLinks.map((link, i) => (
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
                    className="block text-2xl font-light tracking-wide text-foreground hover:text-[#0F3D2E] dark:hover:text-[#6fcfab] transition-colors py-4 text-center"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}

              {/* CTA in mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35, delay: 0.08 * navLinks.length }}
                className="mt-6"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="inline-block px-8 py-3 rounded-full bg-[#0F3D2E] text-white font-medium text-sm tracking-wide hover:bg-[#0F3D2E]/90 transition-colors"
                >
                  Gespräch starten
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
