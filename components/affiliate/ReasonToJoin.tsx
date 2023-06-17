import React from "react";
import Image from "next/image";
import SlideInUp from "@/components/animations/slide_in_up";

export function ReasonToJoin({
  imageUrl,
  header,
  body,
}: {
  header: string;
  imageUrl: string;
  body: string;
}) {
  return (
    <SlideInUp animiation="animate-zoom_in">
      <div className="flex flex-col md:flex-row my-20  rounded-lg ">
        <div className="flex">
          <Image
            src={imageUrl}
            width={400}
            height={500}
            alt={" holding hands"}
            className=" bg-primaryContainer rounded-3xl  object-cover shadow"
          />
        </div>
        <div className="md:m-5 w-full md:w-8/12">
          <h3 className="text-5xl md:text-start mt-5">{header}</h3>
          <p className="mx-2 mt-5">{body}</p>
        </div>
      </div>
    </SlideInUp>
  );
}
