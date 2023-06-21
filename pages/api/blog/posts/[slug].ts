import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import adminInit from "../../../../utils/firebase/admin_init";
import { BlogPostType } from "@/types/blogPost";

adminInit();
const db = firestore();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {

        const slug = req.query.slug as string
        console.log("server side slug = " + slug);
          
        const data = (await getPost(slug)) as BlogPostType;
        const relatedPosts  = (await getRelatedPosts(data["related_posts"])) as BlogPostType[];
        return res.status(200).json({ post: data, relatedPosts: relatedPosts });
      } catch (e) {
        return res.status(500).json({ post: {} , relatedPosts: [], error: e });
      }
  }
}


async function getRelatedPosts(relatedPosts: any[]) {
  const snapshot = await db
    .collection("blog_posts")
    .where(
      firestore.FieldPath.documentId(),
      "in",
      relatedPosts
    )
    .get();
  
  return  snapshot.docs.map((e) => e.data());
  
}

async function getPost(slug: string) {
  
  try {
    const snapshots = await db
      .collection("blog_posts")
      .where("slug", "==", slug).limit(1)
      .get();
    
    return snapshots.docs[0].data();
  } catch (e) {
    return undefined;
  }
}