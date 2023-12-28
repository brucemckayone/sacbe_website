import React from "react";
import SlideInUp from "@/components/animations/slide_in_up";

export default function TextSection({
  body,
  smallHeader,
  largeHeader,
}: {
  body: string;
  smallHeader: string;
  largeHeader: string;
}) {
  return (
    <SlideInUp animiation="animate-slide_in_left_fade">
      <h5 className=" text-2xl underline">{smallHeader}</h5>
      <h3 className=" text-4xl mb-5">{largeHeader}</h3>
      <p className="text-xl">{body}</p>
    </SlideInUp>
  );
}
