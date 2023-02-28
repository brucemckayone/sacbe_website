"use client";
import React, { ReactNode, useRef } from "react";
import useOnScreen from "@/hooks/isOnScreen";

interface Props {
  children: ReactNode;
  animiation:
    | "animate-zoom_in_fade"
    | "animate-slide_in_left_fade"
    | "animate-zoom_in"
    | "animate-float"
    | "animate-slide_in_right_fade"
    | "animate-slide_in_left_blur";
}
const SlideInUp: React.FC<Props> = ({ children, animiation }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  return (
    <div ref={ref} className={`${isVisible ? animiation : "opacity-0"}`}>
      {children}
    </div>
  );
};

export default SlideInUp;
