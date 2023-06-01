import Image from "next/image";
import HeaderInformation from "./headerInformation";
export default function HomePageHeader() {
  return (
    <div className="flex flex-col md:flex-row w-full ">
      <div className="basis-6/12 relative animate-zoom_in_fade md:animate-slide_in_left_fade hover:scale-105 duration-1000 px-4 md:mb-20 md:px-20">
        <Image
          src="/sacbe_shapes_background.png"
          alt="branding shapes"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full "
          priority
          style={{
            objectFit: "contain",
          }}
        />
        <span className="flex justify-between my-5 text-center w-full m-auto">
          <p className=" text-sm md:text-lg border-r-2 px-1 md:pr-10">KETO</p>
          <p className=" text-sm md:text-lg border-r-2 px-1 md:pr-10">VEGAN</p>
          <p className=" text-sm md:text-lg border-r-2 px-1 md:pr-10">
            ORGANIC
          </p>
          <p className=" text-sm md:text-lg border-r-2 px-1 md:pr-10">
            SUGAR FREE
          </p>
          <p className="text-sm md:text-lg px-1 md:pr-10">FAIR TRADE</p>
        </span>
      </div>
      <HeaderInformation />
    </div>
  );
}
