import React from "react";
import Image from "next/image";

import { FeelsProgressBar } from "./FeelsProgressBar";
import Categorychip from "@/components/customer/blog/categorychips";
import Link from "next/link";
import { formatTitleForUrl } from "@/utils/url/formater";

export function RecipeCard(props: any) {
  return (
    <div className="border-b hover:bg-tertiaryContainer duration-500 hover:rounded-lg hover:shadow-lg hover:border-none ">
      <Link
        style={{
          textDecoration: "none",
        }}
        href={`recipes/${props.recipe.slug}`}
        key={props.recipe.title}
        className=""
      >
        <div>
          <div
            className="flex flex-col md:flex-row   "
            key={props.recipe.title + "related posts"}
          >
            <div className="max-w-full h-[270px] md:h-[500px] md:basis-3/12 relative my-2  md:mx-10">
              <Image
                src={props.recipe.main_image}
                fill
                className="object-cover rounded-lg"
                alt={`${props.recipe.title} main header image`}
              />
            </div>
            <div className="basis-9/12 ">
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
                    <div className=" px-2 mb-3 mt-4 md:mt-0" key={e.name}>
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
