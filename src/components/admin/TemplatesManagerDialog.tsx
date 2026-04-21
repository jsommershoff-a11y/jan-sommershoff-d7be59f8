import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  useAdminTemplates,
  type AdminTemplate,
  type TemplateKind,
} from '@/hooks/useAdminTemplates';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const KIND_LABELS: Record<TemplateKind, string> = {
  inbox_reply: 'Posteingang-Antwort',
  followup_email: 'Follow-up-Mail',
  contact_preset: 'Kontakt-Vorlage',
};

const PLACEHOLDERS = '{{first_name}}, {{last_name}}, {{name}}, {{email}}, {{subject}}';

export const TemplatesManagerDialog = ({ open, onOpenChange }: Props) => {
  const [activeKind, setActiveKind] = useState<TemplateKind>('inbox_reply');
  const { templates, loading, refresh } = useAdminTemplates();

  const [editing, setEditing] = useState<AdminTemplate | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({
    kind: 'inbox_reply' as TemplateKind,
    name: '',
    subject: '',
    body: '',
    is_default: false,
    sort_order: 0,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) refresh();
  }, [open, refresh]);

  const openNew = () => {
    setEditing(null);
    setForm({
      kind: activeKind,
      name: '',
      subject: '',
      body: '',
      is_default: false,
      sort_order: 0,
    });
    setFormOpen(true);
  };

  const openEdit = (t: AdminTemplate) => {
    setEditing(t);
    setForm({
      kind: t.kind,
      name: t.name,
      subject: t.subject ?? '',
      body: t.body,
      is_default: t.is_default,
      sort_order: t.sort_order,
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.body.trim()) {
      toast.error('Name und Inhalt sind Pflicht');
      return;
    }
    setSaving(true);
    const payload = {
      kind: form.kind,
      name: form.name.trim(),
      subject: form.subject.trim() || null,
      body: form.body,
      is_default: form.is_default,
      sort_order: form.sort_order,
    };
    const { error } = editing
      ? await supabase.from('admin_templates').update(payload).eq('id', editing.id)
      : await supabase.from('admin_templates').insert(payload);
    setSaving(false);
    if (error) {
      toast.error('Speichern fehlgeschlagen');
      return;
    }
    toast.success(editing ? 'Vorlage aktualisiert' : 'Vorlage angelegt');
    setFormOpen(false);
    refresh();
  };

  const handleDelete = async (t: AdminTemplate) => {
    if (!confirm(`Vorlage "${t.name}" wirklich löschen?`)) return;
    const { error } = await supabase.from('admin_templates').delete().eq('id', t.id);
    if (error) {
      toast.error('Löschen fehlgeschlagen');
      return;
    }
    toast.success('Vorlage gelöscht');
    refresh();
  };

  const filtered = templates.filter((t) => t.kind === activeKind);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[calc(100vw-1.5rem)] max-w-3xl max-h-[90vh] sm:max-h-[85vh] flex flex-col p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <FileText className="size-5" /> Vorlagen verwalten
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm break-words">
              Antwort-, Mail- und Kontakt-Vorlagen für deinen Workflow. Platzhalter: {PLACEHOLDERS}
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeKind} onValueChange={(v) => setActiveKind(v as TemplateKind)} className="flex-1 flex flex-col overflow-hidden min-h-0">
            <TabsList className="grid grid-cols-3 h-auto">
              <TabsTrigger value="inbox_reply" className="min-h-11 text-xs sm:text-sm px-1">Posteingang</TabsTrigger>
              <TabsTrigger value="followup_email" className="min-h-11 text-xs sm:text-sm px-1">Follow-ups</TabsTrigger>
              <TabsTrigger value="contact_preset" className="min-h-11 text-xs sm:text-sm px-1">Kontakte</TabsTrigger>
            </TabsList>

            {(['inbox_reply', 'followup_email', 'contact_preset'] as TemplateKind[]).map((k) => (
              <TabsContent key={k} value={k} className="flex-1 overflow-y-auto mt-4 space-y-2 min-h-0">
                <div className="flex justify-end">
                  <Button size="sm" onClick={openNew} className="min-h-11">
                    <Plus className="size-4 mr-1" /> Neue Vorlage
                  </Button>
                </div>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                  </div>
                ) : filtered.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Noch keine Vorlagen in dieser Kategorie.
                  </p>
                ) : (
                  filtered.map((t) => (
                    <Card key={t.id} className="p-3 flex items-start justify-between gap-2 sm:gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm break-words">{t.name}</span>
                          {t.is_default && (
                            <Badge variant="secondary" className="text-[10px]">Standard</Badge>
                          )}
                        </div>
                        {t.subject && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 break-all">
                            Betreff: {t.subject}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 whitespace-pre-wrap break-words">
                          {t.body}
                        </p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(t)} aria-label="Bearbeiten" className="size-11">
                          <Pencil className="size-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(t)} aria-label="Löschen" className="size-11">
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Add / Edit form */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editing ? 'Vorlage bearbeiten' : 'Neue Vorlage'}</DialogTitle>
            <DialogDescription>Platzhalter: {PLACEHOLDERS}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Kategorie</Label>
              <Select value={form.kind} onValueChange={(v) => setForm({ ...form, kind: v as TemplateKind })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(KIND_LABELS) as TemplateKind[]).map((k) => (
                    <SelectItem key={k} value={k}>{KIND_LABELS[k]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="t-name">Name *</Label>
              <Input id="t-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />
            </div>
            {form.kind !== 'contact_preset' && (
              <div className="space-y-1.5">
                <Label htmlFor="t-subject">Betreff</Label>
                <Input id="t-subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} maxLength={200} placeholder="z. B. Re: {{subject}}" />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="t-body">Inhalt *</Label>
              <Textarea id="t-body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={8} maxLength={5000} />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_default} onChange={(e) => setForm({ ...form, is_default: e.target.checked })} />
                Als Standard markieren
              </label>
              <div className="flex items-center gap-2 text-sm">
                <Label htmlFor="t-sort" className="text-xs">Reihenfolge</Label>
                <Input
                  id="t-sort"
                  type="number"
                  className="w-20 h-8"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)} disabled={saving}>Abbrechen</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="size-4 mr-2 animate-spin" />}
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
