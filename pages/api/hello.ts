// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import stripe from "@/lib/stripe/stripe";
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
  const invoice = await stripe.invoices.retrieve("in_1NiJLpG859ZdyFmpkUMOVe1s");
  
  res.status(200).json(( invoice));
}
