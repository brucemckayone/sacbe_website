import React from "react";

import Image from "next/image";
import { Metadata } from "next";
import wholesalePortalMockUp from "@/public/wholesale_portal_mock_up.png";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Wholesale",
  description:
    "Revitalize Your Business with Wholesale Sacbe Cacao! Harness the Authentic Essence of Cacao and Offer Your Customers a Truly Enchanting Experience. Maximize Profits and Delight Your Clients With Our Premium Bulk Cacao Offerings. Take the Leap and Amplify Your Success with Wholesale Ceremonial Cacao Today!",
  keywords: [
    "Wholesale ceremonial cacao",
    "bulk cacao",
    "premium cacao offerings",
    "authentic cacao",
    "enchanting experience",
    "maximize profits",
    "wholesale portal",
    "sustainable cacao",
    "spiritual business",
    "transformative experiences",
    "discerning customers",
  ],
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    type: "website",
    url: "https://sacbe-ceremonial-cacao.com/wholesale",
    title: "Wholesale",
    description:
      "Revitalize Your Business with Wholesale Sacbe Cacao! Harness the Authentic Essence of Cacao and Offer Your Customers a Truly Enchanting Experience. Maximize Profits and Delight Your Clients With Our Premium Bulk Cacao Offerings. Take the Leap and Amplify Your Success with Wholesale Ceremonial Cacao Today!",
    siteName: "Sacbe Cacao",
  },
  alternates: {
    canonical: "https://www.sacbe-ceremonial-cacao.com/wholesale",
  },
};

const SacbeCacaoWholesale = async () => {
  const WholesalePricingTable = dynamic(() =>
    import("../../../components/customer/wholesale/PricingTable").then(
      (res) => res.WholesalePricingTable
    )
  );
  const WhyWorkWithUs = (
    await import("../../../components/customer/wholesale/WhyWorkWithUs")
  ).WhyWorkWithUs;
  const BottomWholeSaleForm = dynamic(() =>
    import("../../../components/customer/wholesale/BottomWholeSaleForm").then(
      (res) => res.BottomWholeSaleForm
    )
  );
  const WholesaleHeader = dynamic(() =>
    import("../../../components/customer/wholesale/WholesaleHeader").then(
      (res) => res.WholesaleHeader
    )
  );
  // const AboutPackaging = dynamic(() =>
  //   import("./AboutPackaging").then((res) => res.AboutPackaging)
  // );

  const NavMenuBottom = dynamic(
    () => import("@/components/menu/NavMenuBottom")
  );

  return (
    <div>
      <WholesaleHeader />
      <NavMenuBottom />
      <div className="flex flex-row items-center justify-center bg-secondaryContainer pt-20">
        <div className="self-center w-11/12 md:w-10/12">
          <h2 className=" text-3xl md:text-6xl lg:text-8xl text-center mb-10 mt-5">
            <strong className="text-stroke-3 text-3xl md:text-6xl lg:text-8xl text-sacbeBrandColor">
              WHOLESALE CACAO:
            </strong>{" "}
            AUTHENTIC AND SUSTAINABLE BULK CACAO FOR SPIRITUAL, HEALTH &
            WELLBEING BUSINESSES IN THE UK
          </h2>
          <div className="flex flex-row justify-center">
            <Image
              src={wholesalePortalMockUp}
              width={1080}
              height={800}
              placeholder="blur"
              alt={"affiliate portal mock up "}
            />
          </div>
          <div>
            <p className="lg:w-10/12 m-auto mb-20">
              With our Wholesale Cacao Portal, you have a reliable partner for
              sourcing premium cacao products for your spiritual business.
              Whether you are looking for bulk cacao for retail, ceremonial
              cacao for transformative experiences, or simply seeking
              sustainable cacao options, we have you covered. Start exploring
              our wholesale portal today and unlock the essence of pure cacao
              for your discerning customers.
            </p>
          </div>
          <WhyWorkWithUs />
          <div className="md:col-span-4 md:col-start-3 p-3 bg-surfaceVarient my-20 rounded-lg shadow-xl hover:shadow-2xl duration-200">
            <WholesalePricingTable />
          </div>
          {/* <AboutPackaging /> */}
          <BottomWholeSaleForm />
        </div>
      </div>
    </div>
  );
};

export default SacbeCacaoWholesale;
