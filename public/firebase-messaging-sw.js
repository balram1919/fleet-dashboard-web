importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBdCON_O3uyhgeJsjd7qfUNSzfMXkrSprQ",
  authDomain: "notificaiton-428b3.firebaseapp.com",
  projectId: "notificaiton-428b3",
  storageBucket: "notificaiton-428b3.firebasestorage.app",
  messagingSenderId: "965474202194",
  appId: "1:965474202194:web:9874759d8273780399258b",
  measurementId: "G-ZFQXEXKNJK"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Background message ", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo.png",
  });
});
