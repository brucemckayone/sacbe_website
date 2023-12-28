"use client";
import dynamic from "next/dynamic";
import Card from "../cards/card";
import Image from "next/image";
import { benefitsData } from "./benefitsData";

export default function BenefitsOfCacao() {
  const BenifitsCard = dynamic(() =>
    import("../cards/benifits_card").then((res) => res.default)
  );

  return (
    <div className="flex flex-col  lg:flex-row w-full md:w-10/12 m-auto backdrop-blur-lg bg-onPrimary/50 rounded-3xl my-20">
      <div className="xl:basis-1/3 md:basis-1/3  self-center flex flex-col justify-stretch ">
        <Image
          src={"/home_header/home_page_header_image_8.jpg"}
          width={700}
          height={900}
          alt="alt"
          className="rounded-xl md:rounded-3xl h-[500px] md:h-[650px] object-cover "
        />
      </div>

      <Card
        hasColor={false}
        className="w-full justify-around xl:basis-1/2 md:basis-2/4 m-0"
      >
        <h3 className="text-6xl md:pb-10">Benefits of Cacao</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 animate-slide_in_up_fade ">
          {benefitsData.map((data, index) => (
            <BenifitsCard
              key={index}
              headerText={data.headerText}
              imagePath={data.imagePath}
              text={data.text}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
