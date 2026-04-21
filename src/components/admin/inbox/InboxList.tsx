import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Loader2, Search, X } from 'lucide-react';
import { OutlookMessage, PAGE_SIZE } from './types';

interface Props {
  loading: boolean;
  messages: OutlookMessage[];
  search: string;
  setSearch: (s: string) => void;
  unreadOnly: boolean;
  page: number;
  onSelect: (m: OutlookMessage) => void;
  onSearchSubmit: () => void;
  onClearSearch: () => void;
  onToggleUnread: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const InboxList = ({
  loading,
  messages,
  search,
  setSearch,
  unreadOnly,
  page,
  onSelect,
  onSearchSubmit,
  onClearSearch,
  onToggleUnread,
  onPrev,
  onNext,
}: Props) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSearchSubmit();
            }}
            placeholder="Suche (Enter zum Suchen)…"
            className="pl-9 pr-9"
          />
          {search && (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <Button
          type="button"
          variant={unreadOnly ? 'default' : 'outline'}
          onClick={onToggleUnread}
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
            <button key={m.id} onClick={() => onSelect(m)} className="w-full text-left">
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
                        {m.from?.emailAddress?.name ||
                          m.from?.emailAddress?.address ||
                          'Unbekannt'}
                      </span>
                    </div>
                    <p className="text-sm font-semibold truncate">
                      {m.subject || '(kein Betreff)'}
                    </p>
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
        <span className="text-xs text-muted-foreground">Seite {page + 1}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onPrev} disabled={loading || page === 0}>
            <ChevronLeft className="size-4 mr-1" /> Zurück
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={loading || messages.length < PAGE_SIZE}
          >
            Weiter <ChevronRight className="size-4 ml-1" />
          </Button>
        </div>
      </div>
    </>
  );
};
