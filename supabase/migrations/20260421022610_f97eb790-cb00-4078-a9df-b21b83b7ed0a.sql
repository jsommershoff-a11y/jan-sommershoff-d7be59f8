-- Templates für Admin-Workflows: Posteingangs-Antworten, Follow-up-Mails, Kontakt-Vorlagen
CREATE TABLE IF NOT EXISTS public.admin_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('inbox_reply', 'followup_email', 'contact_preset')),
  name text NOT NULL,
  subject text,
  body text NOT NULL,
  is_default boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_templates ENABLE ROW LEVEL SECURITY;

-- Nur Admins dürfen sehen/ändern
CREATE POLICY "Admins can view templates"
  ON public.admin_templates FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert templates"
  ON public.admin_templates FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update templates"
  ON public.admin_templates FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete templates"
  ON public.admin_templates FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER admin_templates_set_updated_at
  BEFORE UPDATE ON public.admin_templates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS admin_templates_kind_sort_idx
  ON public.admin_templates(kind, sort_order, created_at);

-- Seed: nützliche Standardvorlagen
INSERT INTO public.admin_templates (kind, name, subject, body, is_default, sort_order) VALUES
  ('inbox_reply', 'Termin vorschlagen', 'Re: {{subject}}',
   'Hi {{first_name}},\n\ndanke für deine Nachricht. Lass uns gerne kurz telefonieren – hier kannst du dir direkt einen Slot buchen:\nhttps://cal.com/jan-sommershoff\n\nBeste Grüße\nJan', true, 10),
  ('inbox_reply', 'Erstkontakt – kurze Rückfrage', 'Re: {{subject}}',
   'Hi {{first_name}},\n\ndanke für deine Anfrage. Damit ich dir gezielt helfen kann: In welchem Bereich verlierst du aktuell die meiste Zeit (Vertrieb, Admin, Reporting, Kundenkommunikation)?\n\nBeste Grüße\nJan', false, 20),
  ('inbox_reply', 'Höfliche Absage', 'Re: {{subject}}',
   'Hi {{first_name}},\n\ndanke für deine Nachricht. Aktuell passt das aus meiner Seite leider nicht. Ich melde mich, sobald sich daran etwas ändert.\n\nBeste Grüße\nJan', false, 30),
  ('followup_email', 'Potenzialanalyse – Termin-Link', 'Deine kostenlose Potenzialanalyse',
   'Hi {{first_name}},\n\nwie besprochen – hier der Link zur kostenlosen Potenzialanalyse:\nhttps://cal.com/jan-sommershoff/potenzialanalyse\n\nWir gehen 30 Minuten gemeinsam durch deine Prozesse und identifizieren die schnellsten KI-Hebel.\n\nBeste Grüße\nJan', true, 10),
  ('followup_email', 'Nachfass nach 7 Tagen', 'Kurzer Nachfass zu deiner Anfrage',
   'Hi {{first_name}},\n\nletzte Woche hast du dich für die Potenzialanalyse interessiert. Ist das Thema aktuell noch relevant für dich? Wenn ja, schicke ich dir gerne zwei Termine vor.\n\nBeste Grüße\nJan', false, 20),
  ('followup_email', 'KI Starter Kit – Übergabe', 'Dein KI Starter Kit',
   'Hi {{first_name}},\n\nanbei dein KI Starter Kit. Wenn du beim Umsetzen Fragen hast – einfach auf diese Mail antworten.\n\nBeste Grüße\nJan', false, 30),
  ('contact_preset', 'Lead aus Website-Formular', NULL,
   'Quelle: jansommershoff.de Kontaktformular', true, 10),
  ('contact_preset', 'Lead Magnet – KI Starter Kit', NULL,
   'Quelle: KI Starter Kit Anfrage', false, 20),
  ('contact_preset', 'Empfehlung / Netzwerk', NULL,
   'Quelle: Persönliche Empfehlung', false, 30);