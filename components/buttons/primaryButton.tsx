"use client";
import React from "react";
interface Props {
  text: string;
  url: string;
}

const PrimaryButton: React.FC<Props> = ({ text, url }) => {
  return (
    <button
      onClick={() => {
        window.open(url);
      }}
      className="duration-500 bg-sacbeBrandColor py-1 px-8  my-3 rounded-md hover:bg-onPrimaryContainer hover:text-onPrimary border-2"
    >
      <h4>{text}</h4>
    </button>
  );
};

export default PrimaryButton;
