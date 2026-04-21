import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown, ChevronRight, Download, FileText, Inbox, Loader2, LogOut, Mail, Package, Pencil, Plus, Search, Send, ShieldAlert, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { SubmissionsChart } from '@/components/admin/SubmissionsChart';
import { SubmissionsKpis } from '@/components/admin/SubmissionsKpis';
import { InboxDialog } from '@/components/admin/InboxDialog';
import { useUnreadMailCount } from '@/hooks/useUnreadMailCount';
import { SendMailDialog } from '@/components/admin/SendMailDialog';
import { MailTimeline } from '@/components/admin/MailTimeline';
import { TemplatePicker } from '@/components/admin/TemplatePicker';
import { TemplatesManagerDialog } from '@/components/admin/TemplatesManagerDialog';

interface Submission {
  id: string;
  type: string;
  name: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string;
  message: string | null;
  created_at: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<'all' | 'lead_magnet' | 'contact'>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'last_name' | 'first_name' | 'type'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  // Form dialog state (for add + edit)
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    type: 'contact',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Outlook mail state
  const [inboxOpen, setInboxOpen] = useState(false);
  const { count: unreadMail, setCount: setUnreadMail, refresh: refreshUnreadMail } = useUnreadMailCount(true, true);
  const [mailTarget, setMailTarget] = useState<Submission | null>(null);
  const [expandedTimeline, setExpandedTimeline] = useState<Set<string>>(new Set());

  // Templates manager
  const [templatesOpen, setTemplatesOpen] = useState(false);

  const toggleTimeline = (id: string) => {
    setExpandedTimeline((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const loadSubmissions = async () => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast.error('Fehler beim Laden der Einsendungen');
    } else {
      setSubmissions(data || []);
    }
  };

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roleData) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      await loadSubmissions();
      setLoading(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/admin/login');
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
    if (error) {
      toast.error('Löschen fehlgeschlagen');
      return;
    }
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    toast.success('Eintrag gelöscht');
  };

  const handleExportCsv = () => {
    if (filtered.length === 0) {
      toast.error('Keine Einträge zum Exportieren');
      return;
    }
    const escape = (v: string | null) => {
      const s = (v ?? '').toString().replace(/"/g, '""');
      return `"${s}"`;
    };
    const header = ['Datum', 'Typ', 'Vorname', 'Nachname', 'Name', 'E-Mail', 'Telefon', 'Nachricht'];
    const rows = filtered.map((s) => [
      new Date(s.created_at).toLocaleString('de-DE'),
      s.type,
      s.first_name ?? '',
      s.last_name ?? '',
      s.name,
      s.email,
      s.phone ?? '',
      s.message,
    ]);
    const csv = [header, ...rows].map((r) => r.map((c) => escape(c as string | null)).join(',')).join('\n');
    // BOM für Excel-UTF8-Kompatibilität
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `einsendungen-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`${filtered.length} Einträge exportiert`);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ type: 'contact', first_name: '', last_name: '', email: '', phone: '', message: '' });
    setFormOpen(true);
  };

  const openEdit = (s: Submission) => {
    setEditingId(s.id);
    // Backfill from "name" if first/last not yet stored
    const parts = (s.name ?? '').trim().split(/\s+/);
    const fallbackFirst = parts[0] ?? '';
    const fallbackLast = parts.slice(1).join(' ') ?? '';
    setForm({
      type: s.type,
      first_name: s.first_name ?? fallbackFirst,
      last_name: s.last_name ?? fallbackLast,
      email: s.email,
      phone: s.phone ?? '',
      message: s.message ?? '',
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    const first_name = form.first_name.trim();
    const last_name = form.last_name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (!first_name || !last_name || !email || !phone) {
      toast.error('Vorname, Nachname, E-Mail und Telefon sind Pflicht');
      return;
    }
    if (!/^[+\d][\d\s\-/().]{3,49}$/.test(phone)) {
      toast.error('Bitte eine gültige Telefonnummer angeben');
      return;
    }

    setSaving(true);
    const payload = {
      type: form.type,
      name: `${first_name} ${last_name}`.trim(),
      first_name,
      last_name,
      email,
      phone,
      message: form.message.trim() || null,
    };

    if (editingId) {
      const { data, error } = await supabase
        .from('contact_submissions')
        .update(payload)
        .eq('id', editingId)
        .select()
        .single();
      setSaving(false);
      if (error) {
        toast.error('Speichern fehlgeschlagen');
        return;
      }
      setSubmissions((prev) => prev.map((s) => (s.id === editingId ? (data as Submission) : s)));
      setFormOpen(false);
      toast.success('Eintrag aktualisiert');
    } else {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert(payload)
        .select()
        .single();
      setSaving(false);
      if (error) {
        toast.error('Hinzufügen fehlgeschlagen');
        return;
      }
      setSubmissions((prev) => [data as Submission, ...prev]);
      setFormOpen(false);
      toast.success('Eintrag hinzugefügt');
    }
  };

  const q = search.trim().toLowerCase();
  const filtered = submissions
    .filter((s) => {
      if (filter !== 'all' && s.type !== filter) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.message?.toLowerCase().includes(q) ?? false)
      );
    })
    .sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortBy === 'last_name') {
        return (a.last_name ?? '').localeCompare(b.last_name ?? '', 'de') * dir;
      }
      if (sortBy === 'first_name') {
        return (a.first_name ?? '').localeCompare(b.first_name ?? '', 'de') * dir;
      }
      if (sortBy === 'type') return a.type.localeCompare(b.type) * dir;
      return (
        (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * dir
      );
    });

  const toggleSort = (key: 'date' | 'last_name' | 'first_name' | 'type') => {
    if (sortBy === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDir(key === 'date' ? 'desc' : 'asc');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <Card className="max-w-md p-8 text-center">
          <ShieldAlert className="size-12 text-destructive mx-auto mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">Kein Zugriff</h1>
          <p className="text-muted-foreground mb-6">
            Du bist angemeldet, aber hast keine Admin-Rechte. Bitte den Administrator, dir die Rolle zuzuweisen.
          </p>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="size-4 mr-2" /> Abmelden
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lead-Übersicht</h1>
            <p className="text-muted-foreground mt-1">
              {filtered.length === submissions.length
                ? `${submissions.length} Einsendungen insgesamt`
                : `${filtered.length} von ${submissions.length} Einsendungen`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportCsv}>
              <Download className="size-4 mr-2" /> CSV-Export
            </Button>
            <Button onClick={openAdd}>
              <Plus className="size-4 mr-2" /> Neuer Eintrag
            </Button>
            <Dialog open={formOpen} onOpenChange={setFormOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingId ? 'Eintrag bearbeiten' : 'Neuen Kontakt hinzufügen'}</DialogTitle>
                  <DialogDescription>
                    {editingId
                      ? 'Ändere die Daten des bestehenden Eintrags.'
                      : 'Manuell einen Lead oder Kontakt zur Übersicht hinzufügen.'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <TemplatePicker
                      kind="contact_preset"
                      label="Vorlage anwenden"
                      onPick={({ body }) => setForm((f) => ({ ...f, message: f.message ? `${f.message}\n${body}` : body }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Typ</Label>
                    <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                      <SelectTrigger id="type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contact">Kontakt</SelectItem>
                        <SelectItem value="lead_magnet">Lead-Magnet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">Vorname *</Label>
                      <Input
                        id="first_name"
                        autoComplete="given-name"
                        value={form.first_name}
                        onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Nachname *</Label>
                      <Input
                        id="last_name"
                        autoComplete="family-name"
                        value={form.last_name}
                        onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                        maxLength={100}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      maxLength={255}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+49 170 1234567"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      maxLength={50}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Nachricht / Notiz</Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      maxLength={5000}
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setFormOpen(false)} disabled={saving}>
                    Abbrechen
                  </Button>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving && <Loader2 className="size-4 mr-2 animate-spin" />}
                    {editingId ? 'Speichern' : 'Hinzufügen'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={() => setInboxOpen(true)} className="relative">
              <Inbox className="size-4 mr-2" /> Posteingang
              {unreadMail !== null && unreadMail > 0 && (
                <Badge variant="default" className="ml-2 h-5 px-1.5 text-[10px]">
                  {unreadMail}
                </Badge>
              )}
            </Button>
            <Button variant="outline" onClick={() => setTemplatesOpen(true)}>
              <FileText className="size-4 mr-2" /> Vorlagen
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="size-4 mr-2" /> Abmelden
            </Button>
          </div>
        </div>

        <SubmissionsKpis submissions={submissions} />
        <SubmissionsChart submissions={submissions} />

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suche nach Name, E-Mail oder Nachricht…"
            className="pl-9 pr-9"
            maxLength={200}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Suche zurücksetzen"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-6 flex-wrap items-center">
          <Button size="sm" variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>
            Alle ({submissions.length})
          </Button>
          <Button
            size="sm"
            variant={filter === 'lead_magnet' ? 'default' : 'outline'}
            onClick={() => setFilter('lead_magnet')}
          >
            <Package className="size-3.5 mr-1.5" />
            Lead-Magnet ({submissions.filter((s) => s.type === 'lead_magnet').length})
          </Button>
          <Button
            size="sm"
            variant={filter === 'contact' ? 'default' : 'outline'}
            onClick={() => setFilter('contact')}
          >
            <Mail className="size-3.5 mr-1.5" />
            Kontakt ({submissions.filter((s) => s.type === 'contact').length})
          </Button>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap items-center text-sm">
          <span className="text-muted-foreground mr-1">Sortieren:</span>
          {([
            { key: 'date', label: 'Datum' },
            { key: 'name', label: 'Name' },
            { key: 'type', label: 'Typ' },
          ] as const).map(({ key, label }) => {
            const active = sortBy === key;
            const Icon = !active ? ArrowUpDown : sortDir === 'asc' ? ArrowUp : ArrowDown;
            return (
              <Button
                key={key}
                size="sm"
                variant={active ? 'default' : 'outline'}
                onClick={() => toggleSort(key)}
              >
                {label}
                <Icon className="size-3.5 ml-1.5" />
              </Button>
            );
          })}
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <Card className="p-12 text-center text-muted-foreground">Keine Einträge</Card>
          ) : (
            filtered.map((s) => (
              <Card key={s.id} className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant={s.type === 'lead_magnet' ? 'default' : 'secondary'}>
                      {s.type === 'lead_magnet' ? '🎯 Lead-Magnet' : '📩 Kontakt'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(s.created_at).toLocaleString('de-DE', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMailTarget(s)}
                      title="E-Mail via Outlook senden"
                    >
                      <Send className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openEdit(s)}>
                      <Pencil className="size-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="size-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Eintrag löschen?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Der Eintrag von <strong>{s.name}</strong> ({s.email}) wird unwiderruflich gelöscht.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(s.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Löschen
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-sm">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Vorname</p>
                    <p className="font-medium text-foreground truncate">{s.first_name ?? '—'}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Nachname</p>
                    <p className="font-medium text-foreground truncate">{s.last_name ?? '—'}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">E-Mail</p>
                    <a href={`mailto:${s.email}`} className="text-primary hover:underline font-medium truncate block">
                      {s.email}
                    </a>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Telefon</p>
                    {s.phone ? (
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${s.phone.replace(/[^+\d]/g, '')}`}
                          className="text-primary hover:underline font-medium truncate"
                          title="Anrufen"
                        >
                          {s.phone}
                        </a>
                        <a
                          href={`https://wa.me/${s.phone.replace(/[^\d]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp öffnen"
                          aria-label="WhatsApp"
                          className="inline-flex items-center justify-center size-6 rounded-md bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] transition-colors shrink-0"
                        >
                          <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </a>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">—</p>
                    )}
                  </div>
                </div>
                {s.message && (
                  <p className="text-sm text-muted-foreground mt-3 whitespace-pre-line">{s.message}</p>
                )}
                <button
                  type="button"
                  onClick={() => toggleTimeline(s.id)}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition"
                >
                  {expandedTimeline.has(s.id) ? (
                    <ChevronDown className="size-3.5" />
                  ) : (
                    <ChevronRight className="size-3.5" />
                  )}
                  Mail-Verlauf
                </button>
                {expandedTimeline.has(s.id) && (
                  <div className="mt-3 pl-3 border-t pt-3">
                    <MailTimeline email={s.email} recipientName={s.name} />
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>

      <InboxDialog
        open={inboxOpen}
        onOpenChange={setInboxOpen}
        unreadCount={unreadMail}
        setUnreadCount={setUnreadMail}
        refreshUnread={refreshUnreadMail}
      />
      <TemplatesManagerDialog open={templatesOpen} onOpenChange={setTemplatesOpen} />
      <SendMailDialog
        open={!!mailTarget}
        onOpenChange={(o) => !o && setMailTarget(null)}
        to={mailTarget?.email || ''}
        recipientName={mailTarget?.name}
        defaultSubject={
          mailTarget?.type === 'lead_magnet'
            ? 'Dein KI Notfallkoffer'
            : 'Re: Deine Anfrage'
        }
      />
    </div>
  );
}
