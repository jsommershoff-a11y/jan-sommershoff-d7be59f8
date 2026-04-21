import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Sparkles, Loader2, ChevronDown, Check, Wand2, Smile, Briefcase, Scissors } from 'lucide-react';
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

type Tone = 'friendly' | 'professional' | 'shorter';

const TONE_INSTRUCTIONS: Record<Tone, string> = {
  friendly:
    'Schreibe den bisherigen Entwurf des Nutzers OHNE Bedeutungsänderung um – freundlicher, wärmer, persönlicher im Ton. Keine neuen Inhalte, keine neuen Zusagen.',
  professional:
    'Schreibe den bisherigen Entwurf des Nutzers OHNE Bedeutungsänderung um – professioneller, klarer, geschäftlich seriöser. Keine neuen Inhalte, keine neuen Zusagen.',
  shorter:
    'Kürze den bisherigen Entwurf des Nutzers OHNE Bedeutungsänderung deutlich – knapper, präziser, max. 5 Sätze. Alle Kernaussagen behalten, keine neuen Inhalte.',
};

export const AiSuggestButton = ({ context, onApply, size = 'sm' }: Props) => {
  const [loading, setLoading] = useState<null | 'suggestions' | 'draft' | Tone>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [instruction, setInstruction] = useState('');

  const callAi = async (
    mode: 'suggestions' | 'draft',
    extraInstruction?: string,
    loadingKey?: 'suggestions' | 'draft' | Tone,
  ) => {
    setLoading(loadingKey ?? mode);
    try {
      const combinedInstruction = [extraInstruction, instruction.trim() || undefined]
        .filter(Boolean)
        .join(' | ');
      const { data, error } = await supabase.functions.invoke('ai-suggest-reply', {
        body: {
          mode,
          context: {
            ...context,
            instruction: combinedInstruction || undefined,
          },
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (mode === 'draft') {
        if (data?.subject !== undefined && data?.body) {
          onApply({ subject: data.subject ?? '', body: data.body });
          toast.success(loadingKey && loadingKey !== 'draft' ? 'Tonalität angepasst' : 'KI-Entwurf eingefügt');
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

  const refineTone = (tone: Tone) => {
    if (!context.currentDraft?.trim()) {
      toast.error('Bitte zuerst etwas in das Antwort-Feld schreiben.');
      return;
    }
    callAi('draft', TONE_INSTRUCTIONS[tone], tone);
  };

  const isLoading = loading !== null;
  const hasDraft = !!context.currentDraft?.trim();

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:flex-wrap w-full">
        <Input
          type="text"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="Vorgabe (z.B. kurz halten, Termin Donnerstag)"
          maxLength={200}
          disabled={isLoading}
          className="h-10 text-sm w-full sm:w-64"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline" size={size} disabled={isLoading} className="w-full sm:w-auto min-h-10">
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size={size}
              disabled={isLoading || !hasDraft}
              title={!hasDraft ? 'Schreibe zuerst etwas in das Antwort-Feld' : 'Tonalität deines Entwurfs verbessern'}
              className="w-full sm:w-auto min-h-10"
            >
              {loading && (loading === 'friendly' || loading === 'professional' || loading === 'shorter') ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <Wand2 className="size-4 mr-2 text-primary" />
              )}
              Tonalität verbessern
              <ChevronDown className="size-3 ml-1 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 bg-popover">
            <DropdownMenuLabel className="text-xs">Wie umschreiben?</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => refineTone('friendly')} className="cursor-pointer">
              <Smile className="size-4 mr-2" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Freundlicher</span>
                <span className="text-xs text-muted-foreground">Wärmer, persönlicher</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => refineTone('professional')} className="cursor-pointer">
              <Briefcase className="size-4 mr-2" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Professioneller</span>
                <span className="text-xs text-muted-foreground">Klarer, geschäftlich seriös</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => refineTone('shorter')} className="cursor-pointer">
              <Scissors className="size-4 mr-2" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Kürzer</span>
                <span className="text-xs text-muted-foreground">Knapper, max. 5 Sätze</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent className="max-w-2xl w-[calc(100vw-1.5rem)] sm:w-full max-h-[85vh] overflow-y-auto p-4 sm:p-6">
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
