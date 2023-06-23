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
        const data = await getPost(req.query.slug as string) as BlogPostType;
        
        let related_posts = [] as any[];
        if (data['relate_posts'] == null) 
          related_posts = (await getRelatedPosts(data["relate_posts"])) as BlogPostType[];
        
        return res.status(200).json({ post: data, relatedPosts: related_posts ?? [] });
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
    const snapshots = await db
      .collection("blog_posts")
      .doc(slug)
      .get();
    return snapshots.data() as BlogPostType;
}