import React from "react";
import Image from "next/image";
import Card from "../cards/card";
import Link from "next/link";
import SlideInUp from "../animations/slide_in_up";
import LinkButton from "../buttons/LinkButton";

function WeLoveOurMotherCard() {
  return (
    <Card className="mb-5 mx-10 rounded-md p-3  md:mx-48 border-2">
      <div className="flex justify-center">
        <Image
          src={"/we_love_mother_leaf.png"}
          width={25}
          height={25}
          className="-scale-x-100"
          alt="leaf header decoration"
        ></Image>
        <h4 className="self-center px-5 text-center">WE LOVE OUR MOTHER</h4>
        <Image
          src={"/we_love_mother_leaf.png"}
          width={25}
          height={25}
          alt="leaf header decoration"
        ></Image>
      </div>
      <p className="mx-5 text-center">
        Our pouches are eco-friendly + fully recyclable, featuring labels made
        from recycled wood pulp and printed with vegetable inks.
      </p>
    </Card>
  );
}

const AboutSacbe: React.FC = () => {
  return (
    <div className="bg-secondaryContainer pb-28">
      <h2 className="py-20 mx-5 md:mx-10 text-center text-7xl lg:text-8xl md:text-7xl">
        OUR JOURNEY
      </h2>

      <div className="flex flex-col justify-center align-middle">
        <div className="flex flex-col md:flex-row">
          <Card className="flex basis-1/2" hasColor={false}>
            <div className="absolute w-11/12 md:w-1/3 p-40 bg-primaryContainer rounded-full h-[500px] blur-md"></div>
            <SlideInUp animiation="animate-zoom_in_fade">
              <div className="relative w-full p-40 h-[500px]  ">
                <div className="absolute top-0 right-0 left-0 w-full h-[400px]">
                  <Image
                    src={"/cacao_pod_floating.png"}
                    fill
                    style={{ objectFit: "contain" }}
                    alt=""
                    className="animate-float hover:animate-bounce duration-700"
                  ></Image>
                </div>

                <div className="absolute bottom-0 left-0 h-[140px] w-full">
                  <Image
                    src={"/drop_shadow.png"}
                    fill
                    style={{ objectFit: "contain" }}
                    alt=""
                    className="animate-scale_shadow"
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
                <h5 className="flex md:w-1/2 underline">Our Humble Origins</h5>
              </SlideInUp>
              <SlideInUp animiation="animate-slide_in_left_blur">
                <h3 className="flex md:w-3/4">
                  {" "}
                  Small-scale, Family Owned Farmers Cooperatives
                </h3>
              </SlideInUp>
              <SlideInUp animiation="animate-slide_in_left_blur">
                <p className="flex md:w-3/4 text-xl">
                  Sacbe Cacao is sourced from Arriba Nacional beans. Organically
                  and sustainably grown in Esmeraldas, placed in the north west
                  Andean Mountain range and situated at 2000 meters altitude,
                  where the bio-diversity of this land contributes to its rich
                  flavour profile + strong spirit.
                </p>
              </SlideInUp>
              <SlideInUp animiation="animate-slide_in_left_blur">
                <LinkButton url="/about" isPrimary={false}></LinkButton>
              </SlideInUp>
            </div>
          </Card>
        </div>
      </div>
      {/* </SlideInUp> */}
    </div>
  );
};

export default AboutSacbe;
