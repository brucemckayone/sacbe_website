import React from "react";
import { ImageLeftTextRight } from "@/components/shared/body/ImageLeftTextRight";
import packingImage from "@/public/eco_packaging_box.png";

export function AboutPackaging() {
  return (
    <ImageLeftTextRight
      image={packingImage}
      text="  We believe in sustainable packaging and our 300g bags are made of
            Earth-friendly, fully recyclable materials. Our kraft paper pouches
            have labels printed using vegetable inks on recycled wood pulp."
      textHeaderLarge="We Love Mother Earth"
      textHeaderSmall="OUR PACKAGING:"
      title="Harmless By Default"
    />
  );
}
