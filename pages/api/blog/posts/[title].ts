// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import adminInit from "../../../../utils/firebase/admin_init";
import { DocumentReference } from "@firebase/firestore";
import { formatTitleForFetch } from "../../../../utils/url/formater";
import { BlogPostType } from "@/types/blogPost";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    switch (req.method) {
        case "GET":
            const title = req.query.title as string;
            console.log(title);
            
            console.log(title);
            
            const data = (await getPost(title)) as BlogPostType;
            // return res.status(200).json({ post: data });
            const relatedPosts = (await getRelatedPosts(data["related_posts"])) as BlogPostType[];
            return res.status(200).json({ post:data, relatedPosts: relatedPosts });
    }
}


async function getRelatedPosts(relatedPosts: any[]) {
    
  adminInit();
  const db = firestore();
  const snapshot = await db
    .collection("blog_posts")
    .where(
      firestore.FieldPath.documentId(),
      "in",
      relatedPosts
    )
    .get();
  const posts = snapshot.docs.map((e) => e.data());
  return posts;
}

async function getPost(title: string) {
  adminInit();
  try {
    const snapshots = await firestore()
      .collection("blog_posts")
      .where("title", "==", formatTitleForFetch(title)).limit(1)
      .get();
    const data = snapshots.docs[0].data();
    console.log(data);
    return data;
  } catch (e) {
    return undefined;
  }
}