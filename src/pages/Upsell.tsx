import { motion } from 'framer-motion';
import { Check, ArrowRight, Clock, BarChart3, Cpu, FileText, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const PAYMENT_LINK = '#'; // TODO: Replace with actual payment link

const features = [
  { icon: BarChart3, title: 'Vollständige Geschäftsprozess-Analyse', desc: 'Identifikation aller Automatisierungspotenziale in deinem Unternehmen.' },
  { icon: Cpu, title: 'Individuelle KI-Automatisierungsstrategie', desc: 'Maßgeschneiderter Plan für deine spezifische Unternehmenssituation.' },
  { icon: FileText, title: 'Professionelle Prompt-Bibliothek', desc: 'Über 50 getestete Business-Prompts für sofortigen Einsatz.' },
  { icon: Sparkles, title: 'Video-Onboarding & Guides', desc: 'Schritt-für-Schritt Anleitungen für die Implementierung.' },
];

const included = [
  'Video Onboarding System',
  'Prompt Bibliothek (50+ Prompts)',
  'Geschäftsprozess-Analyse Template',
  'KI Automatisierungs-Guides',
  'Upgrade-Optionen für Betreuung',
  'Zugang zum KRS Signature Portal',
];

export default function Upsell() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top bar */}
      <div className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xs tracking-[0.2em] uppercase text-white/30 hover:text-white/50 transition-colors">
            ← jan-sommershoff.de
          </a>
          {user && (
            <span className="text-xs text-white/30">{user.email}</span>
          )}
        </div>
      </div>

      {/* Success banner */}
      <div className="bg-[#0F3D2E]/20 border-b border-[#0F3D2E]/30">
        <div className="max-w-3xl mx-auto px-6 py-4 text-center">
          <p className="text-sm text-[#6fcfab]">
            ✓ Dein KI Notfallkoffer ist bereit. Prüfe dein E-Mail-Postfach für den Zugang.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/50 mb-6">
            <Clock className="w-3 h-3" />
            Einmaliges Angebot
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Geh den nächsten Schritt.
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto">
            Die vollständige KI System Analyse für dein Unternehmen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Features - 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 space-y-8"
          >
            <h2 className="text-lg font-medium text-white/80 mb-6">Was du bekommst:</h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0F3D2E]/30 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-[#6fcfab]" />
                  </div>
                  <h3 className="font-medium mb-2">{f.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing card - 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-2xl p-8 sticky top-8">
              <p className="text-xs tracking-[0.2em] uppercase text-[#6fcfab] mb-4">
                KRS Signature
              </p>
              <h3 className="text-xl font-semibold mb-1">KI System Analyse</h3>
              <p className="text-white/40 text-sm mb-6">Einmalzahlung · Sofortzugang</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold">499</span>
                <span className="text-xl text-white/50">€</span>
              </div>

              <div className="space-y-3 mb-8">
                {included.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#6fcfab] mt-0.5 shrink-0" />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href={PAYMENT_LINK}
                className="w-full py-4 bg-[#0F3D2E] hover:bg-[#174d3a] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
              >
                Jetzt Zugang sichern
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-center text-xs text-white/20 mt-4">
                Sichere Zahlung · Sofortiger Zugang
              </p>
            </div>
          </motion.div>
        </div>

        {/* Skip link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => navigate('/')}
            className="text-sm text-white/20 hover:text-white/40 transition-colors underline"
          >
            Nein danke, zurück zur Startseite
          </button>
        </motion.div>
      </div>
    </div>
  );
}
