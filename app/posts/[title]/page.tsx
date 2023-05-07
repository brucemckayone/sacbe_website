import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BlogPostsType } from "@/types/blogposts";
import ReactMarkdown from "react-markdown";
import strapiGET from "@/utils/server/strapi/get";
import { Firestore, getFirestore } from "firebase/firestore";
import { firestore } from "firebase-admin";
import { initFirestore } from "@next-auth/firebase-adapter";
async function getPost(title: string) {
  // return await strapiGET({
  //   endpoint: "/api/blog-posts",
  //   filters: `filters[uid][$eq]=${uid}`,
  //   populate: `populate=*`,
  // });
  initFirestore();
  const reformattedTitle = title.replaceAll("-", " ").replaceAll("%3A", ":");
  console.log("reformated title");

  console.log(reformattedTitle);

  const snapshots = await firestore()
    .collection("blog_posts")
    .where("title", "==", reformattedTitle)
    .get();
  const data = snapshots.docs[0].data();
  console.log(data);

  return data;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string; title: string };
  searchParams: { [key: string]: string | string[] | undefined };
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
    <main className="grid grid-cols-1 place-items-center">
      <div className="sm:w-full sm:mx-3 md:w-8/12 lg:w-7/12 xl:w-6/12 my-10 ">
        <Image
          src={data.main_image}
          width={900}
          height={400}
          alt={"blog header post "}
          className="rounded-lg"
        />
        <div className="p-20">
          <h1 className="mb-10">{data.title}</h1>
          <ReactMarkdown
            components={{
              h1: "h2",
              h2: ({ node, ...props }) => (
                <h3
                  style={{
                    color: "black",
                    padding: "30px 0px 010px 0px",
                    fontSize: "3.5rem",
                    lineHeight: "4rem",
                  }}
                  {...props}
                />
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
        </div>
      </div>
    </main>
  );
}
