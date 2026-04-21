import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { trackConversion } from '@/lib/tracking';

/**
 * Conversion-Goal Route: /notfallkoffer
 * Trackt einen Lead-Magnet-Intent und leitet auf Sektion weiter.
 */
export default function Notfallkoffer() {
  useEffect(() => {
    trackConversion('notfallkoffer_intent', 'ViewContent', { content_name: 'KI Notfallkoffer' });
  }, []);
  return <Navigate to="/#lead-magnet" replace />;
}
