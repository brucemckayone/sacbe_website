import React from "react";
import Image from "next/image";

export function LargeImage(props: { image: string }) {
  return (
    <div className="relative w-full h-96 rounded-lg my-10">
      {" "}
      <Image
        src={props.image!}
        alt={"props.alt"}
        fill
        className="rounded-lg shadow-2xl"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
}
