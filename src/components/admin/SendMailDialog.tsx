import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { TemplatePicker } from '@/components/admin/TemplatePicker';
import { AiSuggestButton } from '@/components/admin/AiSuggestButton';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  to: string;
  recipientName?: string;
  defaultSubject?: string;
}

export const SendMailDialog = ({
  open,
  onOpenChange,
  to,
  recipientName,
  defaultSubject,
}: Props) => {
  const [subject, setSubject] = useState(defaultSubject || '');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open) {
      setSubject(defaultSubject || '');
      setBody(recipientName ? `Hallo ${recipientName.split(' ')[0]},\n\n` : '');
    }
  }, [open, defaultSubject, recipientName]);

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) {
      toast.error('Betreff und Nachricht sind erforderlich');
      return;
    }
    setSending(true);
    const { error } = await supabase.functions.invoke('outlook-mail', {
      body: { action: 'send', to, subject, body, isHtml: false },
    });
    setSending(false);
    if (error) {
      toast.error('E-Mail konnte nicht gesendet werden');
      return;
    }
    toast.success(`E-Mail an ${to} gesendet`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="size-5" /> E-Mail senden
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>An</Label>
            <Input value={to} disabled />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="mail-subject">Betreff *</Label>
              <TemplatePicker
                kind="followup_email"
                vars={{
                  first_name: recipientName?.split(' ')[0] ?? '',
                  name: recipientName ?? '',
                  email: to,
                  subject: defaultSubject ?? '',
                }}
                onPick={({ subject: s, body: b }) => {
                  if (s) setSubject(s);
                  setBody(b);
                }}
              />
            </div>
            <Input
              id="mail-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={200}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mail-body">Nachricht *</Label>
            <Textarea
              id="mail-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              maxLength={10000}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={sending}>
            Abbrechen
          </Button>
          <Button onClick={handleSend} disabled={sending}>
            {sending && <Loader2 className="size-4 mr-2 animate-spin" />}
            Senden
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
