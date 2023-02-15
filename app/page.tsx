import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import HomePageHeader from "@/components/headers/homePage/homePageHeader";
import NavMenuBottom from "@/components/menu/NavMenuBottom";
import SimpleSlider from "@/components/carousels/testimonial_slider";
import reviews from "@/lib/constants/reviews";
import BenifitsOfCacao from "@/components/body/benifits_of_cacao";
import Card from "@/components/cards/card";
import SectionHeader from "@/components/titleHeader";
import AboutSacbe from "@/components/body/about_sacbe";

export default function Home() {
  return (
    <main>
      <HomePageHeader />
      <NavMenuBottom />

      <div>
        <AboutSacbe />
      </div>

      <BenifitsOfCacao />
      <SimpleSlider reviews={reviews} />
      <NavMenuBottom />
      <Card>
        <div className="flex flex-col items-center">
          <h2 className="text-center">Sign Up To Our NewsLetter</h2>
          <form action="/api/newsletter_signup" method="post">
            <input
              className="w-full p-3"
              type="text"
              name=""
              id=""
              placeholder="email"
            />
            <button
              className="duration-500 bg-sacbeBrandColor py-1 px-8  my-3 rounded-md hover:bg-onPrimaryContainer hover:text-onPrimary border-2 "
              type="submit"
            >
              <p>SUBMIT</p>
            </button>
          </form>
        </div>
      </Card>
    </main>
  );
}
