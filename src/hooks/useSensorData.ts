import { useState, useEffect, useRef } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../lib/firebase';
import type { SensorData, HistoricalPoint } from '../types/sensor';

const MAX_HISTORY = 30;

const DEFAULT_DATA: SensorData = {
  temperature: 0,
  vibration: 0,
  current: 0,
  status: 'OK',
};

export function useSensorData() {
  const [data, setData] = useState<SensorData>(DEFAULT_DATA);
  const [history, setHistory] = useState<HistoricalPoint[]>([]);
  const [connected, setConnected] = useState(false);
  const historyRef = useRef<HistoricalPoint[]>([]);

  useEffect(() => {
    const sensorRef = ref(db, 'engine_sensors');
    const connRef = ref(db, '.info/connected');

    const unsubConn = onValue(connRef, (snap) => {
      setConnected(snap.val() === true);
    });

    const unsubSensor = onValue(sensorRef, (snap) => {
      if (!snap.exists()) return;
      const val = snap.val() as SensorData;
      setData(val);

      const point: HistoricalPoint = {
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        temperature: val.temperature,
        vibration: val.vibration,
        current: val.current,
      };

      const next = [...historyRef.current, point].slice(-MAX_HISTORY);
      historyRef.current = next;
      setHistory([...next]);
    });

    return () => {
      unsubConn();
      unsubSensor();
    };
  }, []);

  return { data, history, connected };
}
