import React from "react";
import { WholeSaleForm } from "./WholeSaleForm.1";
import Image from "next/image";
import cacaoInLoveHeart from "@/public/cacao_love_heart.png";
export function WholesaleHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between h-full py-24 px-5 md:px-0">
      <div className="relative w-full h-full basis-1/2 self-center">
        <Image
          src={cacaoInLoveHeart}
          width={1000}
          height={1000}
          alt={"header image"}
          className="object-contain rounded-lg"
          placeholder="blur"
        ></Image>
      </div>
      <div className="md:basis-1/2 self-center  ">
        <div className="flex flex-wrap md:w-10/12">
          <h1 className="mt-10 sm:text-center md:text-start  text-6xl md:text-7xl">
            WHOLESALE CEREMONIAL CACAO
          </h1>
        </div>
        <p className="md:w-8/12 mt-5">
          Revitalize Your Business with Wholesale Sacbe Cacao! Harness the
          Authentic Essence of Cacao and Offer Your Customers a Truly Enchanting
          Experience. Maximize Profits and Delight Your Clients With Our Premium
          Bulk Cacao Offerings. Take the Leap and Amplify Your Success with
          Wholesale Ceremonial Cacao Today!
        </p>

        <div className="md:w-8/12">
          <div className="mt-5 ">
            <WholeSaleForm />
          </div>
        </div>
      </div>
    </div>
  );
}
