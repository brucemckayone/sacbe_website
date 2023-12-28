import React from "react";
import Image from "next/image";
import SlideInUp from "../../animations/slide_in_up";

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
        className={`${className} flex flex-row md:h-[100px] border-black border-2 rounded-md group`}
      >
        <Image
          src={imagePath}
          width={70}
          height={70}
          alt="Cups full of cacaow"
          className="basis-1/4 h-20 w-20 md:h-[95px] bg-primaryContainer p-2 rounded-tl-md rounded-bl-md group-hover:bg-tertiaryContainer duration-300"
        />

        <div className="basis-3/4 bg-tertiaryContainer p-1 rounded-tr-md rounded-br-md grow group-hover:bg-onPrimary duration-300 ">
          <h4>
            <strong className="text-2xl md:text-sm lg:text-xl xl:text-2xl">
              {headerText}
            </strong>
          </h4>
          <p className="text-sm md:text-sm lg:text-sm xl:text-lg leading-tight">
            {text}
          </p>
        </div>
      </div>
    </SlideInUp>
  );
};
export default BenifitsCard;
