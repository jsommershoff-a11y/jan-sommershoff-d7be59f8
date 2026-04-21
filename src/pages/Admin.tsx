import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, LogOut, Mail, Package, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

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

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }

      // Check admin role
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

      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Fehler beim Laden der Einsendungen');
      } else {
        setSubmissions(data || []);
      }
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

  const filtered = submissions.filter((s) => filter === 'all' || s.type === filter);

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lead-Übersicht</h1>
            <p className="text-muted-foreground mt-1">{submissions.length} Einsendungen insgesamt</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="size-4 mr-2" /> Abmelden
          </Button>
        </div>

        <div className="flex gap-2 mb-6">
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
                  <div className="flex items-center gap-3">
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
                  <a
                    href={`mailto:${s.email}`}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    {s.email}
                  </a>
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
    </div>
  );
}
