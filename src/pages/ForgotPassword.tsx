import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import logo from '@/assets/pizza-nova-logo.webp';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setSent(true);
      toast({ title: 'Check your email', description: 'We sent you a password reset link.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/auth')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Sign In
        </button>

        <div className="bg-card rounded-3xl shadow-elevated p-8 space-y-6">
          <div className="text-center">
            <img src={logo} alt="Pizza Nova" className="h-20 mx-auto mb-4" />
            <h1 className="text-2xl font-serif font-bold text-foreground">
              {sent ? 'Email Sent!' : 'Reset Password'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {sent
                ? 'Check your inbox for the reset link.'
                : "Enter your email and we'll send you a reset link."}
            </p>
          </div>

          {sent ? (
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 mx-auto text-accent" />
              <p className="text-sm text-muted-foreground">
                Didn't receive it? Check your spam folder or try again.
              </p>
              <button onClick={() => setSent(false)} className="text-primary font-semibold hover:underline">
                Try another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-hero-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
