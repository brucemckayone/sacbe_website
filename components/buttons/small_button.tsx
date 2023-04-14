"use client";
import Image from "next/image";
import React from "react";
interface Props {
  text: string;
  className?: string;
  onClicked: Function;
  isPrimary?: Boolean;
  imageUrl?: string;
}

const SmallButton: React.FC<Props> = ({
  text,
  onClicked,
  className,
  isPrimary = true,
  imageUrl = "",
}) => {
  return (
    <button
      onClick={() => {
        onClicked();
      }}
      className={`${className} duration-500 ${
        isPrimary ? "bg-sacbeBrandColor" : ""
      } py-1 px-3  my-2 rounded-md hover:bg-onPrimaryContainer hover:text-onPrimary border-2`}
    >
      <div className="flex flex-row justify-between">
        {imageUrl && (
          <Image
            src={imageUrl}
            width={30}
            height={30}
            alt={"button Icon"}
            className="mx-2"
          />
        )}
        <h4 className="uppercase text-lg">{text}</h4>
      </div>
    </button>
  );
};

export default SmallButton;
