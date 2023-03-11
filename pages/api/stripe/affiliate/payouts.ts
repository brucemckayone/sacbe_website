import { NextApiRequest, NextApiResponse } from "next";

import stripe from "@/lib/stripe/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method as requestMethodType) {
    case "GET":
      const accountId = req.query.accountId;
      const payouts = await stripe.payouts.list(
        {},
        { stripeAccount: accountId as string }
      );
      res.status(200).json(payouts);
      break;
  }
}
