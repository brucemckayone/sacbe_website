"use client";
import { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import FlavourCard from "../cards/flavourCard";
interface Props {
  flavours: Flavours[];
}
const FlavourSlider: React.FC<Props> = (flavours) => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  return (
    <Carousel
      withIndicators={false}
      height={300}
      draggable
      slideGap="md"
      loop
      align="start"
      slidesToScroll={1}
      breakpoints={[
        { maxWidth: "lg", slideSize: "33.333%" },
        { maxWidth: "xl", slideSize: "33.333%" },
        { maxWidth: "md", slideSize: "33.33%" },
        { maxWidth: "sm", slideSize: "33.333%" },
      ]}
      className=" my-10 flex-col justify-center w-full "
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <Carousel.Slide className="self-center">
        <FlavourCard
          flavourNames={["string one", "string 2"]}
          flavourTitle="Frugayity"
        />
      </Carousel.Slide>
      <Carousel.Slide className="self-center">
        <FlavourCard
          flavourNames={["string one", "string 2"]}
          flavourTitle="Frugayity"
        />
      </Carousel.Slide>
      <Carousel.Slide className="self-center">
        <FlavourCard
          flavourNames={["string one", "string 2"]}
          flavourTitle="Frugayity"
        />
      </Carousel.Slide>
    </Carousel>
  );
};
export default FlavourSlider;
