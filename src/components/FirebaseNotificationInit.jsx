"use client";

import { useEffect } from "react";
import { onMessageListener, requestFirebaseToken } from "../../firebase/firebaseConfig";

export default function FirebaseNotificationInit() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/firebase-messaging-sw.js")
        .then(() => console.log("Service Worker registered"))
        .catch((err) => console.error("SW registration failed", err));
    }

    requestFirebaseToken();

    onMessageListener().then(payload => {
      console.log("Foreground Message Received:", payload);

      alert(payload.notification.title + " - " + payload.notification.body);
    });
  }, []);

  return null;
}
