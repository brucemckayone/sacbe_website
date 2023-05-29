import React from "react";
import NavMenuBottom from "@/components/menu/NavMenuBottom";
import { PricingTable } from "./PricingTable";
import { BottomWholeSaleForm } from "./BottomWholeSaleForm";
import { AboutClouds } from "./AboutClouds";
import { WholesaleHeader } from "./WholesaleHeader";
import { AboutPackaging } from "./AboutPackaging";
import Image from "next/image";
const SacbeCacaoWholesale = async () => {
  return (
    <div>
      <WholesaleHeader></WholesaleHeader>
      <NavMenuBottom />
      <div className="flex flex-row items-center justify-center bg-secondaryContainer pt-20 ">
        <div className="self-center w-11/12 md:w-10/12">
          <h2 className="text-5xl text-center mb-10 mt-5">
            WHOLESALE CACAO PORTAL: AUTHENTIC AND SUSTAINABLE BULK CACAO FOR
            SPIRITUAL & WELLBEING BUSINESSES IN THE UK
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
              Whether you're looking for bulk cacao for retail, ceremonial cacao
              for transformative experiences, or simply seeking sustainable
              cacao options, we have you covered. Start exploring our wholesale
              portal today and unlock the essence of pure cacao for your
              discerning customers.
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
