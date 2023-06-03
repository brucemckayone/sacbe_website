import { MetadataRoute } from "next";
import homeUrl from "@/lib/constants/urls";
import { firestore } from "firebase-admin";
import { blogPostType } from "./(customer)/posts/[title]/page";

async function getAllBlogPosts() {
  const db = firestore();
  const snap = await db.collection("blog_posts").get();
  return snap.docs.map((e) => {
    return e.data() as blogPostType;
  });
}
async function getAllRecipes() {
  const db = firestore();
  const snap = await db.collection("recipes").get();
  return snap.docs.map((e) => {
    return e.data();
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = (await getAllBlogPosts()).map((e) => {
    return {
      url: `${homeUrl}/blog/${e.title.replaceAll(" ", "-")}`,
      lastModified: new Date(),
    };
  });

  const recipes = (await getAllRecipes()).map((e) => {
    return {
      url: `${homeUrl}/recipes/${e.title.replaceAll(" ", "-")}`,
      lastModified: new Date(),
    };
  });

  return [
    {
      url: homeUrl,
      lastModified: new Date(),
    },
    {
      url: `${homeUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${homeUrl}/affiliates`,
      lastModified: new Date(),
    },
    {
      url: `${homeUrl}/wholesale`,
      lastModified: new Date(),
    },
    {
      url: `${homeUrl}/resources`,
      lastModified: new Date(),
    },
    ...blogPosts,
    ...recipes,
  ];
}
