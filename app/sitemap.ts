import { MetadataRoute } from "next";
import homeUrl from "@/lib/constants/urls";
import { firestore } from "firebase-admin";
import adminInit from "@/lib/firebase/admin_init";

async function getAllBlogPosts() {
  adminInit();
  const db = firestore();
  const snap = await db.collection("blog_posts").get();
  return snap.docs.map((e) => {
    return e.data();
  });
}
async function getAllRecipes() {
  adminInit();
  const db = firestore();
  const snap = await db.collection("recipes").get();
  return snap.docs.map((e) => {
    return e.data();
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = (await getAllBlogPosts()).map((e) => {
    return {
      url: `${homeUrl}/posts/${e.slug}`,
      lastModified: e.dateCreated.toDate(),
    };
  });

  const recipes = (await getAllRecipes()).map((e) => {
    return {
      url: `${homeUrl}/recipes/${e.slug}`,
      lastModified: e.dateCreated.toDate(),
    };
  });

  return [
    {
      url: homeUrl,
      lastModified: new Date(),
    },
    {
      url: `${homeUrl}/about`,
      lastModified: new Date("2023-06-01"),
    },
    {
      url: `${homeUrl}/affiliates`,
      lastModified: new Date("2023-06-01"),
    },
    {
      url: `${homeUrl}/wholesale`,
      lastModified: new Date("2023-06-01"),
    },
    {
      url: `${homeUrl}/resources`,
      lastModified: new Date("2023-06-01"),
    },
    {
      url: `${homeUrl}/facilitator-training`,
      lastModified: new Date("2023-12-28"),
    },
    ...blogPosts,
    ...recipes,
  ];
}
