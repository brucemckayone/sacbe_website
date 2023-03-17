import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import HomePageHeader from "@/components/headers/homePage/homePageHeader";
import NavMenuBottom from "@/components/menu/NavMenuBottom";
import SimpleSlider from "@/components/carousels/testimonial_slider";
import reviews from "@/lib/constants/reviews";
import BenifitsOfCacao from "@/components/body/benifits_of_cacao";
import Card from "@/components/cards/card";
import Image from "next/image";
import AboutSacbe from "@/components/body/about_sacbe";
import Footer from "@/components/footer";
import LinkButton from "@/components/buttons/LinkButton";

import SlideInUp from "@/components/animations/slide_in_up";
export default function Home() {
  return (
    <main>
      <HomePageHeader />
      <NavMenuBottom />

      <AboutSacbe />

      <BenifitsOfCacao />

      <div className=" bg-gradient-to-b from-surfaceVarient to-secondaryContainer py-10">
        <div className="flex flex-col justify-center align-middle">
          <h1 className="self-center flex pt-20 sm:text-4xl">TRAINING</h1>
          <div className="flex flex-col md:flex-row ">
            <div></div>

            <Card className="flex basis-1/2" hasColor={false}>
              <SlideInUp animiation="animate-zoom_in">
                <div className="absolute w-[400px] md:w-[500px] bg-primaryContainer rounded-full h-[500px] blur-md"></div>
                <div className="relative w-[400px]  md:w-[500px] h-[500px]">
                  <div className="absolute top-0 right-0 left-0 w-full h-[500px]">
                    <Image
                      src={"/pouring_cacao_cup.png"}
                      fill
                      style={{ objectFit: "contain" }}
                      alt=""
                      className="animate-pulse_scale"
                    ></Image>
                  </div>
                </div>
              </SlideInUp>
            </Card>

            <Card
              className="basis-2/5 flex flex-col justify-center items-center align-middle"
              hasColor={false}
            >
              <div className="basis-1/2">
                <SlideInUp animiation="animate-slide_in_left_blur">
                  <h5 className="flex md:w-1/2 underline">
                    Become A Practitioner
                  </h5>
                </SlideInUp>
                <SlideInUp animiation="animate-slide_in_left_blur">
                  <h3 className="flex md:w-3/4">Cacao Facilitation Training</h3>
                </SlideInUp>
                <SlideInUp animiation="animate-slide_in_left_blur">
                  <p className="flex md:w-2/4">
                    We welcome those wishing to work with for cacao to join us
                    in an 6 night emmersive training in the wild depths of the
                    scottish highlands where you will develope your skills as a
                    space holder & gaurdian of cacao.
                  </p>
                </SlideInUp>
                <SlideInUp
                  key={"sky on eart slidy"}
                  animiation="animate-slide_in_left_blur"
                >
                  <LinkButton
                    key={"sky on on earth thingy"}
                    url="https://skyeonearth.com/cacaofacilitation"
                    isPrimary={false}
                  ></LinkButton>
                </SlideInUp>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <SimpleSlider reviews={reviews} />
      <Footer></Footer>
      <NavMenuBottom />

      {/* <Card>
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
      </Card> */}
    </main>
  );
}
