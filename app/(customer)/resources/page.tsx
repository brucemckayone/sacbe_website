import { firestore } from "firebase-admin";
import React from "react";
import { blogPostType } from "../posts/[title]/page";
import { BlogPostSuggestionCard } from "../posts/[title]/BlogPostSuggestionCard";
import { RecipeCard } from "../recipes/[title]/RecipeCard";
import Link from "next/link";
import adminInit from "@/utils/firebase/admin_init";
import { RecipeType } from "@/types/recipieType";

async function getFeaturedPosts(startAfter: string) {
  adminInit();
  const db = firestore();
  const snap = await db
    .collection("blog_posts")
    .orderBy("title")
    .startAfter(startAfter)
    .limit(2)
    .get();

  return snap.docs.map((e) => {
    return { id: e.id, data: e.data() as blogPostType };
  });
}
async function getFeaturedRecipes(startAfter: string) {
  adminInit();
  const db = firestore();
  const snap = await db
    .collection("recipes")
    .orderBy("title")
    .startAfter(startAfter)
    .limit(2)
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
  const posts = await getFeaturedPosts(postAfter);
  const recipes = await getFeaturedRecipes(recipeAfter);

  const postCards = posts.map((e) => {
    return <BlogPostSuggestionCard post={e.data} key={e.data.title} />;
  });
  const recipeCards = recipes.map((e) => {
    return <RecipeCard recipe={e.data} key={e.data.title} />;
  });

  const Cards = postCards.flatMap((e, idx) => [e, recipeCards[idx]]);
  return (
    <div>
      <div className="w-11/12 md:w-7/12 m-auto">{Cards}</div>
      <div className="text-center my-20 bg-sacbeBrandColor hover:bg-surface m-auto w-6/12 md:w-2/12 hover:w-6/12 rounded-lg py-3 px-10 drop-shadow-lg border-2 hover:drop-shadow-2xl duration-500">
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
          <p className="text-2xl hover:Black">Load More</p>
        </Link>
      </div>
    </div>
  );
}

export default ResourcesPage;
