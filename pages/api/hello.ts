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

  const slug = req.query.slug as string;
  adminInit();  
   const snapshots = await firestore()
      .collection("blog_posts")
      .doc(slug)
      .get();
  
  res.status(200).json(( snapshots.data()) as Data );
}
