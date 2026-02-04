-- Add DELETE policy for profiles table
CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = user_id);

-- Note: Orders are intentionally immutable - no UPDATE or DELETE policies needed
-- This is by design for order integrity and audit trails