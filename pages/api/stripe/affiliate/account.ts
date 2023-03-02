import { NextApiRequest, NextApiResponse } from "next";

import stripe from "@/lib/stripe/stripe";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    //creating an account
    //TODO: this is where you need to cerate an account
    const { accountId, email, companyName } = req.query;
    const account = await stripe.accounts.create({
      type: "express",
      country: "GB",
      email: "frank@gmail.com",
      business_type: "individual",
      default_currency: "GBP",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });
    res.status(200).json(account);
  }
}
