importScripts('https://www.gstatic.com/firebasejs/9.1.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAOHXveZucFGTLhCdCQDmBVRrIBHFimxsQ",
  projectId: "engine-care-38dc4",
  messagingSenderId: "246451321698",
  appId: "1:246451321698:web:4393e963a3430d41f80a3b"
});

const messaging = firebase.messaging();

// Handle Background Messages
messaging.onBackgroundMessage((payload) => {
  console.log('[sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.jpg',
    badge: '/logo.jpg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
