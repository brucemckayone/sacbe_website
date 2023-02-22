import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { envConfig } from "@/lib/webhooks/envConfig";
import { firestore } from "@/lib/firebase/firebase";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import getOrSaveCustomerIdFromFirebase from "@/lib/stripe/getOrSaveStripeCustomerIdFromFirebase";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default NextAuth({
  secret: envConfig.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials!;

        const snapshots = await firestore
          .collection("users")
          .where("email", "==", email)
          .get();

        if (snapshots.docs.length == 1) {
          const gotUser = snapshots.docs[0].data();
          //user has password
          if (gotUser.password) {
            console.log("user has password");
            // check hash on password
            const isPasswordCorrect = bcrypt.compareSync(
              password,
              gotUser.password
            );
            console.log("password check:" + isPasswordCorrect);

            // if passed
            if (isPasswordCorrect) {
              // return user with details;
              console.log("password checked");
              return gotUser! as { id: string; email: string; name: string };
            } else {
              // if failed
              console.log("password was incorrect");
              return null;
            }
          }
        } else if (snapshots.docs.length > 1) {
          console.error(
            "There are more than one users already with this email address "
          );
          return null;
        } else {
          console.log("user does not exist");
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: envConfig.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: envConfig.APPLE_CLIENT_ID,
      clientSecret: envConfig.APPLE_CLIENT_SECRET,
    }),
  ],
  // pages: {
  //   signIn: "/auth/credentials",
  // },
  theme: {
    brandColor: "#ff932f",
    // buttonText: "Marcellus",
    colorScheme: "light",
    logo: "https://www.thirdeyetribe.co.uk/wp-content/uploads/2020/08/Third_Eye_Logo_Words_Only_.svg",
  },
  callbacks: {
    async signIn({ account, user }) {
      console.log("sign in callback called from nextauth.ts");
      console.log("account");
      if (account) {
        if (user?.email) {
          getOrSaveCustomerIdFromFirebase(user.email);
        }
      }
      return true;
    },
    async redirect({ baseUrl, url }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  adapter: FirestoreAdapter(firestore),
  debug: false,
});
