import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { trackConversion } from '@/lib/tracking';

/**
 * Conversion-Goal Route: /potenzialanalyse
 * Trackt einen Lead-Intent und leitet auf Kontakt-Sektion weiter.
 */
export default function Potenzialanalyse() {
  useEffect(() => {
    trackConversion('potenzialanalyse_intent', 'ViewContent', { content_name: 'Potenzialanalyse' });
  }, []);
  return <Navigate to="/#kontakt" replace />;
}
