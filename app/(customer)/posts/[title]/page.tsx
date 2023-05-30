import React from "react";
import Image from "next/image";

import { firestore } from "firebase-admin";

import adminInit from "@/utils/firebase/admin_init";
import { Metadata } from "next";
import { DocumentReference } from "@firebase/firestore";

import console, { log } from "console";
import { formatTitleForFetch } from "./formatTitleForFetch";
import { MarkDown } from "./MarkDown";
import { PostMetaData } from "./PostMetaData";
import { BlogPostSuggestionCard } from "./BlogPostSuggestionCard";

// or Dynamic metadata

async function getRelatedPosts(relatedPosts: DocumentReference[]) {
  adminInit();
  const db = firestore();
  const snapshot = await db
    .collection("blog_posts")
    .where(
      firestore.FieldPath.documentId(),
      "in",
      relatedPosts.map((e) => e.id)
    )
    .get();
  const posts = snapshot.docs.map((e) => e.data());
  return posts;
}

async function getPost(title: string) {
  adminInit();
  try {
    const snapshots = await firestore()
      .collection("blog_posts")
      .where("title", "==", formatTitleForFetch(title))
      .get();
    const data = snapshots.docs[0].data();
    console.log(data);
    return data;
  } catch (e) {
    return undefined;
  }
}

export type blogPostType = {
  content: string;
  title: string;
  readingTime: string;
  main_image: string;
  tags: string[];
  categories: string[];
  excerpt: string;
  related_posts: DocumentReference[];
  publisher: { name: string };
};

export async function generateMetadata({
  params,
}: {
  params: { id: string; title: string };
}) {
  const data = (await getPost(params.title!)) as blogPostType;
  return {
    title: data.title.replaceAll("-", " "),
    description: data.excerpt,
    abstract: data.excerpt,
    category: data.categories[0],
    robots: "index",
    publisher: "Sacbe Ceremonial Cacao",
    openGraph: {
      images: [data.main_image],
      title: data.title,
      description: data.excerpt,
      type: "article",
      tags: data.tags,
      siteName: "Sacbe Ceremonial Cacao",
      countryName: "UK",
    },
    twitter: {
      images: data.main_image,
      site: "https://sacbe-ceremonial-cacao.com",
      title: data.title,
      description: data.excerpt,
    },
    applicationName: "Sacbe Ceremonial Cacao",
    authors: "Luzura Peralta",

    colorScheme: "light",
  } as Metadata;
}
export default async function Page({
  params,
}: {
  params: { id: string; title: string };
}) {
  const data = (await getPost(params.title!)) as blogPostType;

  if (data == undefined) {
    return <></>;
  } else {
    const relatedPosts = (await getRelatedPosts(
      data.related_posts
    )) as blogPostType[];

    return (
      <main className="flex flex-row justify-center mx-3">
        <div className=" sm:mx-3 md:w-8/12 my-10 m-auto ">
          <div className=" relative h-[500px] w-full px-5 shadow-xl">
            <Image
              src={data.main_image}
              fill
              alt={"blog header post "}
              className="rounded-lg object-cover mx-1 "
            />
          </div>

          <h1 className="my-10 text-5xl md:text-8xl text-center">
            {data.title}
          </h1>

          <PostMetaData
            categories={data.categories}
            publisherName={data.publisher.name}
            tags={data.tags}
          />

          <div className=" px-5  my-10 md:p-20">
            <MarkDown content={data.content} />

            {relatedPosts != undefined && (
              <div className="my-20">
                <h2 className="text-2xl md:text-7xl">Related Articles</h2>
                {relatedPosts.map((post) => {
                  return (
                    <BlogPostSuggestionCard
                      post={post}
                      key={post.title + "aeroijaregoi"}
                    ></BlogPostSuggestionCard>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
}
