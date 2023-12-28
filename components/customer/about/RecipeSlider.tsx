import React, { Suspense } from "react";
import { firestore } from "firebase-admin";
import adminInit from "@/lib/firebase/admin_init";
import { ArticleCards } from "./ArticleCards";

async function getData() {
  adminInit();
  const snapshots = await firestore()
    .collection("blog_posts")
    .limit(4)
    .where("featured", "==", true)
    .get();

  return snapshots.docs.map((e) => e.data());
}
async function RecipeSlider() {
  let data = await getData();

  return (
    <div className="bg-gradient-to-b to-secondaryContainer from-surfaceVarient  py-20">
      <h3 className="text-5xl text-center md:text-7xl md:text-center my-20">
        GET TO KNOW CACAO
      </h3>
      <Suspense>
        <div className=" md:mx-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center">
          <ArticleCards posts={data} />
        </div>
      </Suspense>
    </div>
  );
}

export default RecipeSlider;
