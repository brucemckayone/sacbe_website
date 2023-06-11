import Image from "next/image";
import HeaderInformation from "./headerInformation";
import image from "@/public/sacbe_product_with_shapes.jpg";
export default function HomePageHeader() {
  return (
    <div className="flex flex-col self-center md:flex-row w-full md:items-center">
      <div className="basis-6/12 px-4">
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
