-- 1. Explicitly deny SELECT on contact_submissions for anon/authenticated
CREATE POLICY "Deny public reads" ON public.contact_submissions
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- 2. Explicitly deny ALL on contacts for authenticated/anon roles
CREATE POLICY "Deny authenticated access" ON public.contacts
  FOR ALL
  TO authenticated, anon
  USING (false)
  WITH CHECK (false);

-- 3. Fix mutable search_path on update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;