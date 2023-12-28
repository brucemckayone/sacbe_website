import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { envConfig } from "@/lib/env/envConfig";

export default function adminInit() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: cert({
        projectId: envConfig.FIREBASE_PROJECT_ID,
        clientEmail: envConfig.FIREBASE_CLIENT_EMAIL,
        privateKey: envConfig.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  }
  return admin;
}


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({  projectId: envConfig.FIREBASE_PROJECT_ID,
        clientEmail: envConfig.FIREBASE_CLIENT_EMAIL,
        privateKey: envConfig.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),}),
  });
}

export { admin };