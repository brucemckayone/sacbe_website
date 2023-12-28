import { envConfig } from "@/lib/env/envConfig";
import {
  firestore,
  firestore as firestoreAdaptorVersion,
} from "@/lib/firebase/admin";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import CollectionHelper from "@/utils/firebase/collectionHelper";
import adminInit from "@/lib/firebase/admin_init";
import { getOrCreateCustomer } from "../stripe/client/create_customer/_create_customer";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

const fbAdaptor = FirestoreAdapter(firestoreAdaptorVersion);
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

          if (userSnap.docs.length == 1) {
            const user = userSnap.docs[0].data();

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
      httpOptions: {
        timeout: 40000,
      },
    }),
    // AppleProvider({
    //   clientId: envConfig.APPLE_CLIENT_ID,
    //   clientSecret: envConfig.APPLE_CLIENT_SECRET,
    // }),
  ],

  theme: {
    brandColor: "#ff932f",
    colorScheme: "light",
    logo: "/sacbe_logo_icon.png",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session }) {
      // session.user.isLoggedIn = true;yarn
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
  adapter: {
    ...fbAdaptor,
    createUser: async (user) => {
      const createdUser = await fbAdaptor.createUser!(user);
      prePopulateUserData(createdUser);
      return createdUser;
    },
  },
  debug: false,
};
export { authOptions };

export default NextAuth(authOptions);

async function prePopulateUserData(user: AdapterUser) {
  const helper = new CollectionHelper(
    adminInit().firestore().collection("users")
  );
  const customer = await getOrCreateCustomer({
    email: user.email,
  });

  await helper.findAndUpdateDocByKeyValue(
    { key: "email", value: user.email },
    { customerId: customer?.id, uuid: user.id }
  );
  // }
  // function CredentialsProvider(arg0: {
  //   name: string;
  //   credentials: { email: { label: string; type: string; placeholder: string } };
  //   authorize(
  //     credentials: any,
  //     req: any
  //   ): Promise<{ email: any; id: any } | null>;
  // }): import("next-auth/providers").Provider {
  //   throw new Error("Function not implemented.");
  // }

  // function GoogleProvider(arg0: {
  //   clientId: string;
  //   clientSecret: string;
  //   httpOptions: { timeout: number };
  // }): import("next-auth/providers").Provider {
  //   throw new Error("Function not implemented.");
  // }

  // function AppleProvider(arg0: {
  //   clientId: string;
  //   clientSecret: string;
  // }): import("next-auth/providers").Provider {
  //   throw new Error("Function not implemented.");
  // }
}
