import React from "react";
import NavMenuBottom from "@/components/menu/NavMenuBottom";
import { PricingTable } from "./PricingTable";
import { BottomWholeSaleForm } from "./BottomWholeSaleForm";
import { AboutClouds } from "./AboutClouds";
import { WholesaleHeader } from "./WholesaleHeader";
import { AboutPackaging } from "./AboutPackaging";
import Image from "next/image";
import { Metadata } from "next";

const metaData: Metadata = {
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
};

const SacbeCacaoWholesale = async () => {
  return (
    <div>
      <WholesaleHeader></WholesaleHeader>
      <NavMenuBottom />
      <div className="flex flex-row items-center justify-center bg-secondaryContainer pt-20 ">
        <div className="self-center w-11/12 md:w-8/12">
          <h2 className=" text-3xl md:text-8xl text-center mb-10 mt-5">
            <strong className="text-stroke-3 text-3xl md:text-8xl text-sacbeBrandColor">
              WHOLESALE CACAO:
            </strong>{" "}
            AUTHENTIC AND SUSTAINABLE BULK CACAO FOR SPIRITUAL & HEALTH &
            WELLBEING BUSINESSES IN THE UK
          </h2>
          <div className="flex flex-row justify-center">
            <Image
              src={"/wholesale_portal_mock_up.png"}
              width={1080}
              height={800}
              alt={"affiliate portal mock up "}
              className=""
            ></Image>
          </div>
          <div>
            <p className="lg:w-11/12 m-auto mb-20">
              With our Wholesale Cacao Portal, you have a reliable partner for
              sourcing premium cacao products for your spiritual business.
              Whether you are looking for bulk cacao for retail, ceremonial
              cacao for transformative experiences, or simply seeking
              sustainable cacao options, we have you covered. Start exploring
              our wholesale portal today and unlock the essence of pure cacao
              for your discerning customers.
            </p>
          </div>
          <PricingTable></PricingTable>

          <AboutPackaging></AboutPackaging>

          <BottomWholeSaleForm></BottomWholeSaleForm>
        </div>
      </div>
    </div>
  );
};

export default SacbeCacaoWholesale;
