import { BlogPostType } from "@/types/blogPost";
import { RecipeType } from "@/types/recipieType";
import adminInit from "@/utils/firebase/admin_init";
import { firestore } from "firebase-admin";
import { BlogPostSuggestionCard } from "./posts/[slug]/BlogPostSuggestionCard";
import { RecipeCard } from "./recipes/[slug]/RecipeCard";

export async function BlogAndRecipes() {
  const posts = await getFeaturedPosts();
  const recipes = await getFeaturedRecipes();
  const postCards = posts.map((e) => {
    return <BlogPostSuggestionCard post={e} key={e.title} />;
  });
  const recipeCards = recipes.map((e) => {
    return <RecipeCard recipe={e} key={e.title} />;
  });
  const Cards = postCards.flatMap((e, idx) => [e, recipeCards[idx]]);
  return (
    <div className="bg-gradient-to-b from-primaryContainer to-surface ">
      <h3 className="text-7xl text-center py-20">Recipes & Articles</h3>
      <div className=" w-11/12 md:w-7/12 mx-auto" key={"cards holder"}>
        {Cards}
      </div>
    </div>
  );
}

async function getFeaturedPosts() {
  adminInit();
  const db = firestore();
  const snapshot = await db
    .collection("blog_posts")
    .where("featured", "==", true)
    .limit(2)
    .get();
  return snapshot.docs.map((e) => e.data() as BlogPostType);
}

async function getFeaturedRecipes() {
  adminInit();
  const db = firestore();
  const snapshot = await db
    .collection("recipes")
    .where("featured", "==", true)
    .limit(2)
    .get();
  return snapshot.docs.map((e) => e.data() as RecipeType);
}
