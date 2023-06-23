import { BlogPostType } from "@/types/blogPost";
import { RecipeType } from "@/types/recipieType";
import adminInit from "@/utils/firebase/admin_init";
import { firestore } from "firebase-admin";
import dynamic from "next/dynamic";

adminInit();
const db = firestore();

export async function BlogAndRecipes() {
  const BlogPostSuggestionCard = dynamic(() =>
    import("./posts/[slug]/BlogPostSuggestionCard").then(
      (res) => res.BlogPostSuggestionCard
    )
  );
  const RecipeCard = dynamic(() =>
    import("./recipes/[slug]/RecipeCard").then((res) => res.RecipeCard)
  );

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
  const snapshot = await db
    .collection("blog_posts")
    .where("featured", "==", true)
    .limit(4)
    .get();
  return snapshot.docs.map((e) => e.data() as BlogPostType);
}

async function getFeaturedRecipes() {
  const snapshot = await db
    .collection("recipes")
    .where("featured", "==", true)
    .limit(4)
    .get();
  return snapshot.docs.map((e) => e.data() as RecipeType);
}
