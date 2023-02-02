import React from "react";

interface Props {
  text: string;
  onClick: () => void;
}

const PrimaryButton: React.FC<Props> = ({ text }) => {
  return (
    <button className="duration-500 bg-sacbeBrandColor py-1 px-8 mx-10 my-3 rounded-md hover:bg-onPrimaryContainer hover:text-onPrimary">
      <h4>{text}</h4>
    </button>
  );
};

export default PrimaryButton;
