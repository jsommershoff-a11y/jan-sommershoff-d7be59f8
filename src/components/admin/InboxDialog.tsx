import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';
import { InboxList } from './inbox/InboxList';
import { InboxDetail } from './inbox/InboxDetail';
import { OutlookMessage, PAGE_SIZE } from './inbox/types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InboxDialog = ({ open, onOpenChange }: Props) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<OutlookMessage[]>([]);
  const [search, setSearch] = useState('');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<OutlookMessage | null>(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number | null>(null);

  const loadUnreadCount = async () => {
    const { data, error } = await supabase.functions.invoke('outlook-mail', {
      body: { action: 'unreadCount' },
    });
    if (error) return;
    const c = (data as { count?: number })?.count;
    if (typeof c === 'number') setUnreadCount(c);
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
    if (messages.length < PAGE_SIZE) return;
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
          <InboxList
            loading={loading}
            messages={messages}
            search={search}
            setSearch={setSearch}
            unreadOnly={unreadOnly}
            page={page}
            onSelect={setSelected}
            onSearchSubmit={() => {
              setPage(0);
              load({ pageIdx: 0 });
            }}
            onClearSearch={() => {
              setSearch('');
              setPage(0);
              load({ q: '', pageIdx: 0 });
            }}
            onToggleUnread={toggleUnread}
            onPrev={goPrev}
            onNext={goNext}
          />
        ) : (
          <InboxDetail
            selected={selected}
            reply={reply}
            setReply={setReply}
            sending={sending}
            onBack={() => setSelected(null)}
            onMarkUnread={handleMarkUnread}
            onReply={handleReply}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
