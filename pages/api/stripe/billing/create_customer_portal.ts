import stripe from "@/lib/stripe/stripe";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const portal = await createCustomerPortal({
      customerId: req.body.customerId,
    });
    res.status(200).json(portal);
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: "there was a problem creating the customer portal",
      error: e,
    });
  }
}

interface params {
  customerId: string;
}

const createCustomerPortal = async ({ customerId }: params) => {
  const configuration = await stripe.billingPortal.configurations.list();
  console.log(configuration);

  console.log(configuration.data[0].id);
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    configuration: configuration.data[0].id,
  });
};
