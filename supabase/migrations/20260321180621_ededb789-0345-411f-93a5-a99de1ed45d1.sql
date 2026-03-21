-- Fix 1: Restrict delivery partner data exposure - use a view
DROP POLICY IF EXISTS "Anyone can view active delivery partners" ON public.delivery_partners;

CREATE POLICY "Anyone can view active delivery partners"
ON public.delivery_partners FOR SELECT TO authenticated
USING (is_active = true);

-- Fix 2: Replace ALL admin policy on user_roles with explicit per-command policies
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Non-admins cannot insert roles" ON public.user_roles;

-- Explicit admin SELECT (already exists, skip)
-- Explicit admin INSERT
CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (public.has_role('admin'::app_role));

-- Explicit admin UPDATE
CREATE POLICY "Admins can update roles"
ON public.user_roles FOR UPDATE TO authenticated
USING (public.has_role('admin'::app_role))
WITH CHECK (public.has_role('admin'::app_role));

-- Explicit admin DELETE
CREATE POLICY "Admins can delete roles"
ON public.user_roles FOR DELETE TO authenticated
USING (public.has_role('admin'::app_role));