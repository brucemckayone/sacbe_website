import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import HomePageHeader from "@/components/headers/homePage/homePageHeader";
import NavMenuBottom from "@/components/menu/NavMenuBottom";
import SimpleSlider from "@/components/carousels/testimonial_slider";
import reviews from "@/lib/constants/reviews";
import BenifitsOfCacao from "@/components/body/benifits_of_cacao";
import AboutSacbe from "@/components/body/about_sacbe";

import RecipeSlider from "./about/recipe_slider";
import { AboutClouds } from "./wholesale/AboutClouds";
import ResourcesPage from "./resources/page";
import adminInit from "@/utils/firebase/admin_init";
import { firestore } from "firebase-admin";
import { limit } from "firebase/firestore";
import { BlogPostSuggestionCard } from "./posts/[title]/BlogPostSuggestionCard";
import { RecipeCard } from "./recipes/[title]/RecipeCard";
import { RecipeType } from "@/types/recipieType";
import { blogPostType } from "./posts/[title]/page";
import { BecomeAPractioner } from "./BecomeAPractioner";

export default async function Home() {
  const posts = await getFeaturedPosts();
  const recipes = await getFeaturedRecipes();
  console.log(posts);

  const postCards = posts.map((e) => {
    return <BlogPostSuggestionCard post={e} key={e.title} />;
  });
  const recipeCards = recipes.map((e) => {
    return <RecipeCard recipe={e} key={e.title} />;
  });

  const Cards = postCards.flatMap((e, idx) => [e, recipeCards[idx]]);
  return (
    <main>
      <HomePageHeader />
      <NavMenuBottom />
      <AboutClouds></AboutClouds>
      <BenifitsOfCacao />
      <AboutSacbe />

      <BecomeAPractioner />
      <SimpleSlider reviews={reviews} />

      {/* <RecipeSlider /> */}

      <div className="bg-gradient-to-b from-tertiaryContainer to-surface ">
        <h3 className="text-7xl text-center py-20">Recipes & Articles</h3>
        <div className=" w-11/12 md:w-7/12 mx-auto" key={"cards holder"}>
          {Cards}
        </div>
      </div>
      <NavMenuBottom />
      {/* <Card>
        <div className="flex flex-col items-center">
          <h2 className="text-center">Sign Up To Our NewsLetter</h2>
          <form action="/api/newsletter_signup" method="post">
            <input
              className="w-full p-3"
              type="text"
              name=""
              id=""
              placeholder="email"
            />
            <button
              className="duration-500 bg-sacbeBrandColor py-1 px-8  my-3 rounded-md hover:bg-onPrimaryContainer hover:text-onPrimary border-2 "
              type="submit"
            >
              <p>SUBMIT</p>
            </button>
          </form>
        </div>
      </Card> */}
    </main>
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
  return snapshot.docs.map((e) => e.data() as blogPostType);
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
