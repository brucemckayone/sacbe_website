import Image from "next/image";
import HeaderInformation from "./headerInformation";
export default function HomePageHeader() {
  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="basis-6/12 relative animate-slide_in_left_fade px-4 md:mb-20 md:px-20  ">
        <Image
          src="/sacbe_shapes_background.png"
          alt="branding shapes"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-full"
          priority
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <HeaderInformation></HeaderInformation>
    </div>
  );
}
