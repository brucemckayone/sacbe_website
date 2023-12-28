import "../../app/globals.css";
import { Analytics } from "@vercel/analytics/react";
import {
  Marcellus as displayFont,
  Marcellus as bodyFont,
} from "next/font/google";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/components/shared/auth/UserProvider";
import AuthProvider from "@/components/providers/SessionProvider";

const raleway = displayFont({
  variable: "--display-font",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const merriweather = bodyFont({
  variable: "--body-font",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${raleway.variable} ${merriweather.variable}  w-[100%]`}>
      <AuthProvider>
        <UserProvider>
          {children}
          <Toaster />
        </UserProvider>
      </AuthProvider>
      <Analytics />
    </html>
  );
}
