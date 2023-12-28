import {
  getAccountPortalId,
  getSubscriptionPortalId,
} from "@/lib/constants/stripe/productids";
import stripe from "@/lib/stripe/init/stripe";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { isSubscription, customerId } = req.body;
    if (isSubscription) {
      const portal = await createSubscriptionPortal({
        customerId: customerId,
      });

      return res.status(200).json(portal);
    } else {
      const portal = await createCustomerPortal({
        customerId: customerId,
      });
      return res.status(200).json(portal);
    }
  } catch (e) {
    return res.status(400).json({
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
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    configuration: getAccountPortalId(),
  });
};

const createSubscriptionPortal = async ({ customerId }: params) => {
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    configuration: getSubscriptionPortalId(),
  });
};
