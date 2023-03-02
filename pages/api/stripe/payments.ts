import { NextApiRequest, NextApiResponse } from "next";

import stripe from "@/lib/stripe/stripe";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const { accountId } = req.query;
    if (accountId) {
      if (accountId.length > 0) {
        const sales = await stripe.charges.list({
          stripeAccount: accountId as string,
        });
        res.status(200).json(sales);
      }
    }
  }
}
