import React from "react";
import { ImageLeftTextRight } from "./ImageLeftTextRight";

const AboutSacbe: React.FC = () => {
  return (
    <ImageLeftTextRight
      title="OUR JOURNEY"
      image="/cacao_pod_floating.png"
      text="'Sacbe' in Yucatec Maya translates to 'white road' or 'white path'. A word used to describe the limestone covered pathways laid to connect ancient Mayan temples and additional sacred sites visited for worship, ceremony and ritual. Within these spaces Cacao elixirs were consumed, and Cacao beans offered to altars and fires with prayer to bless their inner and outer journeys with heart-led intention."
      textHeaderLarge="Small-scale, Family Owned Farmers Cooperatives"
      textHeaderSmall="Our Humble Origins"
      buttonLink="\about"
      buttonText="Learn More"
      jiggle={true}
    />
  );
};

export default AboutSacbe;
