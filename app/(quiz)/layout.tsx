import "../../app/globals.css";
import { Analytics } from "@vercel/analytics/react";
import {
  Marcellus as displayFont,
  Marcellus as bodyFont,
} from "next/font/google";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/components/auth/affiliate_auth_context";
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
    <html
      className={`${raleway.variable} ${merriweather.variable} bg-[white] w-[100%]`}
    >
      <AuthProvider>
        <UserProvider>
          <body>
            {children}
            <Toaster />
          </body>
        </UserProvider>
      </AuthProvider>
      <Analytics />
    </html>
  );
}