import React from "react";
import Image from "next/image";
import SlideInUp from "../animations/slide_in_up";

interface Props {
  imagePath: string;
  headerText: string;
  text: string;
  className?: string;
}
const BenifitsCard: React.FC<Props> = ({
  imagePath,
  text,
  headerText,
  className,
}) => {
  return (
    <SlideInUp animiation="animate-zoom_in_fade">
      <div
        className={`${className} flex flex-row m-1 border-2 rounded-md group`}
      >
        <div>
          <Image
            src={imagePath}
            width={100}
            height={100}
            alt=""
            className="basis-1/4 bg-primaryContainer p-2 rounded-tl-md rounded-bl-md group-hover:bg-tertiaryContainer duration-300 "
          ></Image>
        </div>
        <div className="basis-3/4 bg-tertiaryContainer p-1 rounded-tr-md rounded-br-md grow group-hover:bg-onPrimary duration-300 ">
          <h4 className="text-xl md:text-lg lg:text-xl">
            <strong>{headerText}</strong>
          </h4>
          <p>{text}</p>
        </div>
      </div>
    </SlideInUp>
  );
};
export default BenifitsCard;
