import React from "react";

interface Props {
  text: string;
  onClick: () => void;
}

const SeconadaryButton: React.FC<Props> = ({ text }) => {
  return (
    <button className="text-onTertiary duration-500 bg-tertiary py-3 px-10 mx-10 my-3 rounded-3xl hover:bg-onTertiaryContainer hover:text-onPrimary">
      <p>{text}</p>
    </button>
  );
};

export default SeconadaryButton;
