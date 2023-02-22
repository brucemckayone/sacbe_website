"use client";
import Navbar from "../components/nav bar/Navbar";
import "../app/globals.css";
import { SessionProvider } from "next-auth/react";

import {
  Marcellus as displayFont,
  Marcellus as bodyFont,
} from "@next/font/google";

import { Session } from "next-auth/core/types";

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
    <SessionProvider>
      <html
        className={`${raleway.variable} ${merriweather.variable} bg-surface`}
      >
        <head />
        <body>
          <div></div>
          <Navbar />

          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
