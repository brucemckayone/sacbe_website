import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { envConfig } from "@/lib/webhooks/envConfig";
import { firestore } from "@/lib/firebase/firebase";

import { FirestoreAdapter } from "@next-auth/firebase-adapter";
export default NextAuth({
  secret: envConfig.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    //   CredentialsProvider({
    //     name: "Username Password",
    //     credentials: {
    //       username: {
    //         label: "Username",
    //         type: "text",
    //         placeholder: "Cacao Lover 69",
    //       },
    //       password: { label: "Password", type: "password" },
    //     },
    //     async authorize(credentials, req) {
    //       const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
    //       const password = credentials?.password;
    //       if (user) {
    //         return user;
    //       } else {
    //         return null;
    //       }
    //     },
    //   }),

    GoogleProvider({
      clientId: envConfig.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
    }),
  ],

  adapter: FirestoreAdapter(firestore),
  debug: false,
});
