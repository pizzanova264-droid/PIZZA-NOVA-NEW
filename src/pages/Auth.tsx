import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { lovable } from '@/integrations/lovable/index';
import logo from '@/assets/pizza-nova-logo.webp';

const RESEND_COOLDOWN_SECONDS = 30;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'info' | 'success' | 'error'; text: string } | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const cooldownRef = useRef<number | null>(null);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  // Show contextual reason from protected route redirects
  useEffect(() => {
    const reason = searchParams.get('reason');
    const message = searchParams.get('message');
    if (!reason && !message) return;
    if (reason === 'unconfirmed') {
      setStatusMessage({ type: 'info', text: message || 'Your email is not verified yet. Resend the verification email to continue.' });
      setShowResend(true);
      setIsLogin(true);
    } else if (reason === 'signin_required') {
      setStatusMessage({ type: 'info', text: message || 'Please sign in to continue.' });
    } else if (message) {
      setStatusMessage({ type: 'info', text: message });
    }
  }, [searchParams]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    cooldownRef.current = window.setInterval(() => {
      setResendCooldown((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => {
      if (cooldownRef.current) window.clearInterval(cooldownRef.current);
    };
  }, [resendCooldown]);

  const handleResendVerification = async () => {
    if (resending || resendCooldown > 0) return;
    if (!email) {
      toast({ title: 'Enter your email', description: 'Please type your email above first', variant: 'destructive' });
      return;
    }
    setResending(true);
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: { emailRedirectTo: `${window.location.origin}/` },
      });
      if (error) {
        setStatusMessage({ type: 'error', text: error.message });
        toast({ title: 'Could not resend', description: error.message, variant: 'destructive' });
      } else {
        setStatusMessage({ type: 'success', text: `Verification email sent to ${email}. Check your inbox (and spam folder).` });
        toast({ title: 'Email sent', description: 'Verification email resent successfully' });
        setResendCooldown(RESEND_COOLDOWN_SECONDS);
      }
    } catch {
      toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' });
    }
    setResending(false);
  };

  useEffect(() => {
    if (user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate, redirectTo]);

  const interpretOAuthError = (raw: string): string => {
    const m = raw.toLowerCase();
    if (m.includes('redirect') && (m.includes('uri') || m.includes('url'))) {
      return 'Misconfigured redirect URL. The Google OAuth app does not allow this site. Contact support.';
    }
    if (m.includes('network') || m.includes('failed to fetch') || m.includes('timeout')) {
      return 'Network issue reaching Google. Check your connection and try again.';
    }
    if (m.includes('account') && (m.includes('exist') || m.includes('conflict') || m.includes('linked'))) {
      return 'An account with this email already exists with a different sign-in method. Try signing in with email/password instead.';
    }
    if (m.includes('popup') && m.includes('closed')) {
      return 'Google sign-in window was closed before completing. Please try again.';
    }
    if (m.includes('access_denied') || m.includes('denied')) {
      return 'Google sign-in was cancelled or denied. Please try again and approve the requested permissions.';
    }
    return raw || 'Google sign-in failed. Please try again.';
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result?.error) {
        const friendly = interpretOAuthError(result.error.message || String(result.error));
        setStatusMessage({ type: 'error', text: friendly });
        toast({ title: 'Google sign-in failed', description: friendly, variant: 'destructive' });
      }
      if (result?.redirected) return;
    } catch (err: any) {
      const friendly = interpretOAuthError(err?.message || String(err));
      setStatusMessage({ type: 'error', text: friendly });
      toast({ title: 'Google sign-in failed', description: friendly, variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);
    setShowResend(false);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          const msg = error.message || '';
          if (msg.includes('Invalid login credentials')) {
            setStatusMessage({ type: 'error', text: 'Invalid email or password. Try again or reset your password.' });
          } else if (msg.includes('Email not confirmed') || msg.toLowerCase().includes('not confirmed')) {
            setStatusMessage({ type: 'info', text: 'Your email is not verified yet. Resend the verification email to continue.' });
            setShowResend(true);
          } else {
            setStatusMessage({ type: 'error', text: msg });
          }
        } else {
          setStatusMessage({ type: 'success', text: 'Signed in successfully. Redirecting…' });
          toast({ title: 'Welcome back!', description: 'Successfully signed in' });
          navigate('/');
        }
      } else {
        if (!fullName.trim()) {
          setStatusMessage({ type: 'error', text: 'Please enter your full name' });
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('already registered') || error.message.toLowerCase().includes('already')) {
            setStatusMessage({ type: 'info', text: 'This email is already registered. Try signing in instead.' });
          } else {
            setStatusMessage({ type: 'error', text: error.message });
          }
        } else {
          setStatusMessage({ type: 'success', text: 'Account created! You can sign in right away.' });
          toast({ title: 'Account created', description: 'You can now sign in immediately' });
        }
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-card rounded-3xl shadow-elevated p-8 space-y-6">
          <div className="text-center">
            <img src={logo} alt="Pizza Nova" className="h-20 mx-auto mb-4" />
            <h1 className="text-2xl font-serif font-bold text-foreground">
              {isLogin ? 'Welcome Back!' : 'Join Pizza Nova'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isLogin ? 'Sign in to continue ordering' : 'Create an account to get started'}
            </p>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border bg-background hover:bg-muted transition-colors font-medium text-foreground disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {statusMessage && (
              <div
                className={`rounded-xl px-4 py-3 text-sm border ${
                  statusMessage.type === 'success'
                    ? 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400'
                    : statusMessage.type === 'info'
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'bg-destructive/10 border-destructive/30 text-destructive'
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            {showResend && isLogin && (
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resending}
                className="w-full py-3 rounded-xl border border-primary/40 text-primary hover:bg-primary/10 transition-colors font-medium disabled:opacity-50"
              >
                {resending ? 'Sending…' : 'Resend verification email'}
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-hero-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="text-center">
            <p className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-primary font-semibold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
