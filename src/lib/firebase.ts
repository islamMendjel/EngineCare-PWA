import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAOHXveZucFGTLhCdCQDmBVRrIBHFimxsQ",
  authDomain: "engine-care-38dc4.firebaseapp.com",
  databaseURL: "https://engine-care-38dc4-default-rtdb.firebaseio.com",
  projectId: "engine-care-38dc4",
  storageBucket: "engine-care-38dc4.appspot.com",
  messagingSenderId: "246451321698",
  appId: "1:246451321698:web:4393e963a3430d41f80a3b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const messaging = getMessaging(app);
