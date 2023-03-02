import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
import stripe from "@/lib/stripe/stripe";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { accountId, itemId } = req.body;
    res.status(200).json(await createPaymentLink(accountId, itemId));
  }
}

async function createPaymentLink(accountId: string, priceId: string) {
  const params: Stripe.PaymentLinkCreateParams = {
    line_items: [
      {
        price: priceId,
        quantity: 1,
        adjustable_quantity: {
          enabled: true,
          maximum: 100,
          minimum: 0,
        },
      },
    ],
    transfer_data: {
      amount: 400,
      destination: accountId,
    },
    shipping_address_collection: {
      allowed_countries: ["GB"],
    },
    billing_address_collection: "required",

    currency: "GBP",
    allow_promotion_codes: true,
    invoice_creation: {
      enabled: true,
    },
    shipping_options: [
      {
        shipping_rate: "shr_1MbPukG859ZdyFmpRoMDYu8X",
      },
    ],
  };

  return await stripe.paymentLinks.create(params);
}
