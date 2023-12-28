import React from "react";
import Link from "next/link";
import { RecipeType } from "@/types/recipieType";
import { BlogPostType } from "@/types/blogPost";
import { Metadata } from "next";
import { firestore } from "firebase-admin";
import adminInit from "@/lib/firebase/admin_init";
import dynamic from "next/dynamic";

let fetchLimit = 10;

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Explore our blog and recipe collection to learn more about cacao and discover new ways to enjoy it. From delicious recipes to informative articles, our resources will help you make the most of your cacao experience.",
  keywords: [
    "Blog",
    "Recipes",
    "Cacao",
    "Ceremonial Cacao",
    "Cacao Recipes",
    "Cacao Blog",
    "Cacao Articles",
    "Cacao Resources",
    "Cacao Information",
    "Cacao Knowledge",
  ],
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    title: "Resources",
    description:
      "Explore our blog and recipe collection to learn more about cacao and discover new ways to enjoy it. From delicious recipes to informative articles, our resources will help you make the most of your cacao experience.",
  },
  alternates: {
    canonical: "https://www.sacbe-ceremonial-cacao.com/resources",
  },
};

async function getFeaturedPosts(startAfter: string) {
  adminInit();
  const db = firestore();
  const snap = await db
    .collection("blog_posts")
    .orderBy("title")
    .startAfter(startAfter)
    .limit(fetchLimit)
    .get();

  return snap.docs.map((e) => {
    return { id: e.id, data: e.data() as BlogPostType };
  });
}
async function getFeaturedRecipes(startAfter: string) {
  adminInit();
  const db = firestore();

  const snap = await db
    .collection("recipes")
    .orderBy("title")
    .startAfter(startAfter)
    .limit(fetchLimit)
    .get();

  return snap.docs.map((e) => {
    return { id: e.id, data: e.data() as RecipeType };
  });
}

async function ResourcesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const postAfter = (searchParams?.postAfter as string) ?? "";
  const recipeAfter = (searchParams?.recipeAfter as string) ?? "";

  const [posts, recipes] = await Promise.all([
    getFeaturedPosts(postAfter),
    getFeaturedRecipes(recipeAfter),
  ]);

  const BlogPostSuggestionCard = dynamic(() =>
    import("../../../components/customer/posts/BlogPostSuggestionCard").then(
      (res) => res.BlogPostSuggestionCard
    )
  );

  const RecipeCard = dynamic(() =>
    import("../../../components/customer/recipes/RecipeCard").then(
      (res) => res.RecipeCard
    )
  );

  const postCards = posts.map((e) => {
    return <BlogPostSuggestionCard post={e.data} key={e.data.title} />;
  });

  const recipeCards = recipes.map((e) => {
    return <RecipeCard recipe={e.data} key={e.data.title} />;
  });

  const Cards = postCards.flatMap((e, idx) => [e, recipeCards[idx]]);

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-sacbeDarkColor my-10">
          Resources for your Cacao Journey
        </h1>
      </div>
      <div className="w-11/12 lg:w-7/12 m-auto">{Cards}</div>
      <div className="text-center my-20 bg-sacbeBrandColor hover:bg-surface m-auto w-6/12 lg:w-2/12 hover:w-6/12 rounded-lg py-3 px-10 drop-shadow-lg border-2 hover:drop-shadow-2xl duration-500">
        <Link
          className=" text-onPrimaryContainer no-underline bg font-display "
          href={{
            pathname: "/resources",
            query: {
              recipeAfter:
                (recipes.length != 0 &&
                  recipes[recipes.length - 1].data.title) ??
                "",
              postAfter:
                (posts.length != 0 && posts[posts.length - 1].data.title) ?? "",
            },
          }}
        >
          <p className="text-lg md:text-2xl hover:Black">Load More</p>
        </Link>
      </div>
    </div>
  );
}

export default ResourcesPage;
