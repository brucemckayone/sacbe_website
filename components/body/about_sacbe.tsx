import React from "react";
import Image from "next/image";
import Card from "../cards/card";
import Link from "next/link";
import SlideInUp from "../animations/slide_in_up";
import PrimaryButton from "../buttons/primaryButton";

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
    <div className=" bg-secondaryContainer">
      <SlideInUp>
        <div className="flex flex-col justify-center align-middle">
          {/* <SectionHeader className="mt-5" title="About Sacbe" /> */}
          {/* <WeLoveOurMotherCard></WeLoveOurMotherCard> */}
          {/* orgins */}
          <h1 className="self-center m-10">OUR JOURNEY</h1>
          <div className="flex flex-col md:flex-row">
            <Card className="flex basis-1/2" hasColor={false}>
              <div className="relative w-full p-40 bg-primaryContainer rounded-full h-[500px] ">
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
            </Card>
            <Card
              className="basis-1/3 flex flex-col justify-center items-center align-middle"
              hasColor={false}
            >
              <div className="self-center">
                <h3 className="flex w-1/2">OUR HUMBLE ORIGINS</h3>
                <h4 className="flex w-3/4">
                  small-scale, family owned farmers cooperatives
                </h4>
                <p className="flex w-3/4">
                  Sacbe Cacao is sourced from Arriba Nacional beans. Organically
                  and sustainably grown in Esmeraldas, placed in the north west
                  Andean Mountain range and situated at 2000 meters altitude,
                  where the bio-diversity of this land contributes to its rich
                  flavour profile + strong spirit.
                </p>
                <Link href="/about">Learn More</Link>
                <div className="flex elf-end">
                  <PrimaryButton url="" text="Buy Now"></PrimaryButton>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </SlideInUp>
    </div>
  );
};

export default AboutSacbe;
