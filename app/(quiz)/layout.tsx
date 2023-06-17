import "../../app/globals.css";
import { Analytics } from "@vercel/analytics/react";
import {
  Marcellus as displayFont,
  Marcellus as bodyFont,
} from "@next/font/google";

import { Metadata } from "next";

import { Toaster } from "react-hot-toast";
import UserProvider from "@/components/auth/affiliate_auth_context";
import AuthProvider from "@/components/providers/SessionProvider";

// import { Toaster } from "react-hot-toast";

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

export const metadata: Metadata = {
  title: {
    default: "Sacbe Cacao",
    template: "%s | Sacbe Cacao",
  },
  applicationName: "Sacbe Cacao",
  metadataBase: new URL("https://sacbe-ceremonial-cacao.com"),
  category: "Cacao",
  alternates: {
    canonical: "https://sacbe-ceremonial-cacao.com",
  },
  keywords: [
    "Ceremonial cacao",
    "Transformative experiences",
    "What is Cacao",
    "Sustainable sourcing",
    "Cacao ceremony",
    "Connection",
    "Health and wellness",
    "Athletic Preformance",
    "Mental health",
    "Nourishment",
    "Recipes",
    "Keto",
    "Super Food",
  ],

  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  colorScheme: "light",

  twitter: {
    title: {
      default: "Sacbe Cacao",
      template: "%s | Sacbe Cacao",
    },
    description:
      "Discover the exquisite world of Sacbe ceremonial cacao, a purveyor of premium, single-origin cacao. Immerse yourself in the ancient practice of cacao ceremonies with our meticulously sourced and crafted products. Our website features a diverse selection of our signature cacao, along with an array of tantalizing recipes, insightful blog posts, and an exclusive subscription service. Explore the transformative potential of cacao as you connect with its rich flavors, explore our collection of delicious recipes, delve into our informative blog, and elevate your cacao journey with our convenient subscription. Available in the UK.",
    site: "https://sacbe-ceremonial-cacao.com",
  },
  description:
    "Discover the exquisite world of Sacbe ceremonial cacao, a purveyor of premium, single-origin cacao. Immerse yourself in the ancient practice of cacao ceremonies with our meticulously sourced and crafted products. Our website features a diverse selection of our signature cacao, along with an array of tantalizing recipes, insightful blog posts, and an exclusive subscription service. Explore the transformative potential of cacao as you connect with its rich flavors, explore our collection of delicious recipes, delve into our informative blog, and elevate your cacao journey with our convenient subscription. Available in the UK.",
  openGraph: {
    title: {
      default: "Sacbe Cacao",
      template: "%s | Sacbe Cacao",
    },
    description:
      "Discover the exquisite world of Sacbe ceremonial cacao, a purveyor of premium, single-origin cacao. Immerse yourself in the ancient practice of cacao ceremonies with our meticulously sourced and crafted products. Our website features a diverse selection of our signature cacao, along with an array of tantalizing recipes, insightful blog posts, and an exclusive subscription service. Explore the transformative potential of cacao as you connect with its rich flavors, explore our collection of delicious recipes, delve into our informative blog, and elevate your cacao journey with our convenient subscription. Available in the UK.",
    siteName: "Sacbe Cacao",
    url: "https://sacbe-ceremonial-cacao.com",
    locale: "en_GB",
    type: "website",
    countryName: "United Kingdom",
  },
};

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
