import Image, { StaticImageData } from "next/image";
import LinkButton from "../buttons/LinkButton";
import Card from "../cards/card";

interface IImageLeftTextRight {
  title: string;
  image: StaticImageData;
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
  return (
    <div className="bg-tertiaryContainer pb-28">
      <TitleComponent title={title} />
      <div className="flex flex-col md:flex-row">
        <ImageComponent image={image} jiggle={jiggle} />
        <TextComponent
          bodyText={text}
          textHeaderLarge={textHeaderLarge}
          textHeaderSmall={textHeaderSmall}
          buttonLink={buttonLink}
          buttonText={buttonText}
        />
      </div>
    </div>
  );
}

function TextComponent(props: {
  textHeaderSmall: string;
  textHeaderLarge: string;
  buttonLink?: string;
  buttonText?: string;
  bodyText: string;
}) {
  return (
    <Card
      className="basis-2/5 flex flex-col justify-center items-center align-middle"
      hasColor={false}
    >
      <div className="basis-1/2">
        <h5 className="flex md:w-1/2 underline">{props.textHeaderSmall}</h5>
        <h3 className="flex md:w-3/4"> {props.textHeaderLarge}</h3>
        <p className="flex md:w-3/4 text-xl">{props.bodyText}</p>
        {props.buttonLink && props.buttonText && (
          <LinkButton
            url={props.buttonLink}
            isPrimary={false}
            text={props.buttonText}
          />
        )}
      </div>
    </Card>
  );
}

function ImageComponent(props: { image: StaticImageData; jiggle?: boolean }) {
  return (
    <Card className="flex basis-1/2" hasColor={false}>
      <div className="absolute w-11/12 md:w-4/12 p-40 bg-primaryContainer b rounded-full h-[500px] blur-md"></div>
      <div className="relative w-full p-40 h-[500px] ">
        <Image
          src={props.image}
          fill
          alt=" Floating cacao pod image"
          className={" object-contain  z-10 text-black"}
        />
      </div>
    </Card>
  );
}

function TitleComponent(props: { title: string }) {
  return (
    <h2 className="py-20 mx-5 md:mx-10 text-center text-5xl lg:text-8xl md:text-7xl">
      {props.title}
    </h2>
  );
}
