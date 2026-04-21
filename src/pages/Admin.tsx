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
import { ArrowDown, ArrowUp, ArrowUpDown, Download, Inbox, Loader2, LogOut, Mail, Package, Pencil, Plus, Search, Send, ShieldAlert, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { SubmissionsChart } from '@/components/admin/SubmissionsChart';
import { SubmissionsKpis } from '@/components/admin/SubmissionsKpis';
import { InboxDialog } from '@/components/admin/InboxDialog';
import { SendMailDialog } from '@/components/admin/SendMailDialog';

interface Submission {
  id: string;
  type: string;
  name: string;
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
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'type'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  // Form dialog state (for add + edit)
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    type: 'contact',
    name: '',
    email: '',
    message: '',
  });

  // Outlook mail state
  const [inboxOpen, setInboxOpen] = useState(false);
  const [mailTarget, setMailTarget] = useState<Submission | null>(null);

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
    const header = ['Datum', 'Typ', 'Name', 'E-Mail', 'Nachricht'];
    const rows = filtered.map((s) => [
      new Date(s.created_at).toLocaleString('de-DE'),
      s.type,
      s.name,
      s.email,
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
    setForm({ type: 'contact', name: '', email: '', message: '' });
    setFormOpen(true);
  };

  const openEdit = (s: Submission) => {
    setEditingId(s.id);
    setForm({
      type: s.type,
      name: s.name,
      email: s.email,
      message: s.message ?? '',
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error('Name und E-Mail sind Pflicht');
      return;
    }
    setSaving(true);
    const payload = {
      type: form.type,
      name: form.name.trim(),
      email: form.email.trim(),
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
      if (sortBy === 'name') return a.name.localeCompare(b.name, 'de') * dir;
      if (sortBy === 'type') return a.type.localeCompare(b.type) * dir;
      return (
        (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * dir
      );
    });

  const toggleSort = (key: 'date' | 'name' | 'type') => {
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
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      maxLength={255}
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
            <Button variant="outline" onClick={() => setInboxOpen(true)}>
              <Inbox className="size-4 mr-2" /> Posteingang
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
                  <div className="flex items-center gap-3">
                    <a
                      href={`mailto:${s.email}`}
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      {s.email}
                    </a>
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
                <p className="font-semibold text-foreground">{s.name}</p>
                {s.message && (
                  <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{s.message}</p>
                )}
              </Card>
            ))
          )}
        </div>
      </div>

      <InboxDialog open={inboxOpen} onOpenChange={setInboxOpen} />
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
