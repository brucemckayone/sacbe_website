import { NextApiRequest, NextApiResponse } from "next";

import stripe from "@/lib/stripe/stripe";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const { accountId } = req.query;
    const sales = await stripe.charges.list({
      stripeAccount: "acct_1MbMvi4ffKpYRYea",
    });
    res.status(200).json(sales);
  }
}
