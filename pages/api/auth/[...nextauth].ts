import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { envConfig } from "@/lib/webhooks/envConfig";
import { firestore } from "@/lib/firebase/firebase";
import createCustomer from "@/lib/stripe/createCustomer";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import Email from "next-auth/providers/email";
import { Session } from "inspector";
import { signIn } from "next-auth/react";
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
  callbacks: {
    async signIn({ account, user }) {
      console.log("sign in callback called from nextauth.ts");

      if (account) {
        if (user?.email) {
          firestore
            .collection("users")
            .where("email", "==", user.email)
            .get()
            .then(async (snapshots) => {
              console.log(
                `updating: ${snapshots.docs.length} accounts with user Email = ${user.email}`
              );
              if (snapshots.docs.length > 0) {
                const updates: Promise<FirebaseFirestore.WriteResult>[] = [];
                snapshots.forEach(async (doc) => {
                  console.log(`customerId:${doc.data()["customerId"]}`);

                  if (doc.data()["customerId"]) {
                    const customerId = await createCustomer({
                      email: user.email!,
                      name: user!.name,
                      returnOnlyId: true,
                    });
                    updates.push(
                      doc.ref.set({
                        customerId: "",
                      })
                    );
                    await Promise.all(updates).then(() => {
                      console.log(
                        `stripe Customer Id added to firebase user account with email: `
                      );
                    });
                  }
                });
              }
            });
        }
      }
      return true;
    },
  },
  adapter: FirestoreAdapter(firestore),
  debug: false,
});
