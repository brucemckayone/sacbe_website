import Navbar from "../components/nav bar/Navbar";
import "../app/globals.css";

import {
  Marcellus as displayFont,
  Marcellus as bodyFont,
} from "@next/font/google";

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
    <html className={`${raleway.variable} ${merriweather.variable} bg-surface`}>
      <head />
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
