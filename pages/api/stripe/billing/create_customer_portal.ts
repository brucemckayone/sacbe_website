import createCustomerPortal from "@/lib/stripe/create_customer_protal";

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
