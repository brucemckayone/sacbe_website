// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const db = firestore();

  const snap = await db.collection("recipes").limit(1).get();

  const a = snap.docs[0].data() as object;

  res.status(200).json(a);
}
