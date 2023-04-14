import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import { envConfig } from "@/lib/webhooks/envConfig";
import {
  firestore,
  firestore as firestoreAdaptorVersion,
} from "@/lib/firebase/admin";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import getOrSaveCustomerIdFromFirebase from "@/lib/stripe/getOrSaveStripeCustomerIdFromFirebase";

import homeUrl from "@/lib/constants/urls";

const authOptions: AuthOptions = {
  secret: envConfig.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  //added cookies because o
  cookies: {
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "Magic Link",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "cacaolover@gmail.com",
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const email = req.body?.email ?? "";
        if (email) {
          // Any object returned will be saved in `user` property of the JWT
          const userSnap = await firestore
            .collection("users")
            .where("email", "==", email)
            .get();
          console.log(`number of users = ${userSnap.docs.length != 0}`);

          if (userSnap.docs.length == 1) {
            const user = userSnap.docs[0].data();
            console.log(user);
            return { email: user.email, id: user.uuid };
          } else if (userSnap.docs.length == 0) {
            const newUserDoc = await firestore
              .collection("users")
              .add({ email: email!, name: email! });
            const newAccountDoc = await firestore
              .collection("accounts")
              .add({ userId: newUserDoc.id!, provider: "email" });
            return { email: email!, id: newUserDoc.id };
          } else {
            return null;
          }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
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

  theme: {
    brandColor: "#ff932f",

    colorScheme: "light",
    logo: "/sacbe_logo_icon.png",
  },
  callbacks: {
    // async signIn({ account, user }) {
    //   console.log("sign in callback called from nextauth.ts");
    //   console.log("account");
    //   if (account) {
    //     if (user?.email) {
    //       getOrSaveCustomerIdFromFirebase(user.email);
    //     }
    //   }
    //   return true;
    // },
    async signIn({ user }) {
      return true;
    },
    async session({ session }) {
      // session.user.isLoggedIn = true;
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
  adapter: FirestoreAdapter(firestoreAdaptorVersion),
  debug: false,
};
export { authOptions };

export default NextAuth(authOptions);
