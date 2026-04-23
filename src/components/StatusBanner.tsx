import { AlertTriangle, AlertOctagon } from 'lucide-react';
import type { SensorLevel } from '../types/sensor';

interface StatusBannerProps {
  level: SensorLevel;
  statusText: string;
}

export default function StatusBanner({ level, statusText }: StatusBannerProps) {
  if (level === 'ok') return null;

  const isWarn = level === 'warn';

  return (
    <div
      className={`flex items-center gap-3 px-6 py-3 font-exo font-bold text-sm tracking-[0.2em] ${
        !isWarn ? 'animate-danger-pulse' : ''
      }`}
      style={{
        background: isWarn
          ? 'linear-gradient(90deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))'
          : 'linear-gradient(90deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))',
        borderBottom: `1px solid ${isWarn ? 'rgba(245,158,11,0.25)' : 'rgba(239,68,68,0.3)'}`,
        color: isWarn ? '#f59e0b' : '#ef4444',
      }}
    >
      {isWarn ? (
        <AlertTriangle className="w-4 h-4 shrink-0" />
      ) : (
        <AlertOctagon className="w-4 h-4 shrink-0" />
      )}
      <span>{isWarn ? 'WARNING' : 'DANGER'} — {statusText.toUpperCase()}</span>
      <div
        className="ml-auto flex items-center gap-1.5"
        style={{ color: isWarn ? 'rgba(245,158,11,0.6)' : 'rgba(239,68,68,0.6)' }}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${isWarn ? 'bg-amber-accent' : 'bg-danger-red'} animate-pulse`}
        />
        <span className="font-mono text-xs tracking-widest">THRESHOLD EXCEEDED</span>
      </div>
    </div>
  );
}
