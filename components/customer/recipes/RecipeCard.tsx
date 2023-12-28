import React from "react";
import Image from "next/image";
import { FeelsProgressBar } from "./FeelsProgressBar";
import Categorychip from "@/components/customer/blog/categorychips";
import Link from "next/link";
import { AffiliateCopyLinkButton } from "./AffiliateCopyLinkButton";

export function RecipeCard(props: any) {
  return (
    <div className="py-5 border-primaryContainer border-b">
      <div className="drop-shadow-lg bg-surface duration-500 rounded-lg hover:shadow-lg ">
        <div>
          <div
            className="flex flex-col justify-between md:flex-row  "
            key={props.recipe.title + "related posts"}
          >
            <Image
              src={props.recipe.main_image}
              width={300}
              height={300}
              className="object-cover w-full rounded-lg "
              alt={`${props.recipe.title} main header image`}
            />

            <div className="basis-9/12 p-5">
              <Link
                style={{
                  textDecoration: "none",
                }}
                href={`/recipes/${props.recipe.slug}`}
                key={props.recipe.title}
              >
                <h3>{props.recipe.title}</h3>
              </Link>
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
                      <FeelsProgressBar percentage={e.percentage} />
                    </div>
                  );
                })}
              </div>
              <AffiliateCopyLinkButton url={`/recipes/${props.recipe.slug}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
