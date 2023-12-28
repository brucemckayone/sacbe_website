import Navbar from "@/components/shared/nav bar/Navbar";
import "../../app/globals.css";

import AuthProvider from "@/components/providers/SessionProvider";
import { Analytics } from "@vercel/analytics/react";
import {
  Marcellus as displayFont,
  Marcellus as bodyFont,
} from "next/font/google";
import UserProvider from "@/components/shared/auth/UserProvider";
import { Actions } from "../../components/customer/shared/QuickPurchase";
import AffiliateLinkProvider from "@/components/providers/AffiliatePaymentLinkProvider";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { homeMetaData } from "@/lib/metadata/homeMetadata";

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

export const metadata = homeMetaData;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const PostLoader = dynamic(() => import("./posts/[slug]/Loading"));
  const Footer = dynamic(() => import("@/components/footer/footer"));

  return (
    <html
      lang="en"
      className={`${raleway.variable} ${merriweather.variable} bg-[white] w-full `}
    >
      <body className="w-full">
        <AuthProvider>
          <UserProvider>
            <Navbar />
            <Suspense fallback={<PostLoader />}>
              <AffiliateLinkProvider>
                {children}
                <Actions />
              </AffiliateLinkProvider>
              <Footer />
              <Toaster />
            </Suspense>
          </UserProvider>
        </AuthProvider>
      </body>
      <Analytics />
    </html>
  );
}
