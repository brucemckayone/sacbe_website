"use client";
import React, { ReactNode, useRef, useEffect } from "react";
import useOnScreen from "@/hooks/isOnScreen";

interface Props {
  children: ReactNode;
}
const SlideInUp: React.FC<Props> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  let hasEntered: Boolean = false;

  const isVisible = useOnScreen(ref);
  if (isVisible) {
    hasEntered = true;
  }

  return (
    <div
      ref={ref}
      className={`${hasEntered ? "animate-slide_in_up_fade" : "h-96"}`}
    >
      {isVisible && children}
    </div>
  );
};

export default SlideInUp;
