import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Loader2, Mail, Reply, Search, X } from 'lucide-react';
import { toast } from 'sonner';
import { TemplatePicker } from '@/components/admin/TemplatePicker';
import { AiSuggestButton } from '@/components/admin/AiSuggestButton';

interface OutlookMessage {
  id: string;
  subject: string;
  bodyPreview: string;
  receivedDateTime: string;
  isRead: boolean;
  from?: { emailAddress?: { name?: string; address?: string } };
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unreadCount?: number | null;
  setUnreadCount?: React.Dispatch<React.SetStateAction<number | null>>;
  refreshUnread?: () => void;
}

const PAGE_SIZE = 25;

export const InboxDialog = ({
  open,
  onOpenChange,
  unreadCount: externalUnread,
  setUnreadCount: externalSetUnread,
  refreshUnread,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<OutlookMessage[]>([]);
  const [search, setSearch] = useState('');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<OutlookMessage | null>(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [internalUnread, setInternalUnread] = useState<number | null>(null);

  const unreadCount = externalUnread !== undefined ? externalUnread : internalUnread;
  const setUnreadCount: React.Dispatch<React.SetStateAction<number | null>> =
    externalSetUnread ?? setInternalUnread;

  const loadUnreadCount = async () => {
    if (refreshUnread) {
      refreshUnread();
      return;
    }
    const { data, error } = await supabase.functions.invoke('outlook-mail', {
      body: { action: 'unreadCount' },
    });
    if (error) return;
    const c = (data as { count?: number })?.count;
    if (typeof c === 'number') setInternalUnread(c);
  };

  const load = async (opts?: { q?: string; pageIdx?: number; unread?: boolean }) => {
    const q = opts?.q ?? search;
    const pageIdx = opts?.pageIdx ?? page;
    const unread = opts?.unread ?? unreadOnly;
    setLoading(true);
    const { data, error } = await supabase.functions.invoke('outlook-mail', {
      body: {
        action: 'list',
        top: PAGE_SIZE,
        skip: pageIdx * PAGE_SIZE,
        search: q || undefined,
        unreadOnly: unread,
      },
    });
    setLoading(false);
    if (error) {
      toast.error('Posteingang konnte nicht geladen werden');
      return;
    }
    setMessages((data as { value?: OutlookMessage[] })?.value || []);
  };

  useEffect(() => {
    if (open) {
      setSelected(null);
      setReply('');
      setPage(0);
      setUnreadOnly(false);
      setSearch('');
      load({ q: '', pageIdx: 0, unread: false });
      loadUnreadCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Auto-mark as read when a message is opened in the detail view
  useEffect(() => {
    if (!selected || selected.isRead) return;
    const messageId = selected.id;
    (async () => {
      const { error } = await supabase.functions.invoke('outlook-mail', {
        body: { action: 'markRead', messageId, isRead: true },
      });
      if (error) {
        console.error('markRead failed', error);
        return;
      }
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, isRead: true } : m)),
      );
      setSelected((prev) => (prev && prev.id === messageId ? { ...prev, isRead: true } : prev));
      setUnreadCount((c) => (c !== null ? Math.max(0, c - 1) : c));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id]);

  const handleMarkUnread = async () => {
    if (!selected) return;
    const messageId = selected.id;
    const { error } = await supabase.functions.invoke('outlook-mail', {
      body: { action: 'markRead', messageId, isRead: false },
    });
    if (error) {
      toast.error('Konnte nicht als ungelesen markiert werden');
      return;
    }
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, isRead: false } : m)),
    );
    setSelected((prev) => (prev && prev.id === messageId ? { ...prev, isRead: false } : prev));
    setUnreadCount((c) => (c !== null ? c + 1 : c));
    toast.success('Als ungelesen markiert');
  };

  const handleReply = async () => {
    if (!selected || !reply.trim()) return;
    setSending(true);
    const { error } = await supabase.functions.invoke('outlook-mail', {
      body: { action: 'reply', messageId: selected.id, comment: reply },
    });
    setSending(false);
    if (error) {
      toast.error('Antwort konnte nicht gesendet werden');
      return;
    }
    toast.success('Antwort gesendet');
    setReply('');
    setSelected(null);
    load();
  };

  const goPrev = () => {
    if (page === 0) return;
    const next = page - 1;
    setPage(next);
    load({ pageIdx: next });
  };
  const goNext = () => {
    if (messages.length < PAGE_SIZE) return; // last page
    const next = page + 1;
    setPage(next);
    load({ pageIdx: next });
  };

  const toggleUnread = () => {
    const next = !unreadOnly;
    setUnreadOnly(next);
    setPage(0);
    load({ pageIdx: 0, unread: next });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="size-5" /> Outlook Posteingang
            {unreadCount !== null && unreadCount > 0 && (
              <Badge variant="default" className="ml-1">
                {unreadCount} ungelesen
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {!selected ? (
          <>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setPage(0);
                      load({ pageIdx: 0 });
                    }
                  }}
                  placeholder="Suche (Enter zum Suchen)…"
                  className="pl-9 pr-9"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setPage(0);
                      load({ q: '', pageIdx: 0 });
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
              <Button
                type="button"
                variant={unreadOnly ? 'default' : 'outline'}
                onClick={toggleUnread}
                disabled={!!search}
                title={search ? 'Filter nicht mit Suche kombinierbar' : undefined}
              >
                Nur ungelesen
              </Button>
            </div>

            <div className="overflow-y-auto flex-1 space-y-2 mt-2">
              {loading ? (
                <div className="flex items-center justify-center py-12 text-muted-foreground">
                  <Loader2 className="size-5 animate-spin mr-2" /> Lade…
                </div>
              ) : messages.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">
                  Keine Nachrichten gefunden
                </Card>
              ) : (
                messages.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m)}
                    className="w-full text-left"
                  >
                    <Card className="p-3 hover:bg-muted/50 transition">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {!m.isRead && (
                              <Badge variant="default" className="h-5 text-[10px]">
                                NEU
                              </Badge>
                            )}
                            <span className="text-sm font-medium truncate">
                              {m.from?.emailAddress?.name || m.from?.emailAddress?.address || 'Unbekannt'}
                            </span>
                          </div>
                          <p className="text-sm font-semibold truncate">{m.subject || '(kein Betreff)'}</p>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {m.bodyPreview}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(m.receivedDateTime).toLocaleString('de-DE', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          })}
                        </span>
                      </div>
                    </Card>
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t mt-2">
              <span className="text-xs text-muted-foreground">
                Seite {page + 1}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goPrev}
                  disabled={loading || page === 0}
                >
                  <ChevronLeft className="size-4 mr-1" /> Zurück
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goNext}
                  disabled={loading || messages.length < PAGE_SIZE}
                >
                  Weiter <ChevronRight className="size-4 ml-1" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="overflow-y-auto flex-1">
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)} className="mb-2">
                ← Zurück zum Posteingang
              </Button>
              <Card className="p-4 mb-3">
                <p className="text-xs text-muted-foreground">
                  Von:{' '}
                  <strong className="text-foreground">
                    {selected.from?.emailAddress?.name} &lt;{selected.from?.emailAddress?.address}&gt;
                  </strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(selected.receivedDateTime).toLocaleString('de-DE')}
                </p>
                <h3 className="font-semibold mt-2">{selected.subject}</h3>
                <p className="text-sm mt-3 whitespace-pre-wrap text-muted-foreground">
                  {selected.bodyPreview}
                </p>
              </Card>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Reply className="size-4" /> Antworten
                  </label>
                  <TemplatePicker
                    kind="inbox_reply"
                    vars={{
                      first_name: selected.from?.emailAddress?.name?.split(' ')[0] ?? '',
                      name: selected.from?.emailAddress?.name ?? '',
                      email: selected.from?.emailAddress?.address ?? '',
                      subject: selected.subject ?? '',
                    }}
                    onPick={({ body }) => setReply((prev) => (prev ? `${prev}\n\n${body}` : body))}
                  />
                </div>
                <Textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={6}
                  placeholder="Deine Antwort…"
                  maxLength={10000}
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="outline" onClick={() => setSelected(null)} disabled={sending}>
                Abbrechen
              </Button>
              <Button
                variant="secondary"
                onClick={handleMarkUnread}
                disabled={sending || !selected.isRead}
              >
                Als ungelesen markieren
              </Button>
              <Button onClick={handleReply} disabled={sending || !reply.trim()}>
                {sending && <Loader2 className="size-4 mr-2 animate-spin" />}
                Antwort senden
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
