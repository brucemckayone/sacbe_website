import Image from "next/image";
import HeaderInformation from "./headerInformation";
import image from "@/public/sacbe_product_with_shapes.webp";
export default function HomePageHeader() {
  return (
    <div className="flex flex-col self-center lg:flex-row w-full md:items-center justify-center">
      <div className="w-full lg:w-5/12 px-4">
        <Image
          src={image}
          alt="branding shapes"
          priority
          className="rounded-md object-contain w-full md:h-[650px]"
        />
      </div>

      <HeaderInformation />
    </div>
  );
}
