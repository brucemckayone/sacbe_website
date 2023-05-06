import React from "react";
import Image from "next/image";
import SmallButton from "@/components/buttons/small_button";
import Link from "next/link";
import { BlogPostsType } from "@/types/blogposts";

async function getData() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer d5227425eebf78bd468e423320ea40583e4cf4fcb5a996c6db0cf959fafb36f554b71561385dadea3f05bec716625f6814641200015e69e5008b7192a77beb8b157612edca62178f57152ad7a1f55fb670ce7f1d0a81343850460889fdc753ea3cc04b9790d351282c1ef52d605ab582bbb28634c5eab24559379d37634dc121"
  );

  var raw = JSON.stringify({
    status: "pending",
    userId: "28wL0HMd7959AiWpRW8r",
  });

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    next: { revalidate: 0 },
  };

  const res = await fetch(
    "http://127.0.0.1:1337/api/blog-posts?populate=*",
    requestOptions
  );

  if (res.ok) {
    const json = await res.json();
    return json;
  }
}

async function RecipeSlider() {
  let data = (await getData()) as BlogPostsType;

  const cards = data.data.map((post) => {
    return (
      <div className="max-w-sm bg-secondaryContainer m-5 rounded-xl shadow-sm shadow-onSurfaceVarient ">
        <Image
          src={`http://127.0.0.1:1337${post.attributes.Image.data.attributes.url}`}
          alt="blog header image"
          width={500}
          height={500}
          className="rounded-xl"
        />
        <div className="p-5">
          <Link href={`/posts/${post.attributes.uid}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.attributes.Title}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {post.attributes.Excerpt}
          </p>
          <Link
            href={`/posts/${post.attributes.uid}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-onTertiaryContainer hover:text-onTertiaryContainer duration-150 bg-tertiaryContainer rounded-lg hover:bg-sacbeBrandColor focus:ring-4 focus:outline-none focus:ring-sacbeBrandColor "
          >
            Read more
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    );
  });
  return (
    <div className="bg-gradient-to-b to-secondaryContainer from-surfaceVarient  py-20">
      <h3 className="text-4xl md:text-7xl md:text-center my-20">
        GET TO KNOW CACAO
      </h3>
      <div className=" md:mx-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {cards}
      </div>
    </div>
  );
}

export default RecipeSlider;
