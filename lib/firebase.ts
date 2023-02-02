"use client";
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAENCeAbp2Uu5zcIEa6axc59l_rImuptjA",
  authDomain: "bakery-place.firebaseapp.com",
  projectId: "bakery-place",
  storageBucket: "bakery-place.appspot.com",
  messagingSenderId: "343122387764",
  appId: "1:343122387764:web:c249bc72204934b35dfb61",
  measurementId: "G-3E832D8W24",
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
