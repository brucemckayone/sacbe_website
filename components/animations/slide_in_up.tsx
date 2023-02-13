"use client";
import React, { ReactNode, useRef, useEffect } from "react";
import useOnScreen from "@/hooks/isOnScreen";

interface Props {
  children: ReactNode;
}
const SlideInUp: React.FC<Props> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const isVisible = useOnScreen(ref);

  return (
    <div
      ref={ref}
      className={`${isVisible ? "animate-slide_in_up_fade" : "h-96"}`}
    >
      {isVisible && children}
    </div>
  );
};

export default SlideInUp;
