import type { ReactNode } from 'react';
import type { SensorLevel } from '../types/sensor';

interface SensorCardProps {
  label: string;
  value: number;
  unit: string;
  icon: ReactNode;
  level: SensorLevel;
  accentColor: string;
  dimColor: string;
  progressPercent: number;
  maxValue: number;
  warnThreshold: number;
  dangerThreshold: number;
}

const levelColors: Record<SensorLevel, string> = {
  ok: '#10b981',
  warn: '#f59e0b',
  danger: '#ef4444',
};

export default function SensorCard({
  label,
  value,
  unit,
  icon,
  level,
  accentColor,
  progressPercent,
  warnThreshold,
  dangerThreshold,
  maxValue,
}: SensorCardProps) {
  const barColor = levelColors[level];
  const warnPct = (warnThreshold / maxValue) * 100;
  const dangerPct = (dangerThreshold / maxValue) * 100;

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden transition-all duration-300"
      style={{
        background: 'linear-gradient(145deg, #141c26, #111820)',
        border: `1px solid ${level === 'ok' ? 'rgba(255,255,255,0.06)' : level === 'warn' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.25)'}`,
        boxShadow: level !== 'ok'
          ? `0 0 24px ${level === 'warn' ? 'rgba(245,158,11,0.06)' : 'rgba(239,68,68,0.08)'}`
          : '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${accentColor}12, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              background: `${accentColor}18`,
              border: `1px solid ${accentColor}30`,
            }}
          >
            <div style={{ color: accentColor }}>{icon}</div>
          </div>
          <span className="font-rajdhani font-semibold text-sm tracking-[0.12em]" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {label}
          </span>
        </div>
        <span
          className="font-mono text-xs px-2 py-0.5 rounded-full tracking-widest"
          style={{
            background: `${barColor}15`,
            border: `1px solid ${barColor}30`,
            color: barColor,
          }}
        >
          {level.toUpperCase()}
        </span>
      </div>

      {/* Value */}
      <div className="flex items-end gap-2">
        <span
          className="font-mono font-bold leading-none"
          style={{ fontSize: '2.75rem', color: barColor }}
        >
          {value.toFixed(1)}
        </span>
        <span
          className="font-rajdhani font-semibold text-lg mb-1"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          {unit}
        </span>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div
          className="relative h-2 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          {/* Warn marker */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${warnPct}%`, background: 'rgba(245,158,11,0.5)' }}
          />
          {/* Danger marker */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${dangerPct}%`, background: 'rgba(239,68,68,0.5)' }}
          />
          {/* Fill */}
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${Math.min(progressPercent, 100)}%`,
              background: `linear-gradient(90deg, ${barColor}99, ${barColor})`,
              boxShadow: `0 0 8px ${barColor}80`,
            }}
          />
        </div>
        <div className="flex justify-between font-mono text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
          <span>0</span>
          <span style={{ color: 'rgba(245,158,11,0.5)' }}>{warnThreshold}</span>
          <span style={{ color: 'rgba(239,68,68,0.5)' }}>{dangerThreshold}</span>
          <span>{maxValue}{unit}</span>
        </div>
      </div>
    </div>
  );
}
