import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Sparkles, Loader2, ChevronDown, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AiContext {
  incomingSubject?: string;
  incomingBody?: string;
  senderName?: string;
  senderEmail?: string;
  currentDraft?: string;
  type?: 'reply' | 'follow_up';
}

interface Suggestion {
  label: string;
  subject: string;
  body: string;
}

interface Props {
  context: AiContext;
  /** Called with chosen subject + body. Subject may be empty string. */
  onApply: (result: { subject: string; body: string }) => void;
  /** If true, expose only "Entwurf" mode (e.g. inbox replies don't need a subject). */
  hideSuggestionsMode?: boolean;
  size?: 'sm' | 'default';
}

export const AiSuggestButton = ({ context, onApply, size = 'sm' }: Props) => {
  const [loading, setLoading] = useState<null | 'suggestions' | 'draft'>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  const callAi = async (mode: 'suggestions' | 'draft') => {
    setLoading(mode);
    try {
      const { data, error } = await supabase.functions.invoke('ai-suggest-reply', {
        body: { mode, context },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (mode === 'draft') {
        if (data?.subject !== undefined && data?.body) {
          onApply({ subject: data.subject ?? '', body: data.body });
          toast.success('KI-Entwurf eingefügt');
        } else {
          throw new Error('Ungültige KI-Antwort');
        }
      } else {
        if (Array.isArray(data?.suggestions) && data.suggestions.length > 0) {
          setSuggestions(data.suggestions);
          setPickerOpen(true);
        } else {
          throw new Error('Keine Vorschläge erhalten');
        }
      }
    } catch (e) {
      console.error('AI suggest error:', e);
      const msg = e instanceof Error ? e.message : 'KI-Antwort fehlgeschlagen';
      toast.error(msg);
    } finally {
      setLoading(null);
    }
  };

  const isLoading = loading !== null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" size={size} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="size-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="size-4 mr-2 text-primary" />
            )}
            KI-Vorschlag
            <ChevronDown className="size-3 ml-1 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-popover">
          <DropdownMenuLabel className="text-xs">Was soll die KI tun?</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => callAi('suggestions')} className="cursor-pointer">
            <Sparkles className="size-4 mr-2" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">3 Vorschläge</span>
              <span className="text-xs text-muted-foreground">Auswahl verschiedener Stile</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => callAi('draft')} className="cursor-pointer">
            <Check className="size-4 mr-2" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Vollständiger Entwurf</span>
              <span className="text-xs text-muted-foreground">Direkt in Feld einfügen</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" /> KI-Antwortvorschläge
            </DialogTitle>
            <DialogDescription>
              Wähle eine Variante – sie wird ins Antwort-Feld übernommen.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {suggestions?.map((s, idx) => (
              <Card key={idx} className="p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {s.label}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => {
                      onApply({ subject: s.subject ?? '', body: s.body });
                      setPickerOpen(false);
                      toast.success('Vorschlag übernommen');
                    }}
                  >
                    <Check className="size-4 mr-1" /> Übernehmen
                  </Button>
                </div>
                {s.subject && (
                  <p className="text-sm font-medium text-foreground">{s.subject}</p>
                )}
                <p className="text-sm text-muted-foreground whitespace-pre-line">{s.body}</p>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
