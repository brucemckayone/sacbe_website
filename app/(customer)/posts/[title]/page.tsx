import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { firestore } from "firebase-admin";

import adminInit from "@/utils/firebase/admin_init";
import { Metadata } from "next";
import { DocumentReference } from "@firebase/firestore";

import console, { log } from "console";
import Categorychip from "@/components/blog/categorychips";
import Link from "next/link";

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
  // return await strapiGET({
  //   endpoint: "/api/blog-posts",
  //   filters: `filters[uid][$eq]=${uid}`,
  //   populate: `populate=*`,
  // });
  adminInit();

  const reformattedTitle = title
    .replaceAll("-", " ")
    .replaceAll("%3A", ":")
    .replaceAll("%20", "-");

  console.log("herer is the title");
  console.log(reformattedTitle);
  try {
    const snapshots = await firestore()
      .collection("blog_posts")
      .where("title", "==", reformattedTitle)
      .get();
    const data = snapshots.docs[0].data();
    console.log(data);
    return data;
  } catch (e) {
    return undefined;
  }
}

type blogPostType = {
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
  console.log(data == undefined);
  if (data == undefined) {
    return <div></div>;
  } else {
    const relatedPosts = (await getRelatedPosts(
      data.related_posts
    )) as blogPostType[];

    return (
      <main className="grid grid-cols-1 place-items-center mx-3">
        <div className="sm:w-full sm:mx-3 md:w-8/12 my-10 ">
          <div className=" relative h-[500px] shadow-xl">
            <Image
              src={data.main_image}
              fill
              alt={"blog header post "}
              className="rounded-lg object-cover "
            />
          </div>

          <h1 className="my-10 md:text-8xl">{data.title}</h1>

          <div className="flex flex-row justify-between items-baseline">
            <div className="flex flex-row justify-start items-baseline">
              <h4>Categories: </h4>
              {data.categories.map((cat) => {
                return <Categorychip title={cat} key={cat + "catchip"} />;
              })}
            </div>
            <h5>{`Author: ${data.publisher.name}`}</h5>
          </div>
          <div className=" w-full h-0.5 bg-onPrimaryContainer opacity-25 my-3 rounded-lg px-20" />
          <div className="flex flex-row justify-start items-baseline flex-wrap">
            <h4>Tags:</h4>
            {data.tags.map((tag) => {
              return (
                <div
                  className="center relative inline-block select-none whitespace-nowrap"
                  key={`${tag} KEY`}
                >
                  <p className="mx-1 bg-tertiaryContainer shadow rounded-md px-2">
                    {tag.replaceAll(";", "")}
                  </p>
                </div>
              );
            })}
          </div>

          <div className=" px-5  my-10 md:p-20">
            <ReactMarkdown
              components={{
                h1: "h2",
                h2: ({ node, ...props }) => (
                  <h3 className="text-4xl mt-8" {...props} />
                ),
                h3: "h4",
                h5: "h6",
                img: function ({ ...props }) {
                  const substrings = props.alt?.split("{{")!;
                  const alt = substrings[0].trim();

                  return (
                    <div className="relative w-full h-96 rounded-lg my-10">
                      {" "}
                      <Image
                        src={props.src!}
                        alt={alt}
                        fill
                        className="rounded-lg shadow-2xl"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  );
                },
                p: ({ node, ...props }) => (
                  <p style={{ fontSize: "1.3rem" }} {...props} />
                ),
              }}
            >
              {data.content}
            </ReactMarkdown>

            {relatedPosts != undefined && (
              <div className="my-20">
                <h2 className="text-2xl md:text-7xl">Related Articles</h2>
                {relatedPosts.map((post) => {
                  const slug = post.title
                    .replaceAll(" ", "-")
                    .replaceAll("%3A", ":");
                  console.log("hereh " + slug);

                  return (
                    <Link
                      style={{ textDecoration: "none" }}
                      href={`posts/${slug}`}
                      key={slug}
                    >
                      <div
                        className="flex flex-col md:flex-row my-10 border-b py-10 hover:bg-tertiaryContainer duration-500 hover:rounded-lg hover:shadow-lg hover:border-none "
                        key={post.title + "related posts"}
                      >
                        <div className="max-w-full h-[200px]  md:basis-3/12 relative my-2  md:mx-10">
                          <Image
                            src={post.main_image}
                            fill
                            className="object-cover rounded-lg"
                            alt={`${post.title} main header image`}
                          />
                        </div>
                        <div className="basis-9/12">
                          <h3>{post.title}</h3>
                          <p>{post.excerpt}</p>
                          <div className="flex flex-row justify-start items-baseline">
                            {data.categories.map((cat) => {
                              return (
                                <Categorychip
                                  title={cat}
                                  key={"related cat chip" + cat}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </Link>
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
