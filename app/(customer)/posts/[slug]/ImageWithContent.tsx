import React from "react";
import Image from "next/image";
import { MarkDown } from "./MarkDown.1";

export function ImageWithContent(props: {
  image: string;
  content: string;
  isImageLeft?: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${
        !props.isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
      } justify-items-stretch  my-10`}
    >
      <div className="w-full md:w-1/2 flex flex-col ">
        <Image
          src={props.image}
          alt=""
          width={1000}
          height={1000}
          style={{ width: "100%", height: "100%" }}
          className="rounded-lg drop-shadow-sm h-fit object-cover"
        />
      </div>
      <div className="w-[50px]" />
      <div className="w-full md:w-1/2">
        <MarkDown content={props.content} />
      </div>
    </div>
  );
}
