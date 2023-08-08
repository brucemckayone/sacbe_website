import React from "react";
import NavMenuBottom from "@/components/menu/NavMenuBottom";
import { Metadata } from "next";
import { AffiliateHeader } from "@/components/affiliate/AffiliateHeader";
import dynamic from "next/dynamic";

const description =
  "Join Our Affiliate Program Today! Unlock the power of ceremonial cacao and embark on a journey of spiritual awakening while earning enticing rewards. Become a part of our affiliate community and share the profound benefits of ceremonial cacao with others. Join now in the abundant opportunities that await you!";

export const metadata: Metadata = {
  title: "Affiliate Program",
  description: description,
  keywords: [
    "Sacbe Ambassador Program",
    "ceremonial cacao",
    "Make money with cacao",
    "affiliate program",
    "Make money with ceremonial cacao",
    "Make money in the spiritual space",
    "Earn money in the spiritual space",
    "How to make money in the spiritual space",
    "How to make money with ceremonial cacao",
    "ancient traditions",
    "fair trade",
    "sustainability",
    "exceptional product quality",
    "lucrative commission rates",
    "captivating marketing materials",
    "exclusive offers",
    "ethics",
    "social responsibility",
    "environmental consciousness",
  ],
  twitter: {
    card: "summary_large_image",
    title: "Affiliate Program",
    description:
      "Join Our Affiliate Program Today! Unlock the power of ceremonial cacao and embark on a journey of spiritual awakening while earning enticing rewards. Become a part of our affiliate community and share the profound benefits of ceremonial cacao with others. Join now in the abundant opportunities that await you!",
    site: "@SacbeCacao",
    siteId: "https://sacbe-ceremonial-cacao.com/affiliate-program",
  },
  openGraph: {
    type: "website",
    url: "https://sacbe-ceremonial-cacao.com/affiliate-program",
    title: "Affiliate Program",
    description:
      "Join Our Affiliate Program Today! Unlock the power of ceremonial cacao and embark on a journey of spiritual awakening while earning enticing rewards. Become a part of our affiliate community and share the profound benefits of ceremonial cacao with others. Join now in the abundant opportunities that await you!",
    siteName: "Sacbe Cacao",
    countryName: "UK",
  },
};

export default async function AffiliatePage() {
  const AffiliatePageBody = dynamic(() =>
    import("./AffiliatePageBody").then((res) => res.AffiliatePageBody)
  );

  return (
    <>
      <AffiliateHeader />
      <NavMenuBottom />
      <AffiliatePageBody />
    </>
  );
}
