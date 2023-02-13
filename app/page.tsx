import HomePageHeader from "@/components/headers/homePage/homePageHeader";
import NavMenuBottom from "@/components/menu/NavMenuBottom";
import SimpleSlider from "@/components/carousels/testimonial_slider";
import reviews from "@/lib/constants/reviews";
import BenifitsOfCacao from "@/components/body/benifits_of_cacao";

import SectionHeader from "@/components/titleHeader";
import AboutSacbe from "@/components/body/about_sacbe";

export default function Home() {
  return (
    <main>
      <HomePageHeader />
      <NavMenuBottom />

      <AboutSacbe />
      <BenifitsOfCacao />
      <SimpleSlider reviews={reviews} />
    </main>
  );
}
