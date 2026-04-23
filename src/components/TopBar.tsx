import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { Cpu, LogOut } from 'lucide-react';

interface TopBarProps {
  connected: boolean;
}

export default function TopBar({ connected }: TopBarProps) {
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate('/');
  }

  return (
    <header
      className="flex items-center justify-between px-6 py-4 border-b"
      style={{
        background: 'rgba(13,17,23,0.95)',
        borderColor: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(34,211,238,0.05))',
            border: '1px solid rgba(34,211,238,0.25)',
          }}
        >
          <Cpu className="w-5 h-5 text-cyan-accent" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="font-exo font-bold text-white text-base tracking-[0.15em] leading-none">
            ENGINE CARE
          </h1>
          <p className="font-rajdhani text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            INDUSTRIAL MONITOR
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Connection status */}
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald-accent animate-pulse' : 'bg-danger-red'}`}
          />
          <span
            className="font-mono text-xs tracking-widest"
            style={{ color: connected ? '#10b981' : '#ef4444' }}
          >
            {connected ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-rajdhani text-sm font-semibold transition-all duration-200"
          style={{
            color: 'rgba(255,255,255,0.45)',
            border: '1px solid transparent',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.color = '#ef4444';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(239,68,68,0.25)';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.06)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          }}
        >
          <LogOut className="w-4 h-4" />
          LOGOUT
        </button>
      </div>
    </header>
  );
}
