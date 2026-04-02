-- Fix overly permissive RLS on contacts table
-- Drop the wide-open policy that allows anyone full access
DROP POLICY IF EXISTS "service_role_all" ON public.contacts;

-- Create restrictive policy: only service_role can access (via Supabase dashboard/edge functions)
-- No public/anon/authenticated access needed for this internal CRM table
CREATE POLICY "Service role only" ON public.contacts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);