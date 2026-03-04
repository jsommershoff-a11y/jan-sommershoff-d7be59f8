CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('contact', 'lead_magnet')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON public.contact_submissions
  FOR SELECT TO authenticated
  USING (true);