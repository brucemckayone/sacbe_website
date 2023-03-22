import stripe from "@/lib/stripe/stripe";
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method as requestMethodType;

  switch (requestMethod) {
    case "GET": {
      const status = req.query.status;
      const limit = req.query.limit as string;
      const starting_after = req.query.starting_after;
      console.log(starting_after);

      const subscriptions = await stripe.subscriptions.list({
        status: status as Stripe.SubscriptionListParams.Status,
        starting_after: starting_after && (starting_after as string),
        limit: limit == null ? 5 : Number.parseInt(limit),
      });
      subscriptions.has_more;

      return res.status(200).json(subscriptions);
    }
  }
}
