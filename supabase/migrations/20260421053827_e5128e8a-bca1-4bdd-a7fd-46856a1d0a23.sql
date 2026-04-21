-- 1. Fix expenses: replace public-all policy with owner-scoped policies
DROP POLICY IF EXISTS "expenses_all_access" ON public.expenses;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own expenses" ON public.expenses
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own expenses" ON public.expenses
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own expenses" ON public.expenses
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own expenses" ON public.expenses
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 2. Enable RLS + add owner-scoped policies on recurring_transactions
ALTER TABLE public.recurring_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own recurring" ON public.recurring_transactions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own recurring" ON public.recurring_transactions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own recurring" ON public.recurring_transactions
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own recurring" ON public.recurring_transactions
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 3. Enable RLS + add owner-scoped policies on tasks (text user_id)
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own tasks" ON public.tasks
  FOR SELECT TO authenticated USING (auth.uid()::text = user_id);
CREATE POLICY "Users insert own tasks" ON public.tasks
  FOR INSERT TO authenticated WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users update own tasks" ON public.tasks
  FOR UPDATE TO authenticated USING (auth.uid()::text = user_id) WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users delete own tasks" ON public.tasks
  FOR DELETE TO authenticated USING (auth.uid()::text = user_id);

-- 4. Enable RLS + owner-scoped policies on transactions (text user_id)
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own transactions" ON public.transactions
  FOR SELECT TO authenticated USING (auth.uid()::text = user_id);
CREATE POLICY "Users insert own transactions" ON public.transactions
  FOR INSERT TO authenticated WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users update own transactions" ON public.transactions
  FOR UPDATE TO authenticated USING (auth.uid()::text = user_id) WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users delete own transactions" ON public.transactions
  FOR DELETE TO authenticated USING (auth.uid()::text = user_id);

-- 5. Lock down service-role-only / always-true CRM tables to service_role
DROP POLICY IF EXISTS "service_role_all" ON public.companies;
CREATE POLICY "Service role only" ON public.companies
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Deny anon/auth" ON public.companies
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "service_role_all" ON public.deals;
CREATE POLICY "Service role only" ON public.deals
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Deny anon/auth" ON public.deals
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "service_role_all" ON public.documents;
CREATE POLICY "Service role only" ON public.documents
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Deny anon/auth" ON public.documents
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "service_role_all" ON public.interactions;
CREATE POLICY "Service role only" ON public.interactions
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Deny anon/auth" ON public.interactions
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "service_role_all" ON public.tickets;
CREATE POLICY "Service role only" ON public.tickets
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Deny anon/auth" ON public.tickets
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- 6. Budgets, invoices, user_mappings: replace permissive USING(true) with deny-all + service_role
DROP POLICY IF EXISTS "budgets_all_access" ON public.budgets;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role only" ON public.budgets
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Deny anon/auth" ON public.budgets
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "invoices_all_access" ON public.invoices;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role only" ON public.invoices
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Deny anon/auth" ON public.invoices
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "user_mappings_all_access" ON public.user_mappings;
ALTER TABLE public.user_mappings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role only" ON public.user_mappings
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Deny anon/auth" ON public.user_mappings
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- 7. Fix mutable search_path on trigger functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;