import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import homeUrl from "@/lib/constants/urls";
import { BlogPostType } from "@/types/blogPost";

import dynamic from "next/dynamic";

import { TestMarkdown } from "./MarkDown";

import { NewsletterSignup } from "../../recipes/[slug]/NewsletterSignup";
import { notFound } from "next/navigation";
import PurchaseOptions from "../../PurchaseOptions";

async function getPost(slug: string) {
  const request = await fetch(`${homeUrl}/api/blog/posts/${slug}`, {
    method: "GET",
    next: {
      tags: [slug],
    },
    cache: "no-cache",
  });
  if (request.status == 404) return {};
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

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    authors: {
      name: post.publisher?.name ?? "",
    },
    keywords: post.tags,
    publisher: "Sacbe Cacao",
    alternates: {
      canonical: `${homeUrl}/posts/${post.slug}`,
    },
    creator: "Sacbe Cacao",
    twitter: {
      card: "summary_large_image",
      description: post.excerpt,
      title: post.title,
      images: post.main_image,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${homeUrl}/posts/${post.slug}`,
      type: "article",
      images: [
        {
          url: post.main_image,
        },
      ],
      article: {
        authors: [post.publisher?.name ?? ""],
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

  const PostMetaData = dynamic(() =>
    import("./PostMetaData").then((mod) => mod.PostMetaData)
  );

  const { post, relatedPosts } = await getPost(params.slug as string);

  if (!post) return notFound();

  return (
    <main className="flex flex-row justify-center mx-3">
      <div className=" lg:w-8/12 my-10 m-auto ">
        <div className=" relative h-[500px] w-full shadow-xl rounded-lg">
          <Image
            src={post.main_image}
            fill
            alt={"blog header post "}
            className="rounded-lg object-cover "
            priority
          />
        </div>

        <h1 className="my-10 text-5xl md:text-8xl text-center">{post.title}</h1>

        <PostMetaData
          categories={post.categories}
          publisherName={post.publisher.name}
          tags={post.tags}
        />

        <div className=" my-10 md:p-10 lg:p-20">
          <TestMarkdown testContent={post.testContent} />

          <NewsletterSignup />

          <div className="my-20">
            <PurchaseOptions isHorizontal={true} compact={true} />
          </div>
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
