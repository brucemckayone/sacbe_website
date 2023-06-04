// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = firestore().collection("affiliate_requests").limit(1).get();
  res.status(200).json((await user).docs[0].data());
}
