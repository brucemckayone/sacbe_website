import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Checkout Complete",
  description: "Checkout Complete",
  keywords: ["Checkout Complete"],
  twitter: {
    card: "summary_large_image",
    site: "@SacbeCacao",
    title: "Checkout Complete",
    description: "Checkout Complete",
  },
  openGraph: {
    type: "website",
    url: "https://sacbe-ceremonial-cacao.com/checkout/complete",
    title: "Checkout Complete",
    description: "Checkout Complete",
    siteName: "Sacbe Cacao",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
