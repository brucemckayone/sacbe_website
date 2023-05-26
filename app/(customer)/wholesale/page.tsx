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
          <h2 className="text-8xl text-center mb-10 mt-5">
            Embrace the Spiritual Connection: Enter our Cacao Affiliate Portal
          </h2>
          <div className="flex justify-center">
            <Image
              src={"/wholesale_portal_mock_up.png"}
              width={1080}
              height={800}
              alt={"affiliate portal mock up "}
              className=""
            ></Image>
          </div>
          <div>
            <p className="mb-20 w-9/12 m-auto">
              Discover a dedicated space crafted exclusively for our spiritual
              affiliates. Our cacao affiliate portal serves as a platform to
              foster a deeper spiritual connection and share the profound
              benefits of ceremonial cacao. Engage effortlessly by generating
              personalized affiliate links, enabling you to offer the
              transformative power of cacao to others. Gain valuable insights
              into the impact of your efforts through intuitive tracking and
              analytics. Connect with a community of like-minded individuals,
              exchanging knowledge and experiences to fuel your spiritual
              growth. Our committed support team is readily available to address
              your questions and provide guidance. Step onto the path of selling
              cacao with a spiritual intention, as our portal supports your
              spiritual journey and amplifies your impact.
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
