import React from "react";
import { ImageLeftTextRight } from "./ImageLeftTextRight";

const AboutSacbe: React.FC = () => {
  return (
    <ImageLeftTextRight
      title="OUR JOURNEY"
      image="/cacao_pod_floating.png"
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
    />
  );
};

export default AboutSacbe;
