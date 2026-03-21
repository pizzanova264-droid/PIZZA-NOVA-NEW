-- Create a function to assign a random delivery partner
CREATE OR REPLACE FUNCTION public.assign_random_delivery_partner()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.delivery_partners
  WHERE is_active = true
  ORDER BY random()
  LIMIT 1
$$;