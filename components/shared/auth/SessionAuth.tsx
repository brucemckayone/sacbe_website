import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface sessionAuthInterface {
  session: Session;
  children: ReactNode;
}
function SessionAuth({ session, children }: sessionAuthInterface) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default SessionAuth;
