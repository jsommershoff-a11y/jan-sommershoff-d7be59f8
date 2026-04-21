import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Loads the Outlook unread mail count. Auto-refreshes every 60s while mounted
 * and exposes a `refresh` callback for optimistic updates.
 */
export function useUnreadMailCount(enabled = true) {
  const [count, setCount] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    const { data, error } = await supabase.functions.invoke('outlook-mail', {
      body: { action: 'unreadCount' },
    });
    if (error) return;
    const c = (data as { count?: number })?.count;
    if (typeof c === 'number') setCount(c);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    refresh();
    const id = setInterval(refresh, 60_000);
    return () => clearInterval(id);
  }, [enabled, refresh]);

  return { count, setCount, refresh };
}
