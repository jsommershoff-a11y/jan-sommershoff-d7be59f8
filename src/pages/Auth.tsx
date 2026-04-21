import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Shield, Zap, Brain, MailCheck } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { trackEvent, trackPageView } from '@/lib/tracking';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    trackPageView('/auth', 'Auth – KI Notfallkoffer');
    trackEvent('auth_page_view', { funnel: 'notfallkoffer' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            // Double-Opt-In: user must confirm via email link
            emailRedirectTo: window.location.origin + '/upsell',
          },
        });
        if (error) throw error;

        // Mirror to lead pipeline (validation + admin notification)
        await supabase.functions.invoke('send-contact-email', {
          body: {
            type: 'lead_magnet',
            name: name || email,
            email,
            message: 'KI Notfallkoffer Registration',
          },
        });

        trackEvent('signup_submit', { funnel: 'notfallkoffer', method: 'email' });
        setSubmitted(true);
        toast.success('Bitte bestätige deine E-Mail-Adresse.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        trackEvent('login_success', { funnel: 'notfallkoffer' });
        toast.success('Willkommen zurück!');
        window.location.href = '/upsell';
      }
    } catch (err: any) {
      trackEvent(mode === 'register' ? 'signup_error' : 'login_error', {
        message: err.message,
      });
      toast.error(err.message || 'Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: Shield, text: 'Sofortmaßnahmen bei unternehmerischen Herausforderungen' },
    { icon: Brain, text: 'KI-gestützte Entscheidungsvorlagen' },
    { icon: Zap, text: 'Automatisierte Prozessanalyse' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Conversion section */}
      <section className="border-b border-white/5 py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug mb-8"
          >
            Wenn du gerade merkst, dass dein Unternehmen dich mehr belastet als es dir Freiheit gibt, dann ist jetzt der richtige Moment, etwas zu verändern.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 text-base md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto mb-10"
          >
            <p>Viele Unternehmer merken erst zu spät, dass sie ihre Zeit mit den falschen Aufgaben verbringen.</p>
            <p className="text-white/80 font-medium">KI kann dir genau hier helfen.</p>
            <p>Nicht als Ersatz für dein Denken.</p>
            <p>Sondern als System, das dir Zeit zurückgibt.</p>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            href="#register"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F3D2E] hover:bg-[#174d3a] text-white font-medium rounded-xl transition-colors text-sm tracking-wide"
          >
            Kostenlose KI Analyse starten
            <Zap className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

      {/* Registration section */}
      <div id="register" className="flex-1 flex min-h-screen">
      {/* Left: Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0F3D2E] to-[#0a2a1e] p-16 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-white/50 mb-4">
            Kostenlos
          </p>
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
            KI Notfallkoffer
            <br />
            <span className="text-white/60 font-light">für Unternehmer</span>
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-md">
            Dein digitaler Werkzeugkasten für strategische Entscheidungen – 
            powered by künstlicher Intelligenz.
          </p>

          <div className="space-y-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-white/80" />
                </div>
                <span className="text-white/80">{b.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile header */}
          <div className="lg:hidden mb-10 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-3">Kostenlos</p>
            <h1 className="text-3xl font-bold mb-2">KI Notfallkoffer</h1>
            <p className="text-white/50">für Unternehmer</p>
          </div>

          <div className="mb-8">
            <a href="/" className="text-xs tracking-[0.2em] uppercase text-white/30 hover:text-white/50 transition-colors">
              ← jan-sommershoff.de
            </a>
          </div>

          <h2 className="text-2xl font-semibold mb-2">
            {mode === 'register' ? 'Kostenlosen Zugang sichern' : 'Anmelden'}
          </h2>
          <p className="text-white/50 text-sm mb-8">
            {mode === 'register'
              ? 'Registriere dich und erhalte sofort Zugang zum KI Notfallkoffer.'
              : 'Melde dich an, um auf deine Ressourcen zuzugreifen.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E] transition-colors"
                  placeholder="Dein Name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E] transition-colors"
                placeholder="name@unternehmen.de"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E] transition-colors"
                placeholder="Mindestens 6 Zeichen"
                minLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#0F3D2E] hover:bg-[#174d3a] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : mode === 'register' ? (
                'Kostenlos registrieren'
              ) : (
                'Anmelden'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            {mode === 'register' ? (
              <>
                Bereits registriert?{' '}
                <button onClick={() => setMode('login')} className="text-white/70 hover:text-white underline transition-colors">
                  Anmelden
                </button>
              </>
            ) : (
              <>
                Noch kein Konto?{' '}
                <button onClick={() => setMode('register')} className="text-white/70 hover:text-white underline transition-colors">
                  Registrieren
                </button>
              </>
            )}
          </p>

          <p className="text-center text-xs text-white/20 mt-8">
            Mit der Registrierung akzeptierst du unsere{' '}
            <a href="/datenschutz" className="underline hover:text-white/40">Datenschutzerklärung</a>.
          </p>
        </motion.div>
      </div>
      </div>
    </div>
  );
}
