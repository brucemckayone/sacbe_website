// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import adminInit from "@/utils/firebase/admin_init";
import { firestore } from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  adminInit();  
   const snapshots = await firestore()
      .collection("blog_posts")
      .where("slug", "==", "how-ceremonial-cacao-can-help-with-depression").limit(1)
      .get();
  // const user = firestore().collection("blog_posts").limit(1).get();
  res.status(200).json((await snapshots.docs[0].data()) as Data );
}
