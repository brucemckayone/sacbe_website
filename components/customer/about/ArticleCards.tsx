import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatTitleForUrl } from "@/utils/url/formater";
export function ArticleCards(props: { posts: any }) {
  return props.posts.map((post: any) => {
    return (
      <div
        className="max-w-sm bg-secondaryContainer m-5 rounded-xl shadow-sm shadow-onSurfaceVarient flex flex-col justify-between h-[580px]"
        key={"Blog slider on home page"}
      >
        <div>
          <Image
            src={post.main_image}
            alt="blog header image"
            width={500}
            height={500}
            className="rounded-xl h-64"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0"
          />
          <div className="p-5">
            <Link
              href={`/posts/${formatTitleForUrl(post.title)}`}
              className="no-underline"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white leading-snug">
                {post.title}
              </h5>
            </Link>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
              {post.excerpt}
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <Link
            href={`/posts/${formatTitleForUrl(post.title)}`}
            className="self-end m-2 bottom-0 inline-flex align-bottom px-3 py-2 w-32  font-medium text-center text-onTertiaryContainer hover:text-onTertiaryContainer duration-150 bg-tertiaryContainer rounded-lg hover:bg-sacbeBrandColor p-10 "
          >
            Read more
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2  mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  });
}
