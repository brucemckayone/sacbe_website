"use client";
import reviews from "@/lib/constants/reviews";
import { Carousel } from "@mantine/carousel";
import dynamic from "next/dynamic";

const SimpleSlider = () => {
  const FiveStars = dynamic(() =>
    import("../../customer/ratings/five_stars").then((res) => res.default)
  );

  return (
    <Carousel
      draggable
      loop
      breakpoints={[
        { maxWidth: 640, slideSize: "100%" },
        { maxWidth: 1024, slideSize: "100%" },
      ]}
      slidesToScroll={1}
    >
      <Carousel.Slide key={"tesves"} className="self-center px-3 md:px-10">
        <div className="w-11/12 md:w-9/12 m-auto bg-tertiaryContainer/60 border border-black p-2 md:p-10 rounded-3xl my-10 py-5">
          <h3 className="mb-2 text-3xl ">Our customers said it best:</h3>
          <blockquote className="text-md md:text-md">
            WOWWWZZAAAA!!!! Now, I have tried a few different Cacao’s but I have
            to say that SACBE is my new absolute fave! The texture & taste is
            soooo smooth, it foams up beautifully in a blender. The taste is
            rich but not too bitter. But the thing that got me the most was the
            sensations it gave me! Mind blowing visuals throughout the ceremony,
            I felt so deeply connected with my heart centre and Third eye. Lot’s
            of colours and pleasant tingles, you really can tell its made with
            love. This is some potent Cacao! It set me up amazingly for the day
            ahead, I just felt so energised and full of love & compassion.
            Honestly if I could give it more than 5 stars I would! Thank you for
            introducing such a wonderful product. I can’t wait to continue using
            it on my healing journey
            <p className="text-end">- Mathilda Heenehan</p>
            <div className="flex">
              <FiveStars />
            </div>
          </blockquote>
        </div>
      </Carousel.Slide>
      {reviews &&
        reviews.map((review) => {
          return (
            <Carousel.Slide
              key={review.review}
              className="self-center px-3 md:px-10"
            >
              <div className="w-11/12 md:w-9/12 m-auto bg-tertiaryContainer/60 border p-2 md:p-10 rounded-3xl my-10 py-5">
                <h5 className="mb-2">{review.reviewTitle}</h5>
                <blockquote className="text-md md:text-md">
                  {review.review}
                  <p className="text-end">- {review.title}</p>
                  <div className="flex flex-row justify-end">
                    <FiveStars />
                  </div>
                </blockquote>
              </div>
            </Carousel.Slide>
          );
        })}
    </Carousel>
  );
};
export default SimpleSlider;
