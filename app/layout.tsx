import Navbar from "../components/nav bar/Navbar";
import "../app/globals.css";

import { Forum, Raleway } from "@next/font/google";

const raleway = Forum({
  variable: "--display-font",
  weight: "400",
});

const merriweather = Raleway({
  variable: "--body-font",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${raleway.variable} ${merriweather.variable} bg-background`}
    >
      <head />
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
