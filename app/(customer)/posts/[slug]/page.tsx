import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import homeUrl from "@/lib/constants/urls";
import { BlogPostType } from "@/types/blogPost";

import dynamic from "next/dynamic";

import { PostMetaData } from "./PostMetaData";
import { MarkDown } from "./MarkDown";
import { BlogPostSuggestionCard } from "./BlogPostSuggestionCard";
import { NewsletterSignup } from "../../recipes/[slug]/NewsletterSignup";

async function getPost(slug: string) {
  console.log("slug is here: " + slug);
  const request = await fetch(`${homeUrl}/api/blog/posts/${slug}`, {
    method: "GET",
    next: {
      tags: [slug],
    },
    cache: "no-cache",
  });
  return await request.json();
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const { post, relatedPosts } = await getPost(params.slug as string);
  return {
    title: post.title,
    description: post.excerpt,
    authors: {
      name: post.publisher.name,
    },
    keywords: post.tags,
    publisher: "Sacbe Cacao",
    alternates: {
      canonical: `${homeUrl}/posts/${post.title.replaceAll(" ", "-")}`,
    },
    creator: "Sacbe Cacao",
    twitter: {
      card: "summary_large_image",
      description: post.excerpt,
      title: post.title.replaceAll("-", " "),
    },
    openGraph: {
      title: post.title.replaceAll("-", " "),
      description: post.excerpt,
      url: `${homeUrl}/posts/${post.title.replaceAll(" ", "-")}`,
      type: "article",
      article: {
        authors: [post.publisher.name],
        tags: post.tags,
      },
    },
  } as Metadata;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const BlogPostSuggestionCard = dynamic(() =>
    import("./BlogPostSuggestionCard").then((mod) => mod.BlogPostSuggestionCard)
  );

  const MarkDown = dynamic(() =>
    import("./MarkDown").then((mod) => mod.MarkDown)
  );

  const PostMetaData = dynamic(() =>
    import("./PostMetaData").then((mod) => mod.PostMetaData)
  );

  const { post, relatedPosts } = await getPost(params.slug as string);

  console.log("post type is: " + typeof post);
  console.log("related type is: " + typeof relatedPosts);

  return (
    <main className="flex flex-row justify-center mx-3">
      <div className=" sm:mx-3 md:w-8/12 my-10 m-auto ">
        <div className=" relative h-[500px] w-full px-5 shadow-xl">
          <Image
            src={post.main_image}
            fill
            alt={"blog header post "}
            className="rounded-lg object-cover mx-1 "
            blurDataURL="LAM6Lo4m00?c0MNOVE4;00cG*0wq"
            placeholder="blur"
            priority
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
          <NewsletterSignup />
          {relatedPosts != undefined && (
            <div className="my-20">
              <h2 className="text-2xl md:text-7xl">Related Articles</h2>
              {relatedPosts.map((relatedPosts: BlogPostType) => (
                <BlogPostSuggestionCard
                  post={relatedPosts}
                  key={relatedPosts.slug + "related posts"}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
