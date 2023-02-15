import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/next.config";
import { authFireStore } from "@/lib/firebase";

import { FirestoreAdapter } from "@next-auth/firebase-adapter";
export default NextAuth({
  secret: env!.NEXTAUTH_SECRET,
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
      clientId:
        "461975289008-efl3tj1ejaavtjo4cd6ud35qvmf8evht.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],

  adapter: FirestoreAdapter(authFireStore),
  debug: true,
});
