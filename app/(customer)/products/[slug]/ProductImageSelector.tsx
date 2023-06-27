"use client";
import React from "react";
import Image from "next/image";

export function ProductImageSelector(props: { images: string[] }) {
  const images = props.images;
  const [currentImage, setCurrentImage] = React.useState(images[0]);

  return (
    <div className="md:px-24 pt-5">
      <Image
        src={currentImage}
        alt={""}
        width={1000}
        height={1000}
        className="drop-shadow-xl rounded-lg  object-cover"
      />
      <div className="flex flex-row justify-between">
        {images.map((image) => {
          return (
            <div
              key={image}
              className="relative flex flex-col mt-5"
              onClick={() => {
                setCurrentImage(image);
              }}
            >
              <Image
                src={image}
                alt={""}
                width={100}
                height={100}
                quality={2}
                className={`drop-shadow-lg rounded-2xl object-cover w-32 md:h-36 ${
                  currentImage === image
                    ? "border-2 border-sacbeBrandColor"
                    : ""
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
