import Navbar from "@/components/nav bar/Navbar";
import "../../globals.css";
import AuthProvider from "@/components/providers/SessionProvider";

import {
  Marcellus as displayFont,
  Marcellus as bodyFont,
} from "@next/font/google";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";

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
    <html className={`${raleway.variable} ${merriweather.variable} bg-surface`}>
      <AuthProvider>
        <head />
        <body>{children}</body>
        <Toaster />
      </AuthProvider>
    </html>
  );
}
