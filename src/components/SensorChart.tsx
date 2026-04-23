import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { HistoricalPoint } from '../types/sensor';

interface SensorChartProps {
  data: HistoricalPoint[];
  dataKey: keyof Omit<HistoricalPoint, 'time'>;
  label: string;
  unit: string;
  color: string;
  warnThreshold: number;
  dangerThreshold: number;
}

function CustomTooltip({ active, payload, label, unit }: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  unit: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded-lg font-mono text-xs"
      style={{
        background: '#141c26',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
      }}
    >
      <p style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</p>
      <p className="text-white font-bold mt-0.5">
        {payload[0].value.toFixed(2)} <span style={{ color: 'rgba(255,255,255,0.4)' }}>{unit}</span>
      </p>
    </div>
  );
}

export default function SensorChart({
  data,
  dataKey,
  label,
  unit,
  color,
  warnThreshold,
  dangerThreshold,
}: SensorChartProps) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4"
      style={{
        background: 'linear-gradient(145deg, #141c26, #111820)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-exo font-semibold text-sm tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.7)' }}>
          {label}
        </h3>
        <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
          LAST {data.length} READINGS
        </span>
      </div>

      {/* Chart */}
      <div style={{ height: 160 }}>
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center font-mono text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            AWAITING DATA...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontFamily: '"Share Tech Mono"' }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontFamily: '"Share Tech Mono"' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip unit={unit} />} />
              <ReferenceLine
                y={warnThreshold}
                stroke="rgba(245,158,11,0.35)"
                strokeDasharray="4 4"
              />
              <ReferenceLine
                y={dangerThreshold}
                stroke="rgba(239,68,68,0.35)"
                strokeDasharray="4 4"
              />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={1.5}
                fill={`url(#grad-${dataKey})`}
                dot={false}
                activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
