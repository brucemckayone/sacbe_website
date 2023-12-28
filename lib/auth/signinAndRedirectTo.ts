import { signIn } from "next-auth/react";

export const signInAndRedirectTo = (path: string) =>
  signIn(undefined, {
    callbackUrl: path,
  });
