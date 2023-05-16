import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { firestore } from "firebase-admin";

import adminInit from "@/utils/firebase/admin_init";

import CardLoader from "@/components/loaders/CardLoader";

async function getData() {
  adminInit();
  const snapshots = await firestore()
    .collection("blog_posts")
    .limit(10)
    .where("featured", "==", true)
    .get();
  console.log(snapshots.docs.length);
  return snapshots.docs.map((e) => e.data());
}

async function RecipeSlider() {
  let data = await getData();

  const cards = data.map((post) => {
    const slug = post.title.replaceAll(" ", "-");
    return (
      <div
        className="max-w-sm bg-secondaryContainer m-5 rounded-xl shadow-sm shadow-onSurfaceVarient flex flex-col justify-between h-[550px]"
        key={"Blog slider on home page"}
      >
        <div>
          <Image
            src={post.main_image}
            alt="blog header image"
            width={500}
            height={500}
            className="rounded-xl"
          />
          <div className="p-5">
            <Link href={`/posts/${slug}`} className="no-underline">
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
            href={`/posts/${slug}`}
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
  return (
    <div className="bg-gradient-to-b to-secondaryContainer from-surfaceVarient  py-20">
      <h3 className="text-5xl text-center md:text-7xl md:text-center my-20">
        GET TO KNOW CACAO
      </h3>
      <Suspense>
        <div className=" md:mx-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center">
          {cards}
        </div>
      </Suspense>
    </div>
  );
}

export default RecipeSlider;
