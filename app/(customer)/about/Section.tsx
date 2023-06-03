import React from "react";
import Image from "next/image";

export interface sectionProps {
  subHeader: string;
  header: string;
  paragraph: string;
  imageUrl?: string;
  reversed?: boolean;
}
export const Section = ({
  header,
  imageUrl,
  paragraph,
  subHeader,
  reversed,
}: sectionProps) => (
  <div
    className={`my-20 flex flex-col ${
      reversed ? "md:flex-row-reverse" : "md:flex-row"
    } justify-center `}
  >
    {imageUrl && (
      <Image
        src={imageUrl}
        height={500}
        width={500}
        alt="paragraph image header"
        className="rounded-lg text-center my-3"
        style={{ objectFit: "cover" }}
      />
    )}
    <div className={`basis-1/2 ${!reversed && "md:ml-12"} mr-8 flex-col`}>
      <h5 className=" text-3xl underline">{subHeader}</h5>
      <h3 className=" text-5xl mb-5">{header}</h3>
      <p className="text-xl ">{paragraph}</p>
    </div>
  </div>
);
