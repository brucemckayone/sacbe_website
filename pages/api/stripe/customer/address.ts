import { NextApiRequest, NextApiResponse } from "next";
import stripe from "@/lib/stripe/stripe";

import Stripe from "stripe";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestType = req.method as requestMethodType;
  if (requestType == "GET") {
    const id = req.query.id;
    console.log(id);
    const customer = (await stripe.customers.retrieve(id as string, {
      expand: ["shipping"],
    })) as Stripe.Customer;

    const shipping = customer.address;

    return res.status(200).json(shipping);
  } else if (requestType == "PATCH") {
    const { address, id, name } = req.body;

    // return res.status(200).json({ address: address, id: id });

    try {
      const customer = (await stripe.customers.update(id as string, {
        shipping: {
          address: {
            city: address.city,
            country: address.country,
            line1: address.line1,
            line2: address.line2,
            postal_code: address.postal_code,
            state: address.state,
          },
          name: name,
        },
      })) as Stripe.Customer;

      const gotCutomer = await stripe.customers.retrieve(id);

      console.log(gotCutomer);

      return res.status(200).send(true);
    } catch (error) {
      return res.status(400).send(false);
    }
  }
}
