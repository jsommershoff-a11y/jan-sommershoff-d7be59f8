import { CheckCircle2, FileText, Clock, Minus, ExternalLink } from 'lucide-react';
import { AVV_REGISTRY, STATUS_LABELS, type AvvStatus } from '@/data/avvRegistry';

const statusIcon: Record<AvvStatus, React.ReactNode> = {
  signed: <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden />,
  online_terms: <FileText className="h-4 w-4 text-emerald-500" aria-hidden />,
  pending: <Clock className="h-4 w-4 text-amber-500" aria-hidden />,
  not_required: <Minus className="h-4 w-4 text-muted-foreground" aria-hidden />,
};

function formatDate(iso?: string) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function AvvRegister() {
  return (
    <div className="not-prose space-y-4">
      <p className="text-sm text-muted-foreground">
        Die folgende Übersicht dokumentiert alle Auftragsverarbeitungsverträge
        (AVV / Data Processing Agreements) gemäß Art. 28 DSGVO, die wir mit
        unseren technischen Dienstleistern abgeschlossen haben. Stand der
        Übersicht: {new Date().toLocaleDateString('de-DE', {
          day: '2-digit', month: '2-digit', year: 'numeric'
        })}.
      </p>

      <div className="space-y-3">
        {AVV_REGISTRY.map((entry) => (
          <article
            key={entry.id}
            id={`avv-${entry.id}`}
            className="rounded-lg border border-border bg-muted/20 p-4 sm:p-5 scroll-mt-24"
          >
            <header className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {entry.vendor}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {entry.service}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground">
                {statusIcon[entry.status]}
                {STATUS_LABELS[entry.status]}
              </span>
            </header>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Zweck
                </dt>
                <dd className="text-foreground/90">{entry.purpose}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Rechtsgrundlage
                </dt>
                <dd className="text-foreground/90">{entry.legalBasis}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Vertragsdatum
                </dt>
                <dd className="text-foreground/90">{formatDate(entry.signedOn)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Verarbeitungsort
                </dt>
                <dd className="text-foreground/90">{entry.thirdCountry ?? 'Deutschland'}</dd>
              </div>
            </dl>

            {(entry.dpaUrl || entry.privacyUrl) && (
              <div className="mt-3 flex flex-wrap gap-3 pt-3 border-t border-border/60">
                {entry.dpaUrl && (
                  <a
                    href={entry.dpaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                  >
                    AVV / DPA <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                )}
                {entry.privacyUrl && (
                  <a
                    href={entry.privacyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                  >
                    Datenschutz <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>

      <p className="text-xs text-muted-foreground pt-2">
        Eine Kopie der jeweiligen Verträge stellen wir Betroffenen auf Anfrage
        gerne zur Verfügung. Bitte kontaktieren Sie uns dazu per E-Mail an{' '}
        <a href="mailto:j.s@jan-sommershoff.de" className="text-accent hover:underline">
          j.s@jan-sommershoff.de
        </a>.
      </p>
    </div>
  );
}
