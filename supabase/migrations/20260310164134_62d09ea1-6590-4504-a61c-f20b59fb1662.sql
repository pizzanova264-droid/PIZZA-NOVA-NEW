
-- Drop all existing RESTRICTIVE policies and recreate as PERMISSIVE

-- ORDERS table
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can insert their own orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- PROFILES table
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own profile" ON public.profiles FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ADDRESSES table
DROP POLICY IF EXISTS "Admins can view all addresses" ON public.addresses;
DROP POLICY IF EXISTS "Users can delete their own addresses" ON public.addresses;
DROP POLICY IF EXISTS "Users can insert their own addresses" ON public.addresses;
DROP POLICY IF EXISTS "Users can update their own addresses" ON public.addresses;
DROP POLICY IF EXISTS "Users can view their own addresses" ON public.addresses;

CREATE POLICY "Users can view their own addresses" ON public.addresses FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all addresses" ON public.addresses FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can insert their own addresses" ON public.addresses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own addresses" ON public.addresses FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own addresses" ON public.addresses FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- USER_ROLES table
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
