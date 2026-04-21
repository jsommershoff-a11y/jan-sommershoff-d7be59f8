import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type TemplateKind = 'inbox_reply' | 'followup_email' | 'contact_preset';

export interface AdminTemplate {
  id: string;
  kind: TemplateKind;
  name: string;
  subject: string | null;
  body: string;
  is_default: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/**
 * Replace {{first_name}}, {{last_name}}, {{name}}, {{email}}, {{subject}}
 * tokens in template strings.
 */
export function applyTemplateVars(
  text: string | null | undefined,
  vars: Record<string, string | null | undefined>,
): string {
  if (!text) return '';
  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (_m, key: string) => {
    const v = vars[key];
    return v == null ? '' : String(v);
  });
}

export function useAdminTemplates(kind?: TemplateKind) {
  const [templates, setTemplates] = useState<AdminTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('admin_templates')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    if (kind) query = query.eq('kind', kind);
    const { data, error } = await query;
    setLoading(false);
    if (error) {
      console.error('Fehler beim Laden der Vorlagen:', error);
      return;
    }
    setTemplates((data ?? []) as AdminTemplate[]);
  }, [kind]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return { templates, loading, refresh: fetchTemplates };
}
