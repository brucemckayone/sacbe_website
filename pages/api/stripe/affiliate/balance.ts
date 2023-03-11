import { NextApiRequest, NextApiResponse } from "next";

import stripe from "@/lib/stripe/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    try {
      const accountId = req.query.accountId;
      if (accountId) {
        const balance = await stripe.balance.retrieve(
          {},
          {
            stripeAccount: accountId as string,
          }
        );
        res.status(200).json(balance);
      }
    } catch (e) {
      res.status(200).json(e);
    }
  }
}
