import React, { useState, MouseEvent } from "react";
import { SmallButtonLoader } from "../loaders/ButtonLoader";

interface Props {
  text: string;
  className?: string;
  onClicked: () => Promise<void> | void; // Allow any function returning Promise or void
  isPrimary?: boolean;
}

const SmallButton: React.FC<Props> = ({
  onClicked,
  className = "",
  isPrimary = true,
  text,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Promise.resolve(onClicked()); // Ensure onClick is treated as a Promise
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${className} small-button duration-500 ${
        isPrimary ? "bg-sacbeBrandColor" : ""
      } py-1 px-3 my-2 rounded-md hover:bg-onPrimaryContainer hover:text-onPrimary border-black border-2`}
    >
      {isLoading ? <SmallButtonLoader /> : text}
    </button>
  );
};

export default SmallButton;
