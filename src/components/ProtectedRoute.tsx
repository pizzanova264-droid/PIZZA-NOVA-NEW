import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Props {
  children: ReactNode;
  requireVerified?: boolean;
}

export function ProtectedRoute({ children, requireVerified = false }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();

  const isUnconfirmed = !!user && requireVerified && !user.email_confirmed_at && !user.confirmed_at;

  useEffect(() => {
    if (loading) return;
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to view this page.',
      });
    } else if (isUnconfirmed) {
      toast({
        title: 'Email not verified',
        description: 'Please verify your email address to continue.',
        variant: 'destructive',
      });
    }
  }, [loading, user, isUnconfirmed]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!user) {
    const reason = encodeURIComponent('You must sign in to access this page.');
    return <Navigate to={`/auth?reason=signin_required&message=${reason}&redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (isUnconfirmed) {
    const reason = encodeURIComponent('Your email is not yet verified. Please verify to continue.');
    return <Navigate to={`/auth?reason=unconfirmed&message=${reason}`} replace />;
  }

  return <>{children}</>;
}
