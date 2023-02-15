"use client";
import Navbar from "../components/nav bar/Navbar";
import "../app/globals.css";
import { SessionProvider } from "next-auth/react";

import {
  Marcellus as displayFont,
  Marcellus as bodyFont,
} from "@next/font/google";
import Nextauth from "@/pages/api/auth/[...nextauth]";

const raleway = displayFont({
  variable: "--display-font",
  weight: "400",
});

const merriweather = bodyFont({
  variable: "--body-font",
  weight: "400",
});

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
