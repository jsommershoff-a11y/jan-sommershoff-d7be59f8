import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';
import { Loader2, Reply } from 'lucide-react';
import { OutlookMessage } from './types';

interface Props {
  selected: OutlookMessage;
  reply: string;
  setReply: (s: string) => void;
  sending: boolean;
  onBack: () => void;
  onMarkUnread: () => void;
  onReply: () => void;
}

export const InboxDetail = ({
  selected,
  reply,
  setReply,
  sending,
  onBack,
  onMarkUnread,
  onReply,
}: Props) => {
  return (
    <>
      <div className="overflow-y-auto flex-1">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-2">
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
          <label className="text-sm font-medium flex items-center gap-2">
            <Reply className="size-4" /> Antworten
          </label>
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
        <Button variant="outline" onClick={onBack} disabled={sending}>
          Abbrechen
        </Button>
        <Button
          variant="secondary"
          onClick={onMarkUnread}
          disabled={sending || !selected.isRead}
        >
          Als ungelesen markieren
        </Button>
        <Button onClick={onReply} disabled={sending || !reply.trim()}>
          {sending && <Loader2 className="size-4 mr-2 animate-spin" />}
          Antwort senden
        </Button>
      </DialogFooter>
    </>
  );
};
