import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Mail, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface InteractionRow {
  id: number;
  type: string;
  channel: string | null;
  direction: string | null;
  subject: string | null;
  content: string | null;
  status: string | null;
  occurred_at: string;
  contact_id: number | null;
}

interface Props {
  email: string;
  /** Optional name shown when no interactions found */
  recipientName?: string;
}

export const MailTimeline = ({ email }: Props) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<InteractionRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);

      // 1. Look up contact by email (case-insensitive)
      const { data: contactRows } = await supabase
        .from('contacts')
        .select('id')
        .ilike('email', email)
        .limit(1);
      const contactId = contactRows?.[0]?.id ?? null;

      // 2. Fetch interactions: by contact_id OR by matching email in content/subject
      // Since interactions has no recipient_email column, match on contact_id primarily;
      // fallback: search content for the email address.
      let query = supabase
        .from('interactions')
        .select('id, type, channel, direction, subject, content, status, occurred_at, contact_id')
        .eq('type', 'email')
        .order('occurred_at', { ascending: false })
        .limit(50);

      if (contactId) {
        query = query.or(`contact_id.eq.${contactId},content.ilike.%${email}%`);
      } else {
        query = query.ilike('content', `%${email}%`);
      }

      const { data, error: err } = await query;
      if (cancelled) return;
      if (err) {
        setError('Verlauf konnte nicht geladen werden');
        setItems([]);
      } else {
        setItems((data || []) as InteractionRow[]);
      }
      setLoading(false);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [email]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
        <Loader2 className="size-4 animate-spin" /> Verlauf wird geladen…
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive py-2">{error}</p>;
  }

  if (items.length === 0) {
    return (
      <div className="text-sm text-muted-foreground py-3 flex items-center gap-2">
        <Mail className="size-4" /> Noch keine Mail-Interaktionen für {email}
      </div>
    );
  }

  return (
    <ol className="relative border-l border-border ml-2 space-y-4 py-2">
      {items.map((it) => {
        const outbound = it.direction === 'outbound';
        const Icon = outbound ? ArrowUpRight : ArrowDownLeft;
        return (
          <li key={it.id} className="ml-4">
            <span
              className={`absolute -left-[7px] flex size-3.5 items-center justify-center rounded-full ring-4 ring-background ${
                outbound ? 'bg-primary' : 'bg-accent'
              }`}
            />
            <div className="flex items-center gap-2 flex-wrap">
              <Icon
                className={`size-3.5 ${outbound ? 'text-primary' : 'text-accent-foreground'}`}
              />
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {outbound ? 'Gesendet' : 'Empfangen'}
              </span>
              {it.channel && (
                <span className="text-xs text-muted-foreground">· {it.channel}</span>
              )}
              <span className="text-xs text-muted-foreground ml-auto">
                {new Date(it.occurred_at).toLocaleString('de-DE', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>
            {it.subject && (
              <p className="text-sm font-semibold text-foreground mt-1 break-words">
                {it.subject}
              </p>
            )}
            {it.content && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-3 whitespace-pre-line break-words">
                {it.content}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
};
