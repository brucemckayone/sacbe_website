"use client";

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBftZZHS0GpQ8ooSmrc63MsWweUPX3sZuI",
  authDomain: "sacbe-cacao.firebaseapp.com",
  projectId: "sacbe-cacao",
  storageBucket: "sacbe-cacao.appspot.com",
  messagingSenderId: "461975289008",
  appId: "1:461975289008:web:6be52c248a557c114c4f75",
  measurementId: "G-BWQ4PZ49KR",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);
export { firebaseConfig };
