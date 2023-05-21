import { NextApiRequest, NextApiResponse } from "next";
import stripe from "@/lib/stripe/stripe";
import Stripe from "stripe";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let customerId: string;
  if (req.method == "GET") {
    customerId = req.query.customerId as string;
    stripe.customers.retrieve(customerId);
    // res.status(200).json(data);
  }
}
