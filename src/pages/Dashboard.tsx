import { Thermometer, Activity, Zap } from 'lucide-react';
import TopBar from '../components/TopBar';
import StatusBanner from '../components/StatusBanner';
import SensorCard from '../components/SensorCard';
import SensorChart from '../components/SensorChart';
import { useSensorData } from '../hooks/useSensorData';
import {
  getTempLevel,
  getVibLevel,
  getCurrentLevel,
  getOverallLevel,
} from '../types/sensor';

export default function Dashboard() {
  const { data, history, connected } = useSensorData();
  const overallLevel = getOverallLevel(data);

  const tempPct = (data.temperature / 120) * 100;
  const vibPct = (data.vibration / 4) * 100;
  const currPct = (data.current / 20) * 100;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: '#080a0d',
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      <TopBar connected={connected} />
      <StatusBanner level={overallLevel} statusText={data.status} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Section label */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            SENSOR READOUT
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Sensor cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SensorCard
            label="TEMPERATURE"
            value={data.temperature}
            unit="°C"
            icon={<Thermometer className="w-5 h-5" strokeWidth={1.5} />}
            level={getTempLevel(data.temperature)}
            accentColor="#f59e0b"
            dimColor="#b45309"
            progressPercent={tempPct}
            maxValue={120}
            warnThreshold={75}
            dangerThreshold={90}
          />
          <SensorCard
            label="VIBRATION"
            value={data.vibration}
            unit="g"
            icon={<Activity className="w-5 h-5" strokeWidth={1.5} />}
            level={getVibLevel(data.vibration)}
            accentColor="#10b981"
            dimColor="#065f46"
            progressPercent={vibPct}
            maxValue={4}
            warnThreshold={1.8}
            dangerThreshold={2.5}
          />
          <SensorCard
            label="CURRENT"
            value={data.current}
            unit="A"
            icon={<Zap className="w-5 h-5" strokeWidth={1.5} />}
            level={getCurrentLevel(data.current)}
            accentColor="#22d3ee"
            dimColor="#0e7490"
            progressPercent={currPct}
            maxValue={20}
            warnThreshold={12}
            dangerThreshold={15}
          />
        </div>

        {/* Section label */}
        <div className="flex items-center gap-3 pt-2">
          <span className="font-mono text-xs tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            HISTORICAL TRENDS
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SensorChart
            data={history}
            dataKey="temperature"
            label="TEMPERATURE"
            unit="°C"
            color="#f59e0b"
            warnThreshold={75}
            dangerThreshold={90}
          />
          <SensorChart
            data={history}
            dataKey="vibration"
            label="VIBRATION"
            unit="g"
            color="#10b981"
            warnThreshold={1.8}
            dangerThreshold={2.5}
          />
          <SensorChart
            data={history}
            dataKey="current"
            label="CURRENT"
            unit="A"
            color="#22d3ee"
            warnThreshold={12}
            dangerThreshold={15}
          />
        </div>

        {/* Footer info bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 px-5 py-3 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <div className="flex items-center gap-6">
            {[
              { label: 'TEMP MAX', value: `${Math.max(...history.map(h => h.temperature), 0).toFixed(1)}°C`, color: '#f59e0b' },
              { label: 'VIB MAX', value: `${Math.max(...history.map(h => h.vibration), 0).toFixed(2)}g`, color: '#10b981' },
              { label: 'CURR MAX', value: `${Math.max(...history.map(h => h.current), 0).toFixed(1)}A`, color: '#22d3ee' },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>{label}</p>
                <p className="font-mono text-sm font-bold" style={{ color }}>{value}</p>
              </div>
            ))}
          </div>
          <div className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            ENGINE CARE v2.0 — ESP32 SENSOR NODE
          </div>
        </div>
      </main>
    </div>
  );
}
