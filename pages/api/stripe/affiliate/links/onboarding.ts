import { NextApiRequest, NextApiResponse } from "next";

import stripe from "@/lib/stripe/stripe";
import Stripe from "stripe";
import homeUrl from "@/lib/constants/urls";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const accountId = req.query.accountId;
    const accountLink = await stripe.accountLinks.create({
      account: accountId as string,
      refresh_url: `${homeUrl}/affiliates/portal`,
      return_url: `${homeUrl}/api/affiliate/onboarding_return?accountId=${accountId}`,
      type: "account_onboarding",
    });
    res.status(200).json(accountLink);
  }
}
