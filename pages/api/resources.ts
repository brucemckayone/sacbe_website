// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { BlogPostType } from "@/types/blogPost";
import { RecipeType } from "@/types/recipieType";
import adminInit from "@/utils/firebase/admin_init";
import { firestore } from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const posts = await getFeaturedPosts();
      const recipes = await getFeaturedRecipes();
      return res.status(200).json([...posts, ...recipes]);
  }
}

async function getFeaturedPosts() {
  adminInit();
  const db = firestore();
  const snap = await db
    .collection("blog_posts")
    .where("featured", "==", true)
    .limit(2)
    .get();
  return snap.docs.map((e) => e.data() as BlogPostType);
}
async function getFeaturedRecipes() {
  adminInit();
  const db = firestore();
  const snap = await db
    .collection("recipes")
    .limit(2)
    .where("featured", "==", true)
    .get();
  return snap.docs.map((e) => e.data() as RecipeType);
}
