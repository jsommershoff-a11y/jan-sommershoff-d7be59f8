import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Layout } from "@/components/layout/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingCta } from "@/components/FloatingCta";
import { MetaPixelRouterTracker } from "@/components/MetaPixelRouterTracker";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "@/components/ui/LoadingFallback";

const Home = lazy(() => import("./pages/Home"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const AGB = lazy(() => import("./pages/AGB"));
const Auth = lazy(() => import("./pages/Auth"));
const Leistungen = lazy(() => import("./pages/Leistungen"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminConversions = lazy(() => import("./pages/AdminConversions"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Posteingang = lazy(() => import("./pages/Posteingang"));
const Postautomatisierung = lazy(() => import("./pages/Postautomatisierung"));

// Thank-you pages
const DankeKontakt = lazy(() => import("./pages/danke/DankeKontakt"));
const DankeLead = lazy(() => import("./pages/danke/DankeLead"));
const DankePosteingang = lazy(() => import("./pages/danke/DankePosteingang"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <MetaPixelRouterTracker />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Funnel pages – no main layout */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/kontakt" element={<Kontakt />} />

                {/* Admin – no main layout */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/conversions" element={<AdminConversions />} />

                {/* Main site pages */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/leistungen" element={<Layout><Leistungen /></Layout>} />
                <Route path="/posteingang" element={<Layout><Posteingang /></Layout>} />
                <Route path="/postautomatisierung" element={<Layout><Postautomatisierung /></Layout>} />
                <Route path="/impressum" element={<Layout><Impressum /></Layout>} />
                <Route path="/datenschutz" element={<Layout><Datenschutz /></Layout>} />
                <Route path="/agb" element={<Layout><AGB /></Layout>} />

                {/* Legacy Conversion-Goal Routen → Kontakt mit Quell-Param */}
                <Route path="/potenzialanalyse" element={<Navigate to="/kontakt?ziel=potenzialanalyse" replace />} />
                <Route path="/notfallkoffer" element={<Navigate to="/kontakt?ziel=notfallkoffer" replace />} />

                {/* Danke-Seiten (Conversion-Trigger) */}
                <Route path="/danke/kontakt" element={<DankeKontakt />} />
                <Route path="/danke/lead" element={<DankeLead />} />
                <Route path="/danke/posteingang" element={<DankePosteingang />} />

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
