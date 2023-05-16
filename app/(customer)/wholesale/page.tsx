import React from "react";
import NavMenuBottom from "@/components/menu/NavMenuBottom";
import { PricingTable } from "./PricingTable";
import { BottomWholeSaleForm } from "./BottomWholeSaleForm";
import { AboutClouds } from "./AboutClouds";
import { WholesaleHeader } from "./WholesaleHeader";
import { AboutPackaging } from "./AboutPackaging";

const SacbeCacaoWholesale = async () => {
  return (
    <div>
      <WholesaleHeader></WholesaleHeader>
      <NavMenuBottom />
      <div className="flex flex-row items-center justify-center bg-secondaryContainer pt-20 ">
        <div className="self-center w-11/12 md:w-10/12">
          <PricingTable></PricingTable>
          <h2 className=" text-6xl md:text-9xl text-center my-10">
            We Want To Build A Beautiful Relationships With You
          </h2>

          {/* <h2 className=" text-center text-7xl my-10">About Our Cacao</h2> */}
          <AboutClouds></AboutClouds>

          <AboutPackaging></AboutPackaging>

          <BottomWholeSaleForm></BottomWholeSaleForm>
        </div>
      </div>
    </div>
  );
};

export default SacbeCacaoWholesale;
