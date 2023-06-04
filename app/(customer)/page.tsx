import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import HomePageHeader from "@/components/headers/homePage/homePageHeader";
import NavMenuBottom from "@/components/menu/NavMenuBottom";
import SimpleSlider from "@/components/carousels/testimonial_slider";
import reviews from "@/lib/constants/reviews";
import BenifitsOfCacao from "@/components/body/benifits_of_cacao";
import AboutSacbe from "@/components/body/about_sacbe";
import { AboutClouds } from "./wholesale/AboutClouds";
import adminInit from "@/utils/firebase/admin_init";
import { firestore } from "firebase-admin";
import { BlogPostSuggestionCard } from "./posts/[title]/BlogPostSuggestionCard";
import { RecipeCard } from "./recipes/[title]/RecipeCard";
import { RecipeType } from "@/types/recipieType";
import { blogPostType } from "./posts/[title]/page";
import { BecomeAPractioner } from "./BecomeAPractioner";
import { VitiminPopovers } from "./VitiminPopovers";
import { RiskApealCards } from "./RiskApealCards";
import { TheHook } from "./TheHook";
import { PurchaseOptions } from "./PurchaseOptions";

export default async function Home() {
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
    <main>
      <HomePageHeader />
      <NavMenuBottom />
      <TheHook />
      <BenifitsOfCacao />

      <VitiminPopovers />

      <div className="bg-primaryContainer m-auto pt-20 md:pt-40  ">
        <div className="flex flex-col md:flex-row w-11/12 md:w-9/12 m-auto">
          <div className=" md:w-5/12  md:mx-10 self-center md:mr-20">
            <h2>
              Awaken Your Senses,{" "}
              <strong className="text-5xl text-sacbeBrandColor stroke-onPrimaryContainer text-stroke-3 `">
                Embrace the Journey
              </strong>
            </h2>
            <p className="pl-2 pt-2 md:pr-10">
              Immerse yourself in the Enchanting world of Sacbe Cacao, where
              flavor and wellness intertwine. Uncover the transformative power
              of this extraordinary beverage and let it ignite your spirit.
              <strong>
                It is time to elevate your daily ritual and savor the magic that
                Sacbe Cacao brings to your life.
              </strong>
            </p>
            <div className="hidden md:block mr-10">
              <RiskApealCards isHorizontal={false} />
            </div>
          </div>
          <div className="md:w-5/12 md:mx-10">
            <PurchaseOptions isHorizontal={false} compact={false} />
            <div className="sm:block m-auto md:hidden">
              <RiskApealCards isHorizontal={false} />
            </div>
          </div>
        </div>
      </div>

      <SimpleSlider reviews={reviews} />

      <AboutSacbe />
      <BecomeAPractioner />

      {/* <RecipeSlider /> */}
      <div className="bg-gradient-to-b from-primaryContainer to-surface ">
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