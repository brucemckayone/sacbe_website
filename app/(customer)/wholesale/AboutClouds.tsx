import React from "react";
import Image from "next/image";

export function AboutClouds() {
  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-10 pt-20 px-1 md:mx-20 bg-secondaryContainer">
      <div className="col-span-3 py-10 rounded-xl">
        <div className="flex flex-row justify-center h-[400px]">
          <Image
            src={"/clouds_green.jpg"}
            width={500}
            height={500}
            alt="heart"
            className="w-1/12 md:w-3/12 rounded-3xl object-cover ml-2 md:mx-3 duration-200 hover:scale-105"
          ></Image>
          <Image
            src={"/clouds_green.jpg"}
            width={100}
            height={100}
            alt="heart"
            className="w-2/12 md:w-1/12 ml-2 md:ml-3 rounded-full object-cover  duration-200 hover:scale-105"
          ></Image>
          <Image
            src={"/clouds_yellow.jpg"}
            width={200}
            height={200}
            alt="heart"
            className=" w-3/12 md:w-4/12 rounded-3xl ml-2 md:ml-5 object-cover duration-200 hover:scale-105"
          ></Image>
          <Image
            src={"/clouds_yellow.jpg"}
            width={100}
            height={100}
            alt="heart"
            className="w-1/12 rounded-full object-cover ml-2 md:ml-5 duration-200 hover:scale-105"
          ></Image>
          <Image
            src={"/clouds_pink.jpg"}
            width={500}
            height={500}
            alt="heart"
            className="w-3/12 md:w-2/12 rounded-3xl object-cover ml-2 md:ml-5 duration-200 hover:scale-105"
          ></Image>
        </div>
        <h2 className="text-7xl text-center mt-10 md:hidden">
          Grown In The Heart of The Ecuadorian Cloud Forests
        </h2>
        <div className="flex flex-row pt-0 md:pt-32">
          <div className="md:basis-3/5 md:mx-20 mx-10">
            <h2 className="text-7xl text-start mt-10 hidden md:block">
              Grown In The Heart of The Ecuadorian Cloud Forests
            </h2>
            <h3 className="mt-10">Small-Scale Family Farms </h3>
            <p className="">
              Sacbe Ceremonial Cacao is sourced from small-scale family farms
              located in the north-west coastal region of Ecuador. The cacao
              grows at high altitudes in cloud forests where the land is rich in
              biodiversity, making it the perfect environment for the cacao
              trees to flourish. Our cacao is Fair Trade Organic and features a
              delicious deep flavour profile with little bitterness and velvety
              texture.
            </p>
            <h3 className="mt-10">Grown with Sacred Intention</h3>
            <p>
              Our cacao is grown and harvested by farmers who deeply understand
              cacao as a sacred resource. They conduct their work with the
              utmost respect and loving intention, and follow sustainable
              farming methods and traditional practices. The result is an
              energetic standard of Ceremonial Grade that reflects the deep
              connection between the land, the farmers, and the wisdom passed
              down from their ancestors.
            </p>
          </div>
          <div className="sm: md:block md:hid md:basis-2/5 relative h-[700px] flex flex-col justify-center">
            <Image
              src={"/cacao_pod_held_on_tree.jpg"}
              fill
              alt="cloud forest picture"
              className="rounded-lg shadow-md object-cover"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
