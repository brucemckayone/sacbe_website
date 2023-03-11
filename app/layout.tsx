import Navbar from "../components/nav bar/Navbar";
import "../app/globals.css";
import AuthProvider from "@/components/providers/SessionProvider";
import Footer from "@/components/footer";
import {
  Marcellus as displayFont,
  Marcellus as bodyFont,
} from "@next/font/google";

import ToastContainerClient from "@/components/toast/toast_container";

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
    <AuthProvider>
      <html
        className={`${raleway.variable} ${merriweather.variable} bg-surface`}
      >
        <head />
        <body>
          <Navbar />
          {children}
          <ToastContainerClient />
        </body>
      </html>
    </AuthProvider>
  );
}
