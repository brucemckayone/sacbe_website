import NavMenuBottom from "@/components/menu/NavMenuBottom";
import headerImage from "../../../public/home_header/home_page_header_image_12.jpg";
import logo from "../../../public/training/logo.png";
import Image from "next/image";

import JoinWaitlistButton from "./JoinWaitlistButton";
import { EarlyBirdCountdownTimer } from "./AccomidationChoiceCard";

export function HeaderBody() {
  return (
    <div className="w-11/12 md:w-/12 lg:w-7/12  p-2 md:p-10">
      <h1 className="text-[0px]">Cacao Facilitator Training</h1>
      <div className="rounded-lg object-contain w-full md:w-7/12 lg:w-6/12 m-auto  border-y bg-onPrimaryContainer/10 backdrop-blur-sm backdrop-filter border-onPrimary/30">
        <Image
          src={logo}
          height={200}
          width={300}
          placeholder="blur"
          alt={"cacao facilitator logo"}
          className="object-contain w-8/12 m-auto"
        />
        <p className="text-white text-center md:mx-10 p-1 m-3 backdrop-blur-lg bg-black/30 backdrop-filter rounded-xl">
          18th-24th May 2024, <br /> Aberdeenshire Scotland
        </p>
        <p className="text-onPrimary text-center my-2 font-display md:text-xl">
          Gain deep insights and skills for leading sacred Cacao journeys,
          honoring its ancient lineage & wisdom.
        </p>
        <div className="flex-col  m-auto text-center justify-center ">
          <div className="mt-3 mb-10 w-8/12 m-auto">
            <JoinWaitlistButton />
            <p className="text-xs text-white ">Limited to 9 participants</p>
          </div>
          <EarlyBirdCountdownTimer />
        </div>
      </div>
    </div>
  );
}

export function TrainingHeader() {
  return (
    <section className="h-[700px] md:h-[900px] relative">
      <div className="relative">
        <Image
          src={headerImage}
          placeholder="blur"
          alt="Cacao Facilitator Training header image it is of a woman making ceremonial cacao"
          className="object-cover rounded w-full h-[800px] md:h-[900px] z-10"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/4 md:h-1/6 bg-gradient-to-t from- to-transparent border-b-4 border-black" />
      </div>
      <div className="absolute w-full m-auto  bottom-0 md:bottom-10  px-10 z-30 flex flex-col items-center p-2 justify-center md:m-4">
        <HeaderBody />
      </div>
    </section>
  );
}
