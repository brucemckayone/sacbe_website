import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { MarkDown } from "./MarkDown";
import { PostMetaData } from "./PostMetaData";
import { BlogPostSuggestionCard } from "./BlogPostSuggestionCard";
import homeUrl from "@/lib/constants/urls";
import { BlogPostType } from "@/types/blogPost";

async function getPost(title: string) {
  const request = await fetch(`${homeUrl}/api/blog/posts/${title}`, {
    method: "GET",
    next: {
      tags: [title], ///TODO: add revalidated webhook to call backs in sacbe admin
    },
  });

  return (await request.json()) as {
    post: BlogPostType;
    relatedPosts: BlogPostType[];
  };
}

// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string; title: string };
// }): Promise<Metadata> {
//   const { post, relatedPosts } = await getPost(params.title!);
//   return {
//     title: post.title.replaceAll("-", " "),
//     description: post.excerpt,
//     authors: {
//       name: post.publisher.name,
//     },
//     keywords: post.tags,
//     publisher: "Sacbe Cacao",
//     alternates: {
//       canonical: `${homeUrl}/posts/${post.title.replaceAll(" ", "-")}`,
//     },
//     creator: "Sacbe Cacao",
//     openGraph: {
//       title: post.title.replaceAll("-", " "),
//       description: post.excerpt,
//       url: `${homeUrl}/posts/${post.title.replaceAll(" ", "-")}`,
//       type: "article",
//       article: {
//         // publishedTime:data.dateCreated,
//         // modifiedTime: data.lastUpdated),
//         authors: [post.publisher.name],
//         tags: post.tags,
//       },
//     },
//   } as Metadata;
// }

export default async function Page({
  params,
}: {
  params: { id: string; title: string; postId: string };
}) {
  const { post, relatedPosts } = await getPost(params.title!);

  return (
    <main className="flex flex-row justify-center mx-3">
      <div className=" sm:mx-3 md:w-8/12 my-10 m-auto ">
        <div className=" relative h-[500px] w-full px-5 shadow-xl">
          <Image
            src={post.main_image}
            fill
            alt={"blog header post "}
            className="rounded-lg object-cover mx-1 "
          />
        </div>

        <h1 className="my-10 text-5xl md:text-8xl text-center">{post.title}</h1>

        <PostMetaData
          categories={post.categories}
          publisherName={post.publisher.name}
          tags={post.tags}
        />

        <div className=" px-5  my-10 md:p-20">
          <MarkDown content={post.content} />

          {relatedPosts != undefined && (
            <div className="my-20">
              <h2 className="text-2xl md:text-7xl">Related Articles</h2>
              {relatedPosts.map((relatedPosts) => {
                return (
                  <BlogPostSuggestionCard
                    post={relatedPosts}
                    key={relatedPosts.title + "aeroijaregoi"}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
