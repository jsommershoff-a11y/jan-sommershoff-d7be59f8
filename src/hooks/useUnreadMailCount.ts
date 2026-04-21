import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Loads the Outlook unread mail count. Auto-refreshes every 60s while mounted
 * and exposes a `refresh` callback for optimistic updates.
 *
 * When `notify` is true, requests Notification permission and fires a desktop
 * notification whenever the count increases (i.e. new mail arrives).
 */
export function useUnreadMailCount(enabled = true, notify = false) {
  const [count, setCount] = useState<number | null>(null);
  const previousRef = useRef<number | null>(null);
  const permissionRequested = useRef(false);

  const refresh = useCallback(async () => {
    const { data, error } = await supabase.functions.invoke('outlook-mail', {
      body: { action: 'unreadCount' },
    });
    if (error) return;
    const c = (data as { count?: number })?.count;
    if (typeof c === 'number') setCount(c);
  }, []);

  // Request notification permission once when notify is enabled
  useEffect(() => {
    if (!notify || permissionRequested.current) return;
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    if (Notification.permission === 'default') {
      permissionRequested.current = true;
      Notification.requestPermission().catch(() => {});
    }
  }, [notify]);

  // Fire notification when count increases
  useEffect(() => {
    if (!notify || count === null) {
      previousRef.current = count;
      return;
    }
    const prev = previousRef.current;
    if (
      prev !== null &&
      count > prev &&
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission === 'granted' &&
      document.visibilityState !== 'visible'
        ? true
        : prev !== null && count > prev && Notification?.permission === 'granted'
    ) {
      const diff = count - prev;
      try {
        new Notification(
          diff === 1 ? 'Neue E-Mail im Posteingang' : `${diff} neue E-Mails im Posteingang`,
          {
            body: `Du hast jetzt ${count} ungelesene Nachricht${count === 1 ? '' : 'en'}.`,
            icon: '/favicon.ico',
            tag: 'outlook-unread',
          },
        );
      } catch {
        // ignore
      }
    }
    previousRef.current = count;
  }, [count, notify]);

  useEffect(() => {
    if (!enabled) return;
    refresh();
    const id = setInterval(refresh, 60_000);
    return () => clearInterval(id);
  }, [enabled, refresh]);

  return { count, setCount, refresh };
}
