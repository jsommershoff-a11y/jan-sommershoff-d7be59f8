import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FileText, ChevronDown } from 'lucide-react';
import {
  useAdminTemplates,
  applyTemplateVars,
  type TemplateKind,
  type AdminTemplate,
} from '@/hooks/useAdminTemplates';

interface Props {
  kind: TemplateKind;
  vars?: Record<string, string | null | undefined>;
  onPick: (resolved: { name: string; subject: string; body: string }, raw: AdminTemplate) => void;
  label?: string;
  size?: 'sm' | 'default';
  variant?: 'outline' | 'ghost' | 'secondary';
}

export const TemplatePicker = ({
  kind,
  vars = {},
  onPick,
  label = 'Vorlage einfügen',
  size = 'sm',
  variant = 'outline',
}: Props) => {
  const { templates, loading } = useAdminTemplates(kind);
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant={variant} size={size} disabled={loading} className="min-h-11">
          <FileText className="size-4 mr-2" />
          {label}
          <ChevronDown className="size-3 ml-1 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[calc(100vw-2rem)] sm:w-72 max-h-[60vh] sm:max-h-80 overflow-y-auto bg-popover">
        <DropdownMenuLabel className="text-xs">
          {templates.length === 0 ? 'Keine Vorlagen' : `${templates.length} Vorlage(n)`}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {templates.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => {
              onPick(
                {
                  name: t.name,
                  subject: applyTemplateVars(t.subject, vars),
                  body: applyTemplateVars(t.body, vars),
                },
                t,
              );
              setOpen(false);
            }}
            className="flex flex-col items-start gap-0.5 py-3 min-h-11 cursor-pointer"
          >
            <span className="font-medium text-sm break-words">{t.name}</span>
            {t.subject && (
              <span className="text-xs text-muted-foreground line-clamp-1 break-all">
                {applyTemplateVars(t.subject, vars)}
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
