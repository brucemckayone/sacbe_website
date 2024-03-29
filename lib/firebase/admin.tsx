"use client";
import { initFirestore } from "@next-auth/firebase-adapter";
import { initializeApp } from "firebase/app";
import { envConfig } from "../env/envConfig";
import { cert } from "firebase-admin/app";
import { getAuth } from "firebase/auth";
import admin from "firebase-admin";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBftZZHS0GpQ8ooSmrc63MsWweUPX3sZuI",
  authDomain: "sacbe-cacao.firebaseapp.com",
  projectId: "sacbe-cacao",
  storageBucket: "sacbe-cacao.appspot.com",
  messagingSenderId: "461975289008",
  appId: "1:461975289008:web:6be52c248a557c114c4f75",
  measurementId: "G-BWQ4PZ49KR",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert({
      projectId: envConfig.FIREBASE_PROJECT_ID,
      clientEmail: envConfig.FIREBASE_CLIENT_EMAIL,
      privateKey: envConfig.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const clientFirestore = getFirestore(app);

export const firestore = initFirestore({
  credential: cert({
    projectId: envConfig.FIREBASE_PROJECT_ID,
    clientEmail: envConfig.FIREBASE_CLIENT_EMAIL,
    privateKey: envConfig.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

export const storage = getStorage(app);
export { firebaseConfig };
