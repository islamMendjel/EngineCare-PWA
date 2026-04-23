import { messaging } from './firebase';
import { getToken } from 'firebase/messaging';

const VAPID_KEY = 'YOUR_VAPID_KEY_HERE';

export async function requestNotificationPermission(): Promise<string | null> {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    console.log('[FCM] Token:', token);
    return token;
  } catch (err) {
    console.warn('[FCM] Could not get token:', err);
    return null;
  }
}
