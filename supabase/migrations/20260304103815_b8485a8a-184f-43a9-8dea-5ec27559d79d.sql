
-- Drop overly permissive SELECT policy (contact submissions should only be accessed by admins via dashboard)
DROP POLICY IF EXISTS "Allow authenticated reads" ON public.contact_submissions;

-- Drop existing INSERT policy and replace with a tighter one
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_submissions;

CREATE POLICY "Allow public inserts with validation" ON public.contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    type IN ('contact', 'lead_magnet') AND
    length(name) > 0 AND length(name) <= 100 AND
    length(email) > 0 AND length(email) <= 255 AND
    (message IS NULL OR length(message) <= 5000)
  );
