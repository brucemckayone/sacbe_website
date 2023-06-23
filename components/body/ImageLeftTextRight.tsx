import React from "react";
import Image from "next/image";
import SlideInUp from "../animations/slide_in_up";
import LinkButton from "../buttons/LinkButton";
import dynamic from "next/dynamic";

interface IImageLeftTextRight {
  title: string;
  image: string;

  textHeaderSmall: string;
  textHeaderLarge: string;
  text: string;
  buttonLink?: string;
  buttonText?: string;

  jiggle?: boolean;
}
export function ImageLeftTextRight({
  title,
  image,

  text,
  textHeaderLarge,
  textHeaderSmall,
  buttonLink,
  buttonText,

  jiggle,
}: IImageLeftTextRight): JSX.Element {
  const Card = dynamic(() =>
    import("../cards/card").then((res) => res.default)
  );

  return (
    <div className="bg-tertiaryContainer pb-28">
      <h2 className="py-20 mx-5 md:mx-10 text-center text-7xl lg:text-8xl md:text-7xl">
        {title}
      </h2>

      <div className="flex flex-col justify-center align-middle">
        <div className="flex flex-col md:flex-row">
          <Card className="flex basis-1/2" hasColor={false}>
            <div className="absolute w-11/12 md:w-4/12 p-40 bg-primaryContainer rounded-full h-[500px] blur-md"></div>
            <SlideInUp animiation="animate-zoom_in_fade">
              <div className="relative w-full p-40 h-[500px]  ">
                <div
                  className={`absolute top-10 right-0 left-0 w-full h-[400px]`}
                >
                  <Image
                    src={image}
                    fill
                    alt=" Floating cacao pod image"
                    className={
                      jiggle
                        ? "animate-float z-10 object-contain "
                        : " object-contain z-10"
                    }
                  />
                </div>
              </div>
            </SlideInUp>
          </Card>
          <Card
            className="basis-2/5 flex flex-col justify-center items-center align-middle"
            hasColor={false}
          >
            <div className="basis-1/2">
              <h5 className="flex md:w-1/2 underline">{textHeaderSmall}</h5>

              <h3 className="flex md:w-3/4"> {textHeaderLarge}</h3>

              <SlideInUp animiation="animate-slide_in_left_blur">
                <p className="flex md:w-3/4 text-xl">{text}</p>
              </SlideInUp>
              {buttonLink && buttonText && (
                <SlideInUp animiation="animate-slide_in_left_blur">
                  <LinkButton
                    url={buttonLink}
                    isPrimary={false}
                    text={buttonText}
                  ></LinkButton>
                </SlideInUp>
              )}
            </div>
          </Card>
        </div>
      </div>
      {/* </SlideInUp> */}
    </div>
  );
}
