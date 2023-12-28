import cacaoFacilatorImage from "@/public/cacao-facilitator-training.png";
import { ImageLeftTextRight } from "@/components/shared/body/ImageLeftTextRight";

export function BecomeAPractioner() {
  return (
    <ImageLeftTextRight
      title="CACAO FACILITATION TRAINING"
      image={cacaoFacilatorImage}
      text="We welcome those wishing to work with cacao to join us in a 6-night immersive training in the wild depths of the Scottish Highlands where you will develop your skills as a space holder & guardian of cacao."
      textHeaderLarge="Become A Practitioner"
      textHeaderSmall="Cacao Facilitation Training"
      buttonLink="/facilitator-training"
      buttonText="Learn More"
    />
  );
}
