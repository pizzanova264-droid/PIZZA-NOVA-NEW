-- Fix privilege escalation warning: add explicit restrictive deny policy
CREATE POLICY "Non-admins cannot insert roles"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (public.has_role('admin'::app_role));

-- Create delivery_partners table
CREATE TABLE public.delivery_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  vehicle_type text NOT NULL DEFAULT 'Bike',
  vehicle_number text,
  photo_url text,
  is_active boolean NOT NULL DEFAULT true,
  rating numeric(2,1) DEFAULT 4.5,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.delivery_partners ENABLE ROW LEVEL SECURITY;

-- Everyone can view active delivery partners (needed for order tracking)
CREATE POLICY "Anyone can view active delivery partners"
ON public.delivery_partners FOR SELECT TO authenticated
USING (is_active = true);

-- Admins can manage delivery partners
CREATE POLICY "Admins can manage delivery partners"
ON public.delivery_partners FOR ALL TO authenticated
USING (public.has_role('admin'::app_role))
WITH CHECK (public.has_role('admin'::app_role));

-- Add delivery_partner_id to orders
ALTER TABLE public.orders ADD COLUMN delivery_partner_id uuid REFERENCES public.delivery_partners(id);

-- Add payment_method to orders
ALTER TABLE public.orders ADD COLUMN payment_method text DEFAULT 'cod';

-- Seed delivery partners with realistic data
INSERT INTO public.delivery_partners (name, phone, vehicle_type, vehicle_number, rating) VALUES
('Rajesh Kumar', '+91 98765 43210', 'Bike', 'DL 01 AB 1234', 4.8),
('Amit Sharma', '+91 87654 32109', 'Bike', 'DL 02 CD 5678', 4.6),
('Priya Singh', '+91 76543 21098', 'Scooter', 'DL 03 EF 9012', 4.9),
('Suresh Patel', '+91 65432 10987', 'Bike', 'DL 04 GH 3456', 4.7),
('Deepak Verma', '+91 54321 09876', 'Bike', 'DL 05 IJ 7890', 4.5);