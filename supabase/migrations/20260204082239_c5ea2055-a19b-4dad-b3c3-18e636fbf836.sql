-- Explicitly prevent non-admin users from inserting roles
CREATE POLICY "Non-admins cannot insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (false);

-- Add admin policy for addresses (needed for order fulfillment)
CREATE POLICY "Admins can view all addresses"
ON public.addresses
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));