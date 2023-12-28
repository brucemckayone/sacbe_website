import React from "react";
import { WholeSaleForm } from "./WholeSaleForm";
import Image from "next/image";
import headerImage from "@/public/home_header/home_page_header_image_4.jpg";
export function WholesaleHeader() {
  return (
    <div className="relative">
      <div className="">
        <Image
          src={headerImage}
          alt={"Cacao Facilitator Training"}
          className="w-full object-cover h-[700px] md:h-[900px]"
        />
        <div className="absolute px-2 py-2 text-white bottom-0 md:bottom-32 md:left-28 backdrop-blur-sm backdrop-filter bg-black/20  shadow-2xl border-white w-full md:w-1/3">
          <h1 className=" mb-5">
            WHOLESALE <br />
            CEREMONIAL CACAO
          </h1>

          <p className=" ml-2">
            Revitalize Your Business with Wholesale Sacbe Cacao! Harness the
            Authentic Essence of Cacao and Offer Your Customers a Truly
            Enchanting Experience. Maximize Profits and Delight Your Clients
            With Our Premium Bulk Cacao Offerings. Take the Leap and Amplify
            Your Success with Wholesale Ceremonial Cacao Today!
          </p>

          <div>
            <WholeSaleForm />
          </div>
        </div>
      </div>
    </div>
  );
}
