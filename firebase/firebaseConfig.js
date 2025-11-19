// firebase/firebaseConfig.js
import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBdCON_O3uyhgeJsjd7qfUNSzfMXkrSprQ",
  authDomain: "notificaiton-428b3.firebaseapp.com",
  projectId: "notificaiton-428b3",
  storageBucket: "notificaiton-428b3.firebasestorage.app",
  messagingSenderId: "965474202194",
  appId: "1:965474202194:web:9874759d8273780399258b",
  measurementId: "G-ZFQXEXKNJK"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

export const requestFirebaseToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Permission not granted");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: "BN7TMM3Z4NGliW3_bcGRjMOqcn-Ym6kKCHv8s-IZb2-vVXTC4hWGfnTlTWk5yoAhCLE2o72ajYRn_jFhXTQrF3k"
    });

    console.log("FCM Token:", token);
    return token;
  } catch (err) {
    console.error("FCM Token error:", err);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, payload => resolve(payload));
  });
