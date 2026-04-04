import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Lock } from 'lucide-react';

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Admin Login | THE SKY49';
    const token = localStorage.getItem('admin_token');
    if (token) navigate('/admin/dashboard', { replace: true });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      let data: any;
      try { data = await res.json(); } catch { data = {}; }

      if (!res.ok) {
        setError(data.error || data.details || `Server error (${res.status})`);
        setLoading(false);
        return;
      }

      localStorage.setItem('admin_token', data.token);
      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Unable to connect to server');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/90 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl text-white">THE SKY49</h1>
          <p className="mt-2 text-sm tracking-widest text-stone/70 uppercase">Admin Portal</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
              <Lock className="h-6 w-6 text-gold" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-[10px] font-medium uppercase tracking-widest text-stone/60">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/20 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
                placeholder="admin@thesky49.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-medium uppercase tracking-widest text-stone/60">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/20 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-semibold uppercase tracking-widest text-charcoal transition-colors hover:bg-gold/90 disabled:opacity-60"
            >
              {loading ? (
                <>
                  Signing In
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
