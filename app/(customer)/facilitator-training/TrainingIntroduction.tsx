"use client";

import Image from "next/image";
import { useRef } from "react";
import { Carousel } from "@mantine/carousel";

import { BulletPoints } from "./BulletPoints";
import { TestimonialQuote } from "./TestimonialQuote";
import SmallButton from "@/components/shared/buttons/small_button";

export interface ISlide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  offset?: number;
}

function IntroductionBody() {
  return (
    <div className="w-11/12 m-auto my-10 md:my-36 py-10 md:px-2 justify-between flex flex-col md:flex-row-reverse  md:bg-secondaryContainer/30 md:shadow md:rounded-3xl">
      <div className="w-full md:w-6/12 md:mr-10 ">
        <Image
          src={"/home_header/home_page_header_image_10.jpg"}
          height={500}
          width={500}
          alt={" An image of a person working with cacao"}
          className="rounded-lg object-cover w-full h-full"
        ></Image>
      </div>
      <h2 className="text-3xl md:text-4xl mt-5 lg:text-5xl visible md:hidden">
        Cultivate Your Spirit - Overview
      </h2>
      <div className="flex flex-col justify-center w-11/12 md:w-6/12 md:mx-10 md:my-0">
        <h2 className="text-3xl md:text-4xl lg:text-5xl  hidden md:block">
          Cultivate Your Spirit - Overview
        </h2>
        <p
          className="text-base md:text-lg lg:text-xl"
          style={{ overflowWrap: "break-word" }}
        >
          Step into a world where ancient tradition meets contemporary wisdom in
          the beautiful setting of Aberdeenshire, Scotland. Our Sacbe Cacao
          Facilitator Training offers a unique blend of immersive learning and
          spiritual growth, guided by experts in the field.
        </p>
        <TestimonialQuote quote="Luzura's passion and wisdom in the Cacao Facilitator Training truly illuminated the depth and cultural significance of ceremonial grade cacao." />
        <div>
          <h5 className="mt-5 mb-2 text-lg md:text-xl lg:text-2xl">
            Key Highlights
          </h5>
          <BulletPoints
            bulletPoints={[
              {
                name: "Training Duration",
                effect:
                  "Deeply immersive 7-day training experience in Aberdeenshire, Scotland.",
              },
              {
                name: "Cacao Wisdom",
                effect:
                  "A blend of ancient cacao wisdom and contemporary practices.",
              },
              {
                name: "Expert Guidance",
                effect:
                  "Led by an experienced practitioner with profound insights into cacao's sacred journey.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
const slides: ISlide[] = [
  {
    image: "/training/venue/1.webp",
    title: "Sanctuary of Serenity",
    description:
      "Explore our exquisite villa amidst Aberdeenshire's tranquil beauty.",
    buttonText: "Discover Venue",
    buttonLink: "/training/venue",
    offset: 600,
  },
  {
    image: "/training/food/1.jpg",
    title: "Gastronomic Delights",
    description:
      "Savor plant-based gourmet meals crafted for vitality and wellness.",
    buttonText: "Discover The Experience",
    buttonLink: "/training/experiance",
    offset: 1200,
  },
  {
    image: "/home_header/home_page_header_image_10.jpg",
    title: "Wisdom of Cacao",
    description: "Immerse in the sacred teachings and rituals of Cacao.",
    buttonText: "Discover Training",
    buttonLink: "/training/training",
    offset: 2200,
  },
  {
    image: "/home_header/home_page_header_image_8.jpg",
    title: "Restful Havens",
    description:
      "Unwind in comfort with our thoughtfully appointed accommodations.",
    buttonText: "Discover Accommodations",
    buttonLink: "/training/accommodations",
    offset: 1200,
  },
  {
    image: "/home_header/home_page_header_image_3.jpg",
    title: "Reserve Your Journey",
    description: "Begin the path to becoming a Cacao Facilitator – book now.",
    buttonText: "Discover Booking",
    buttonLink: "/training/booking",
    offset: 4000,
  },
  {
    image: "/home_header/home_page_header_image_4.jpg",
    title: "Voices of Transformation",
    description:
      "Hear from those who've been transformed by our Cacao Training.",
    buttonText: "Discover Testimonials",
    buttonLink: "/training/testimonials",
    offset: 600,
  },
];

function TrainingIntroduction() {
  return (
    <section className="my-20 md:my-36">
      <IntroductionBody />
      <div className="my-10 w-11/12 m-auto">
        <SmoothCarousel slides={slides} />
      </div>
    </section>
  );
}

export function SmoothCarousel(props: {
  slides: ISlide[];
  hideButton?: boolean;
}) {
  return (
    <Carousel
      dragFree
      breakpoints={[
        { maxWidth: 640, slideSize: "80%" },
        { maxWidth: 1024, slideSize: "50%" },
        { maxWidth: 1324, slideSize: "50%" },
        { maxWidth: 2000, slideSize: "50%" },
      ]}
      slideGap="md"
      height={350}
      initialSlide={1}
      className="w-full rounded-xl overflow-hidden"
      withIndicators={false}
      withControls={false}
    >
      {props.slides.map((slide) => {
        return (
          <CarouselCard
            key={slide.description}
            slide={slide}
            hideButton={props.hideButton}
          />
        );
      })}
    </Carousel>
  );
}

function CarouselCard(prop: {
  slide: ISlide;
  hideButton?: boolean;
  scrollToRef?: HTMLDivElement;
}) {
  const props = prop.slide;
  const ref = useRef<HTMLDivElement>(null);

  function calcOffset(offset: number) {
    if (window.innerWidth > 1024) return offset + 400;
    return offset + 100;
  }
  const scrollToRef = (offset: number) => {
    if (ref.current) {
      window.scrollBy({ top: calcOffset(offset), behavior: "smooth" });
    }
  };

  return (
    <Carousel.Slide>
      <div className="w-full m-auto rounded-xl overflow-hidden" ref={ref}>
        <div className="relative">
          <Image
            src={props.image}
            alt={"An image of the cacao training in scotland"}
            width={1200}
            height={800}
            className="object-cover rounded-xl h-[350px] "
          />
          <div
            className="absolute bottom-0 h-1/2 w-full flex flex-col items-start  justify-end bg-gradient-to-b from-transparent to-onSecondaryContainer p-2"
            style={{ backgroundPosition: "bottom 50%" }}
          >
            <h5 className="text-onPrimary">{props.title}</h5>
            <p className="text-onPrimary md:w-5/12 text-sm">
              {props.description}
            </p>
            {!prop.hideButton && props.offset && (
              <SmallButton
                text={props.buttonText}
                isPrimary={false}
                className="text-onPrimaryContainer  bg-onPrimary/80"
                onClicked={() => {
                  scrollToRef(props.offset!);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Carousel.Slide>
  );
}

export default TrainingIntroduction;
