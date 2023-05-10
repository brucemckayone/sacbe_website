import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { firestore } from "firebase-admin";

import adminInit from "@/utils/firebase/admin_init";
import { Metadata } from "next";

// or Dynamic metadata

async function getPost(title: string) {
  // return await strapiGET({
  //   endpoint: "/api/blog-posts",
  //   filters: `filters[uid][$eq]=${uid}`,
  //   populate: `populate=*`,
  // });
  adminInit();
  const reformattedTitle = title.replaceAll("-", " ").replaceAll("%3A", ":");

  console.log(reformattedTitle);

  const snapshots = await firestore()
    .collection("blog_posts")
    .where("title", "==", reformattedTitle)
    .get();
  const data = snapshots.docs[0].data();
  console.log(data);

  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string; title: string };
}) {
  const data = (await getPost(params.title!)) as {
    content: string;
    title: string;
    readingTime: string;
    main_image: string;
    tags: string[];
    categories: string[];
    excerpt: string;
  };
  return {
    title: data.title.replaceAll("-", " "),
    description: data.excerpt,
    abstract: data.excerpt,
    category: data.categories[0],
    openGraph: {
      images: [data.main_image],
      titled: data.title,
    },
    colorScheme: "light",
  } as Metadata;
}
export default async function Page({
  params,
}: {
  params: { id: string; title: string };
}) {
  console.log(params);

  const data = (await getPost(params.title!)) as {
    content: string;
    title: string;
    readingTime: string;
    main_image: string;
    tags: string[];
    categories: string[];
    excerpt: string;
  };

  return (
    <main className="grid grid-cols-1 place-items-center mx-3">
      <div className="sm:w-full sm:mx-3 md:w-8/12 lg:w-7/12 xl:w-6/12 my-2 ">
        <Image
          src={data.main_image}
          width={900}
          height={400}
          alt={"blog header post "}
          className="rounded-lg"
        />
        {/* <div className="flex items-center justify-center space-x-4 mt-10 mb-5">
          <img
            className="w-10 h-10 rounded-full"
            src="/docs/images/people/profile-picture-5.jpg"
            alt=""
          /> */}
        {/* <div className="font-medium dark:text-white">
            <div>{data.author}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {data.created??''}
            </div>
          </div> */}
        <h1 className="my-10 md:text-8xl">{data.title}</h1>
        <div className="flex flex-row justify-start items-baseline">
          <h4>Categories: </h4>
          {data.categories.map((cat) => {
            return (
              <p className="mx-1 bg-tertiaryContainer shadow rounded-md px-2">
                {cat}
              </p>
            );
          })}
        </div>
        <div className=" w-full h-0.5 bg-onPrimaryContainer opacity-25 my-3 rounded-lg px-20" />
        <div className="flex flex-row justify-start items-baseline flex-wrap">
          <h4>Tags:</h4>
          {data.tags.map((tag) => {
            return (
              <div className="center relative inline-block select-none whitespace-nowrap ">
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
              // p: ({ node, ...props }) => (
              //   <p style={{ fontSize: "1.3rem" }} {...props} />
              // ),
            }}
          >
            {data.content}
          </ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
