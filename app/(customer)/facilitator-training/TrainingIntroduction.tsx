"use client";

import Image from "next/image";
import { useRef } from "react";
import { Carousel } from "@mantine/carousel";

import { BulletPoints } from "./BulletPoints";
import { TestimonialQuote } from "./TestimonialQuote";
import SmallButton from "@/components/shared/buttons/small_button";
import HostBioPopup from "./HostBioPopup";

export interface ISlide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  ref?: React.RefObject<HTMLDivElement>;
}

function IntroQuestions() {
  return (
    <div className=" border bg-white rounded-lg p-2 my-5">
      <ul className="list-disc ml-0 font-body space-y-2 text-gray-700">
        <li className="flex items-start ">
          <span className="mr-2">+</span>
          <p>
            Do you feel the call to create safe and informed healing spaces with
            master plant medicine Cacao?
          </p>
        </li>
        <li className="flex items-start">
          <span className="mr-2">+</span>
          <p>
            Do you feel moved to deepen your own relationship with Cacao and
            earth based practices?
          </p>
        </li>
        <li className="flex items-start">
          <span className="mr-2">+</span>
          <p>
            Do you feel motivated to lead with reciprocity and transparency in
            your offerings?
          </p>
        </li>
      </ul>
    </div>
  );
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
        The Heart of The Earth
      </h2>
      <div className="flex flex-col justify-center w-full m-auto md:w-6/12 md:mx-10 md:my-0">
        <h2 className="text-3xl md:text-4xl lg:text-5xl  hidden md:block">
          The Heart of The Earth
        </h2>
        <p className="mt-3">
          Join our founder Luzura Laguz Peralta this Spring to learn all the
          practicalities, tools and knowledge you need to start holding
          ceremonial journey’s with Cacao to bring healing and connection to
          your communities.
        </p>
        <p className="mt-3">
          We believe Cacao to be one of the medicines needed at this time of
          profound change on Earth. Becoming one who serves Cacao is one who is
          supporting the dream of the Earth; who deeply desires to heal. Help
          Cacao’s mission to guide humanity deeper into love and truth, so we
          may create what Charles Eistenstein said to be “the more beautiful
          world our hearts know is possible”.
        </p>
        <IntroQuestions />
        <TestimonialQuote quote="Luzura's passion and wisdom in the Cacao Facilitator Training truly illuminated the depth and cultural significance of ceremonial grade cacao." />
        <HostBioPopup />

        <div>
          <h5 className="mt-5 mb-2 text-lg md:text-xl lg:text-2xl">
            Key Highlights
          </h5>

          <BulletPoints
            bulletPoints={[
              {
                name: "Training Duration",
                effect:
                  "1 week (7 days, 6 nights) immersion held in Aberdeenshire, Scotland. Plus 3 months integration, which includes 3 x live group integration calls with Luzura.",
              },
              {
                name: "Indigenous Wisdom + Contemporary Animism",
                effect:
                  "Bridging ancient wisdom + traditional practices, into a contemporary modern world.",
              },
              {
                name: "Informed Guidance",
                effect:
                  "Led by a facilitator with 7 years experience working with Cacao, other plant medicines, and Mesoamerican shamanism. Two decades as a practitioner of various movement + somatic healing modalities. Educated in trauma resolution + nervous system health.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function TrainingIntroduction(props: {
  venueRef: React.MutableRefObject<null>;
  foodRef: React.MutableRefObject<null>;
  experianceRef: React.MutableRefObject<null>;
  trainingRef: React.MutableRefObject<null>;
  bookingRef: React.MutableRefObject<null>;
}) {
  const { venueRef, foodRef, experianceRef, trainingRef, bookingRef } = props;
  const slides: ISlide[] = [
    {
      image: "/training/venue/1.webp",
      title: "Sanctuary of Serenity",
      description:
        "Explore our exquisite villa amidst Aberdeenshire's tranquil beauty.",
      buttonText: "Discover Venue",
      buttonLink: "/training/venue",
      ref: venueRef,
    },
    {
      image: "/training/food/1.jpg",
      title: "Plant-based Catering",
      description:
        "Savor plant-based gourmet meals crafted for vitality and wellness.",
      buttonText: "Discover Catering",
      buttonLink: "/training/experiance",
      ref: foodRef,
    },
    {
      image: "/home_header/home_page_header_image_10.jpg",
      title: "Wisdom of Cacao",
      description: "Immerse in the sacred teachings and rituals of Cacao.",
      buttonText: "Discover Training",
      buttonLink: "/training/training",
      ref: trainingRef,
    },
    {
      image: "/home_header/home_page_header_image_8.jpg",
      title: "The Experience",
      description: "Learn about the experiance",
      buttonText: "Discover Experience",
      buttonLink: "/training/accommodations",
      ref: experianceRef,
    },
    {
      image: "/home_header/home_page_header_image_3.jpg",
      title: "Reserve Your Journey",
      description: "Begin the path to becoming a Cacao Facilitator – book now.",
      buttonText: "Invest Now",
      buttonLink: "/training/booking",
      ref: bookingRef,
    },
  ];
  return (
    <section className="mt-20 md:mt-36">
      <div className="mb-10 w-11/12 m-auto">
        <SmoothCarousel slides={slides} />
      </div>
      <IntroductionBody />
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

  function scrollToRef(ref: React.RefObject<HTMLDivElement>) {
    if (ref.current) {
      const top =
        ref.current.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }
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
            {!prop.hideButton && props.ref && (
              <SmallButton
                text={props.buttonText}
                isPrimary={false}
                className="text-onPrimaryContainer   bg-onPrimary/80"
                onClicked={() => {
                  scrollToRef(props.ref!);

                  // ad animation duration to the ref
                  props.ref?.current?.style.setProperty(
                    "transition-duration",
                    "2s"
                  );

                  //add boarder
                  if (props.title === "Plant-based Catering")
                    props.ref?.current?.style.setProperty(
                      "border",
                      "1px solid grey"
                    );

                  //scale by 5%
                  props.ref?.current?.style.setProperty(
                    "transform",
                    "scale(1.05)"
                  );

                  //rounde border radius

                  props.ref?.current?.style.setProperty(
                    "border-radius",
                    "1rem"
                  );

                  setTimeout(() => {
                    props.ref?.current?.style.setProperty(
                      "background-color",
                      "transparent"
                    );
                    props.ref?.current?.style.setProperty(
                      "transform",
                      "scale(1)"
                    );
                    props.ref?.current?.style.setProperty(
                      "border-radius",
                      "0rem"
                    );
                    props.ref?.current?.style.setProperty("border", "none");
                  }, 3000);
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
