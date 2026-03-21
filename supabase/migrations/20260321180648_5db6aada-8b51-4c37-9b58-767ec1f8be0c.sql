-- Fix delivery partner data exposure: only allow users to see partners assigned to their orders
DROP POLICY IF EXISTS "Anyone can view active delivery partners" ON public.delivery_partners;

CREATE POLICY "Users can view their assigned delivery partner"
ON public.delivery_partners FOR SELECT TO authenticated
USING (
  id IN (
    SELECT delivery_partner_id FROM public.orders WHERE user_id = auth.uid() AND delivery_partner_id IS NOT NULL
  )
  OR public.has_role('admin'::app_role)
);

-- Fix privilege escalation: add restrictive policy to block non-admin inserts
CREATE POLICY "Block non-admin role inserts"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (public.has_role('admin'::app_role));