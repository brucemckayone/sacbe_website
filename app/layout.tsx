import Navbar from "../components/nav bar/Navbar";
import "../app/globals.css";
import AuthProvider from "@/components/providers/SessionProvider";

import {
  Marcellus as displayFont,
  Marcellus as bodyFont,
} from "@next/font/google";

import { Session } from "next-auth/core/types";
import ToastContainerClient from "@/components/toast/toast_container";

const raleway = displayFont({
  variable: "--display-font",
  weight: "400",
});

const merriweather = bodyFont({
  variable: "--body-font",
  weight: "400",
});

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();
  console.log(session);

  return Object.keys(session).length > 0 ? session : null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html
        className={`${raleway.variable} ${merriweather.variable} bg-surface`}
      >
        <head />
        <body>
          <div></div>
          <Navbar />

          {children}
          <ToastContainerClient />
        </body>
      </html>
    </AuthProvider>
  );
}
