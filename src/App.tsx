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
const NotFound = lazy(() => import("./pages/NotFound"));

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

                {/* Main site pages */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/impressum" element={<Layout><Impressum /></Layout>} />
                <Route path="/datenschutz" element={<Layout><Datenschutz /></Layout>} />
                <Route path="/agb" element={<Layout><AGB /></Layout>} />
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
