import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Layout } from "@/components/layout/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingCta } from "@/components/FloatingCta";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "@/components/ui/LoadingFallback";

const Home = lazy(() => import("./pages/Home"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const AGB = lazy(() => import("./pages/AGB"));
const Auth = lazy(() => import("./pages/Auth"));
const Upsell = lazy(() => import("./pages/Upsell"));
const Leistungen = lazy(() => import("./pages/Leistungen"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Conversion goals
const Potenzialanalyse = lazy(() => import("./pages/Potenzialanalyse"));
const Notfallkoffer = lazy(() => import("./pages/Notfallkoffer"));
const Termin = lazy(() => import("./pages/Termin"));

// Campaign landing pages
const LpKiAnalyse = lazy(() => import("./pages/lp/LpKiAnalyse"));
const LpNotfallkoffer = lazy(() => import("./pages/lp/LpNotfallkoffer"));

// Thank-you pages
const DankeKontakt = lazy(() => import("./pages/danke/DankeKontakt"));
const DankeLead = lazy(() => import("./pages/danke/DankeLead"));
const DankeKauf = lazy(() => import("./pages/danke/DankeKauf"));
const DankeTermin = lazy(() => import("./pages/danke/DankeTermin"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Funnel pages – no main layout */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/upsell" element={<Upsell />} />

                {/* Admin – no main layout */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Main site pages */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/leistungen" element={<Layout><Leistungen /></Layout>} />
                <Route path="/impressum" element={<Layout><Impressum /></Layout>} />
                <Route path="/datenschutz" element={<Layout><Datenschutz /></Layout>} />
                <Route path="/agb" element={<Layout><AGB /></Layout>} />
                {/* Conversion-Goal Routen (Tracking-URLs) */}
                <Route path="/potenzialanalyse" element={<Potenzialanalyse />} />
                <Route path="/notfallkoffer" element={<Notfallkoffer />} />
                <Route path="/termin" element={<Termin />} />

                {/* Kampagnen-Landingpages */}
                <Route path="/lp/ki-analyse" element={<LpKiAnalyse />} />
                <Route path="/lp/notfallkoffer" element={<LpNotfallkoffer />} />

                {/* Danke-Seiten (Conversion-Trigger) */}
                <Route path="/danke/kontakt" element={<DankeKontakt />} />
                <Route path="/danke/lead" element={<DankeLead />} />
                <Route path="/danke/kauf" element={<DankeKauf />} />
                <Route path="/danke/termin" element={<DankeTermin />} />

                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </Suspense>
            <CookieBanner />
            <FloatingCta />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
