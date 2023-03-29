"use client";
import React from "react";
interface Props {
  text: string;
  className?: string;
  onClicked: Function;
  isPrimary?: Boolean;
}

const SmallButton: React.FC<Props> = ({
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
      } py-1 px-3  my-2 rounded-md hover:bg-onPrimaryContainer hover:text-onPrimary border-2`}
    >
      <h4 className="uppercase text-lg">{text}</h4>
    </button>
  );
};

export default SmallButton;
