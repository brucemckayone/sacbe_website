import React from "react";
import Image from "next/image";
import { formatTitleForUrl } from "../../posts/[title]/formatTitleForFetch";
import { FeelsProgressBar } from "./FeelsProgressBar";
import Categorychip from "@/components/blog/categorychips";
import Link from "next/link";

export function RecipeCard(props: any) {
  return (
    <div className="drop-shadow-lg bg-surface duration-500 rounded-lg hover:shadow-lg hover:border-none ">
      <Link
        style={{
          textDecoration: "none",
        }}
        href={`recipes/${formatTitleForUrl(props.recipe.title)}`}
        key={props.recipe.title}
        className=""
      >
        <div className="">
          <div
            className="flex flex-col  justify-between md:flex-row my-10  "
            key={props.recipe.title + "related posts"}
          >
            <div className="w-full h-[300px] md:h-[530px] md:basis-3/12 relative mr-10">
              <Image
                src={props.recipe.main_image}
                fill
                className="object-cover rounded-lg"
                alt={`${props.recipe.title} main header image`}
              />
            </div>
            <div className="basis-9/12 p-5">
              <h3>{props.recipe.title}</h3>
              <p>{props.recipe.excerpt}</p>
              <div className="flex flex-row justify-start items-baseline flex-wrap">
                {props.recipe.categories.map((cat: string) => {
                  return (
                    <Categorychip title={cat} key={"related cat chip" + cat} />
                  );
                })}
              </div>
              <div>
                {props.recipe.feels.map((e: any) => {
                  return (
                    <div
                      className=" px-2 mb-3 mt-4 md:mt-0"
                      key={`${e.name} + ${e.percentage}`}
                    >
                      <p>{e.name}</p>
                      <FeelsProgressBar
                        percentage={e.percentage}
                      ></FeelsProgressBar>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
