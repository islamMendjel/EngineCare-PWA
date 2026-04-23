export interface SensorData {
  temperature: number;
  vibration: number;
  current: number;
  status: string;
}

export interface HistoricalPoint {
  time: string;
  temperature: number;
  vibration: number;
  current: number;
}

export type SensorLevel = 'ok' | 'warn' | 'danger';

export function getTempLevel(v: number): SensorLevel {
  if (v > 90) return 'danger';
  if (v > 75) return 'warn';
  return 'ok';
}

export function getVibLevel(v: number): SensorLevel {
  if (v > 2.5) return 'danger';
  if (v > 1.8) return 'warn';
  return 'ok';
}

export function getCurrentLevel(v: number): SensorLevel {
  if (v > 15) return 'danger';
  if (v > 12) return 'warn';
  return 'ok';
}

export function getOverallLevel(data: SensorData): SensorLevel {
  const levels = [
    getTempLevel(data.temperature),
    getVibLevel(data.vibration),
    getCurrentLevel(data.current),
  ];
  if (levels.includes('danger') || data.status === 'DANGER') return 'danger';
  if (levels.includes('warn') || data.status === 'WARNING') return 'warn';
  return 'ok';
}
