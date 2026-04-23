import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { requestNotificationPermission } from '../lib/notifications';
import { Cpu, Eye, EyeOff, AlertCircle } from 'lucide-react';

type Mode = 'login' | 'signup';

function getPasswordStrength(pw: string): { level: number; label: string; color: string } {
  if (pw.length === 0) return { level: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { level: 1, label: 'Weak', color: 'bg-danger-red' };
  if (score === 2 || score === 3) return { level: 2, label: 'Medium', color: 'bg-amber-accent' };
  return { level: 3, label: 'Strong', color: 'bg-emerald-accent' };
}

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const strength = getPasswordStrength(password);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      requestNotificationPermission();
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed';
      setError(msg.replace('Firebase: ', '').replace(/\(auth\/.*\)\.?/, '').trim());
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-void flex items-center justify-center p-4"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      {/* Glow behind card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        {/* Card */}
        <div
          className="rounded-2xl border p-8"
          style={{
            background: 'linear-gradient(145deg, #141c26, #111820)',
            borderColor: 'rgba(34,211,238,0.15)',
            boxShadow: '0 0 40px rgba(34,211,238,0.06), 0 24px 48px rgba(0,0,0,0.6)',
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(34,211,238,0.05))',
                border: '1px solid rgba(34,211,238,0.3)',
              }}
            >
              <Cpu className="w-7 h-7 text-cyan-accent" strokeWidth={1.5} />
            </div>
            <h1 className="font-exo font-bold text-2xl text-white tracking-wider">
              ENGINE CARE
            </h1>
            <p className="font-rajdhani text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Industrial Engine Monitor
            </p>
          </div>

          {/* Toggle */}
          <div
            className="flex rounded-lg p-1 mb-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {(['login', 'signup'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className="flex-1 py-2 rounded-md font-rajdhani font-semibold text-sm transition-all duration-200"
                style={{
                  background: mode === m ? 'rgba(34,211,238,0.12)' : 'transparent',
                  color: mode === m ? '#22d3ee' : 'rgba(255,255,255,0.4)',
                  border: mode === m ? '1px solid rgba(34,211,238,0.25)' : '1px solid transparent',
                }}
              >
                {m === 'login' ? 'SIGN IN' : 'REGISTER'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block font-rajdhani text-xs font-semibold mb-1.5 tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-lg px-4 py-2.5 font-rajdhani text-white outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '15px',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                placeholder="operator@facility.io"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-rajdhani text-xs font-semibold mb-1.5 tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-lg px-4 py-2.5 pr-11 font-rajdhani text-white outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontSize: '15px',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.4)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength */}
              {mode === 'signup' && password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.level ? strength.color : 'bg-white/10'}`}
                      />
                    ))}
                  </div>
                  <p className="font-rajdhani text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Strength: <span className="font-semibold text-white">{strength.label}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-start gap-2 rounded-lg px-3 py-2.5"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <AlertCircle className="w-4 h-4 text-danger-red mt-0.5 shrink-0" />
                <p className="font-rajdhani text-sm text-danger-red">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-exo font-bold text-sm tracking-widest transition-all duration-200 mt-2"
              style={{
                background: loading
                  ? 'rgba(34,211,238,0.08)'
                  : 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(34,211,238,0.1))',
                border: '1px solid rgba(34,211,238,0.3)',
                color: loading ? 'rgba(34,211,238,0.5)' : '#22d3ee',
                boxShadow: loading ? 'none' : '0 0 20px rgba(34,211,238,0.1)',
              }}
            >
              {loading ? 'AUTHENTICATING...' : mode === 'login' ? 'ACCESS SYSTEM' : 'CREATE ACCOUNT'}
            </button>
          </form>
        </div>

        <p
          className="text-center font-rajdhani text-xs mt-6"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          ENGINE CARE v2.0 — SECURE INDUSTRIAL MONITORING
        </p>
      </div>
    </div>
  );
}
