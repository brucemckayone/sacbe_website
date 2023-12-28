import NavMenuBottom from "@/components/menu/NavMenuBottom";
import headerImage from "../../../public/home_header/home_page_header_image_12.jpg";
import logo from "../../../public/training/logo.png";
import Image from "next/image";
import { CallToActionButton } from "./CallToActionButton";
import JoinWaitlistButton from "./JoinWaitlistButton";

export function TrainingHeader() {
  return (
    <section className="h-[700px] md:h-[900px] relative">
      <div className="relative">
        <Image
          src={headerImage}
          placeholder="blur"
          alt="Cacao Facilitator Training"
          className="object-cover rounded w-full h-[700px] md:h-[900px] z-10"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/4 md:h-1/6 bg-gradient-to-t from- to-transparent" />
      </div>
      <div className="absolute  bottom-0 md:bottom-20 z-30 flex flex-col items-center p-2 justify-center md:m-4">
        <div className="w-11/12 md:w-7/12 lg:w-5/12 p-2 md:p-10">
          <Image
            src={logo}
            height={200}
            width={300}
            placeholder="blur"
            alt={"cacao facilitator logo"}
            className="rounded-lg object-contain w-6/12 md:w-7/12 lg:w-5/12 m-auto py-5 border-y bg-onPrimaryContainer/10 backdrop-blur-sm backdrop-filter border-onPrimary/30"
          />

          <div className=" mt-10 rounded-xl md:px-5 backdrop-blur-sm backdrop-filter bg-onPrimaryContainer/20 border-y border-onPrimary/30">
            <p className="text-onPrimary text-center my-2 font-display md:text-xl">
              Unearth the Mysteries of Cacao: Join Our Sacbe Facilitator
              Training in Aberdeenshire and Embark on a Journey of Sensual
              Discovery and Cultural Wisdom. Reserve Your Place in This
              Transformative Experience Today.
            </p>
            <div className="flex-col w-7/12 m-auto text-center justify-center my-2">
              <JoinWaitlistButton />
              <CallToActionButton />
            </div>
          </div>
        </div>
      </div>
      <NavMenuBottom />
    </section>
  );
}
