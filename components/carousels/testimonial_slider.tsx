"use client";
import { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Props {
  reviews: Review[];
}
const SimpleSlider: React.FC<Props> = ({ reviews }) => {
  return (
    <div className=" bg-primaryContainer py-52 ">
      <h1 className="text-center sm:text-4xl ">REVIEWS</h1>
      <Carousel
        height={200}
        draggable
        slideGap="md"
        loop
        slideSize={"33.333%"}
        breakpoints={[
          { maxWidth: "md", slideSize: "100%" },
          { maxWidth: "sm", slideSize: "100%" },
        ]}
        align="start"
        slidesToScroll={1}
        className="mx-0  flex-col justify-center"
        // plugins={[autoplay.current]}
        // onMouseEnter={autoplay.current.stop}
        // onMouseLeave={autoplay.current.reset}
      >
        {reviews &&
          reviews.map((review) => {
            return (
              <Carousel.Slide key={review.review} className="self-center">
                <h4 className="text-center mx-10">{review.title}</h4>
                <p className="text-center mx-16 ">{review.review}</p>
              </Carousel.Slide>
            );
          })}
      </Carousel>
    </div>
  );
};
export default SimpleSlider;
