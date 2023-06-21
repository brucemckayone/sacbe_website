import HomePageHeader from "@/components/headers/homePage/homePageHeader";
import NavMenuBottom from "@/components/menu/NavMenuBottom";
import SimpleSlider from "@/components/carousels/testimonial_slider";
import { VitiminPopovers } from "./VitiminPopovers";
import { AskAQuestion } from "./AskAQuestion";
import { BlogAndRecipes } from "./BlogAndRecipes";

import dynamic from "next/dynamic";
import { QuickQuestion } from "./QuickQuestion";

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

  return (
    <main>
      <HomePageHeader />
      <NavMenuBottom />
      <TheHook />
      {/* component that has a yess or no awnser  */}
      <QuickQuestion />
      <BenifitsOfCacao />
      <VitiminPopovers />
      <CallToActionBuyHomePage />
      <SimpleSlider />
      <AskAQuestion />
      <AboutSacbe />
      <BecomeAPractioner />
      {/* @ts-expect-error */}
      <BlogAndRecipes />
      <NavMenuBottom />
    </main>
  );
}
