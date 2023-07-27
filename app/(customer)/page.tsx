import HomePageHeader from "@/components/headers/homePage/homePageHeader";
import NavMenuBottom from "@/components/menu/NavMenuBottom";
import SimpleSlider from "@/components/carousels/testimonial_slider";
// import { AskAQuestion } from "./AskAQuestion";
import { BlogAndRecipes } from "./BlogAndRecipes";
import dynamic from "next/dynamic";
import { QuickQuestion } from "./QuickQuestion";
import { VitiminPopovers } from "./VitiminPopovers.1";
import { Suspense } from "react";
import { AskAQuestion } from "./AskAQuestion";
import Image from "next/image";
import pod from "../../public/cacao_pod_floating.png";

export default function Home() {
  const TheHook = dynamic(() =>
    import("../../components/TheHook").then((res) => res.TheHook)
  );

  const BenifitsOfCacao = dynamic(() =>
    import("@/components/body/benifits_of_cacao").then((res) => res.default)
  );

  const AboutSacbe = dynamic(() =>
    import("@/components/body/about_sacbe").then((res) => res.default)
  );
  const BecomeAPractioner = dynamic(() =>
    import("./BecomeAPractioner").then((res) => res.BecomeAPractioner)
  );

  const CallToActionBuyHomePage = dynamic(() =>
    import("./CallToActionBuyHomePage").then(
      (res) => res.CallToActionBuyHomePage
    )
  );

  // const AskAQuestion = dynamic(() =>
  //   import("./AskAQuestion").then((res) => res.AskAQuestion)
  // );

  return (
    <main>
      <HomePageHeader />
      <div className="bg-gradient-to-b from-surface from-10% via-primaryContainer via-60% to-tertiaryContainer z-500">
        <TheHook />
        {/* component that has a yess or no awnser  */}
        <QuickQuestion />
        <BenifitsOfCacao />
        <div>
          <Image
            src={pod}
            alt={""}
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
