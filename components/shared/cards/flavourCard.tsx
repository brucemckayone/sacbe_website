import React from "react";
import Image from "next/image";
interface Props {
  flavourTitle: string;
  flavourNames: String[];
}

const FlavourCard: React.FC<Props> = ({ flavourNames, flavourTitle }) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative flex-col bg-recommendedGreen self-center rounded-full w-32 h-32 ">
        <Image
          src={"/we_love_mother_leaf.png"}
          fill
          className="self-center w-full p-3"
          alt=""
          style={{
            objectFit: "contain",
          }}
        ></Image>
      </div>
      <h4 className="text-center">{flavourTitle}</h4>
      <ul className="self-center">
        {flavourNames.map((name) => {
          return <li key={name + "key"}>{name}</li>;
        })}
      </ul>
    </div>
  );
};
export default FlavourCard;
