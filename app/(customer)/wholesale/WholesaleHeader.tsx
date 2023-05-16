import React from "react";
import { WholeSaleForm } from "./WholeSaleForm.1";
import Image from "next/image";

export function WholesaleHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between h-full mx-10">
      <div className="relative w-full h-full basis-1/2 self-center">
        <Image
          src={"/cacao_love_heart.png"}
          width={1000}
          height={1000}
          alt={"header image"}
          className="object-contain"
        ></Image>
      </div>
      <div className="md:basis-1/2 self-center  ">
        <div className="flex flex-wrap md:w-10/12">
          <h1 className="mt-10 sm:text-center md:text-start  text-6xl md:text-7xl">
            WHOLESALE CEREMONIAL CACAO
          </h1>
        </div>
        <p className="md:w-8/12 mt-5">
          Welcome to the divine world of Wholesale Cacao, where every bite is a
          sacred experience. Our ethically-sourced cacao products are infused
          with love and positive energy to nourish your body and elevate your
          spirit. Immerse yourself in the blissful aroma and heavenly flavor of
          Wholesale Cacao and embark on a spiritual journey unlike any other.
          Indulge in the divine essence of cacao today.
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
