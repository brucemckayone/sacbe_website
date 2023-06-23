import React from "react";
import Image from "next/image";
import Categorychip from "@/components/blog/categorychips";
import Link from "next/link";

import { BlogPostType } from "@/types/blogPost";

export function BlogPostSuggestionCard(props: { post: BlogPostType }) {
  return (
    <div className="py-5 border-b border-primaryContainer">
      <Link
        style={{
          textDecoration: "none",
        }}
        href={`posts/${props.post.slug}`}
      >
        <div
          className="flex flex-col md:flex-row rounded-lg   bg-surface duration-500 hover:rounded-lg hover:shadow-lg hover:border-none "
          key={props.post.title + "related posts"}
        >
          <div className="w-full h-[270px]  md:basis-3/12 relative mr-10  ">
            <Image
              src={props.post.main_image}
              fill
              className="object-cover rounded-lg"
              alt={`${props.post.title} main header image`}
            />
          </div>
          <div className="basis-9/12 p-5">
            <h3>{props.post.title}</h3>
            <p>{props.post.excerpt}</p>
            <div className="flex flex-row justify-start items-baseline flex-wrap">
              {props.post.categories.map((cat) => {
                return (
                  <Categorychip title={cat} key={"related cat chip" + cat} />
                );
              })}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
