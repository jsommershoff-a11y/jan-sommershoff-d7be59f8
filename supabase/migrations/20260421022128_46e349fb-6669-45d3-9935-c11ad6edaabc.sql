-- Add structured contact fields to contact_submissions
ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS phone text;

-- Backfill: split existing "name" into first/last (best effort)
UPDATE public.contact_submissions
SET
  first_name = COALESCE(first_name, NULLIF(split_part(name, ' ', 1), '')),
  last_name  = COALESCE(last_name,  NULLIF(NULLIF(regexp_replace(name, '^\S+\s*', ''), ''), name))
WHERE first_name IS NULL OR last_name IS NULL;

-- Replace public insert policy to require first_name, last_name, phone
DROP POLICY IF EXISTS "Allow public inserts with validation" ON public.contact_submissions;

CREATE POLICY "Allow public inserts with validation"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  type = ANY (ARRAY['contact'::text, 'lead_magnet'::text])
  AND length(name) > 0 AND length(name) <= 200
  AND length(email) > 0 AND length(email) <= 255
  AND first_name IS NOT NULL AND length(first_name) BETWEEN 1 AND 100
  AND last_name  IS NOT NULL AND length(last_name)  BETWEEN 1 AND 100
  AND phone      IS NOT NULL AND length(phone)      BETWEEN 4 AND 50
  AND (message IS NULL OR length(message) <= 5000)
);