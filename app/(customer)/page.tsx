import HomePageHeader from "@/components/shared/headers/homePage/homePageHeader";
import NavMenuBottom from "@/components/menu/NavMenuBottom";
import SimpleSlider from "@/components/shared/carousels/testimonial_slider";
import { BlogAndRecipes } from "../../components/customer/blog/BlogAndRecipes";
import dynamic from "next/dynamic";
import { QuickQuestion } from "../../components/customer/shared/QuickQuestion";
import { VitiminPopovers } from "../../components/customer/VitiminPopovers";
import { Suspense } from "react";
import { AskAQuestion } from "../../components/customer/shared/AskAQuestion";
import Image from "next/image";
import pod from "../../public/cacao_pod_floating.png";

export default function Home() {
  const TheHook = dynamic(() =>
    import("../../components/customer/home/TheHook").then((res) => res.TheHook)
  );

  const BenifitsOfCacao = dynamic(() =>
    import("@/components/shared/body/benifits_of_cacao").then(
      (res) => res.default
    )
  );

  const AboutSacbe = dynamic(() =>
    import("@/components/shared/body/about_sacbe").then((res) => res.default)
  );
  const BecomeAPractioner = dynamic(() =>
    import("../../components/customer/home/BecomeAPractioner").then(
      (res) => res.BecomeAPractioner
    )
  );

  const CallToActionBuyHomePage = dynamic(() =>
    import("../../components/customer/home/CallToActionBuyHomePage").then(
      (res) => res.CallToActionBuyHomePage
    )
  );

  return (
    <main>
      <HomePageHeader />
      <div className="bg-gradient-to-b from-surface from-r via-primaryContainer via-60% to-tertiaryContainer z-500">
        <TheHook />

        <QuickQuestion />
        <BenifitsOfCacao />
        <div>
          <Image
            src={pod}
            alt={
              "A floatin cacao pod used to make cacao it is orange and green"
            }
            className="absolute md:right-32 mt-72 md:mt-0 "
          />
          <VitiminPopovers />
        </div>
        <CallToActionBuyHomePage />

        <SimpleSlider />
        <AskAQuestion />
        <AboutSacbe />
        <BecomeAPractioner />
        <Suspense fallback={<div>Loading...</div>}>
          <BlogAndRecipes />
        </Suspense>
        <NavMenuBottom />
      </div>
    </main>
  );
}
