"use client";
import reviews from "@/lib/constants/reviews";
import { Carousel } from "@mantine/carousel";
import dynamic from "next/dynamic";

const SimpleSlider = () => {
  const FiveStars = dynamic(() =>
    import("../ratings/five_stars").then((res) => res.default)
  );

  return (
    <div className="bg-primaryContainer py-10 ">
      <Carousel
        height={380}
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
      >
        {reviews &&
          reviews.map((review) => {
            return (
              <Carousel.Slide key={review.review} className="self-center">
                <FiveStars />
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
