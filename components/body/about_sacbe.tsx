import React from "react";
import Image from "next/image";
import Card from "../cards/card";
import Link from "next/link";
import { ImageLeftTextRight } from "./ImageLeftTextRight";

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
    <ImageLeftTextRight
      title="OUR JOURNEY"
      image="/cacao_pod_floating.png"
      shadow="/drop_shadow.png"
      text="Sacbe Cacao is sourced from Arriba Nacional beans. Organically
                  and sustainably grown in Esmeraldas, placed in the north west
                  Andean Mountain range and situated at 2000 meters altitude,
                  where the bio-diversity of this land contributes to its rich
                  flavour profile + strong spirit."
      textHeaderLarge="Small-scale, Family Owned Farmers Cooperatives"
      textHeaderSmall="Our Humble Origins"
      buttonLink="\about"
      buttonText="Learn More"
      jiggle={true}
    ></ImageLeftTextRight>
  );
};

export default AboutSacbe;
