import { NextApiRequest, NextApiResponse } from "next";
import stripe from "@/lib/stripe/stripe";

import Stripe from "stripe";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const id = req.query.id;
    console.log(id);
    const customer = (await stripe.customers.retrieve(id as string, {
      expand: ["shipping"],
    })) as Stripe.Customer;

    const shipping = customer.shipping;
    console.log(shipping);
    return res.status(200).json(shipping);
  }
}
