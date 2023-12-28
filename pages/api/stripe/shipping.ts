import { NextApiRequest, NextApiResponse } from "next";
import stripe from "@/lib/stripe/init/stripe";
import Stripe from "stripe";
import { fetchGetJSON } from "@/utils/http/fetchGetJSON";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let customerId: string;
  if (req.method == "GET") {
    customerId = req.query.customerId as string;
    const customer = (await stripe.customers.retrieve(
      customerId
    )) as Stripe.Customer;

    return res.status(200).json(customer.shipping?.address);
  }
}
