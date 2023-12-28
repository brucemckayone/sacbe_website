import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MarkDown } from "./MarkDown.1";

export function CallToAction(props: {
  image?: string;
  text: string;
  link: string;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="w-11/12 md:w-1/2">
        {props.image && (
          <Image
            src={props.image}
            alt=" call to action image"
            width={500}
            height={500}
            className="rounded-lg drop-shadow-sm w-full h-1/2"
          />
        )}
      </div>
      <div className="w-[50px]" />
      <div className="w-11/12 md:w-1/2 ">
        <MarkDown content={props.text} />
        <div className="px-4 py-2 bg-transparent border-2 rounded-lg my-3 w-1/2">
          <Link href={props.link} className="no-underline">
            <p className="text-2xl no-underline text-center">Learn More</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
