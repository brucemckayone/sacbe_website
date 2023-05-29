import React from "react";
import Categorychip from "@/components/blog/categorychips";

export function PostMetaData(props: {
  categories: string[];
  publisherName: string;
  tags: string[];
}) {
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-baseline">
        <div className="flex flex-row justify-start items-baseline flex-wrap">
          <h4 className="text-sm md:text-lg">Categories: </h4>
          {props.categories.map((cat) => {
            return <Categorychip title={cat} key={cat + "catchip"} />;
          })}
        </div>
        <h5 className="text-sm md:text-lg">{`Author: ${props.publisherName}`}</h5>
      </div>
      <div className=" w-11/12 m-auto h-0.5 bg-onPrimaryContainer opacity-25 my-3 rounded-lg " />
      <div className="flex flex-row justify-start items-baseline flex-wrap">
        <h4 className="text-sm md:text-lg">Tags:</h4>
        {props.tags.map((tag) => {
          return (
            <div
              className="center relative inline-block select-none whitespace-nowrap"
              key={`${tag} KEY`}
            >
              <p className="text-sm md:text-lg mx-1 bg-tertiaryContainer shadow rounded-md px-2">
                {tag.replaceAll(";", "")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
