import { ClassNames } from "@emotion/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  hasColor?: boolean;
  className?: string | undefined;
}

const Card: React.FC<Props> = ({ children, hasColor = true, className }) => {
  return (
    <div
      className={` ${className}   lg:m-5 p-5 flex-1 justify-center ${
        hasColor && "bg-tertiaryContainer rounded-md border-2"
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
