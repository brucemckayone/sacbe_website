"use client";
import React from "react";
interface Props {
  text: string;
  className?: string;
  onClicked: Function;
  isPrimary?: Boolean;
}

const PrimaryButton: React.FC<Props> = ({
  text,
  onClicked,
  className,
  isPrimary = true,
}) => {
  return (
    <button
      onClick={() => {
        onClicked();
      }}
      className={`${className} duration-500 ${
        isPrimary ? "bg-sacbeBrandColor" : ""
      } py-1 px-8  my-3 rounded-md hover:bg-onPrimaryContainer hover:text-onPrimary border-2`}
    >
      <h4 className="uppercase text-lg md:text-2xl ">{text}</h4>
    </button>
  );
};

export default PrimaryButton;
