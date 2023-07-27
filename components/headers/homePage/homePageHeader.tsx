import NavMenuBottom from "@/components/menu/NavMenuBottom";

import HeaderInformation from "./headerInformation";
import ResponsiveImageComponent from "./Responsive_Image";

export default function HomePageHeader() {
  return (
    <div>
      <div className="flex flex-col self-center md:relative lg:flex-row w-full md:items-center justify-between ">
        <div className="w-full lg:w-5/12 h-[480px] px-4 z-0">
          <ResponsiveImageComponent />
        </div>
        <HeaderInformation />
      </div>
      <NavMenuBottom />
    </div>
  );
}
