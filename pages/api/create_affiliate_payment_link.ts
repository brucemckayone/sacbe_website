import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { env } from "@/next.config";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const accountId = req.body["accoutId"];
    const itemId = req.body["itemId"];
    const link = await createPaymentLink(accountId, itemId);
    res.status(200).json(link);
  }
}

async function createPaymentLink(accountId: string, itemId: string) {
  const stripe = new Stripe(env!.STRIPE_SECRET, {
    apiVersion: "2022-11-15",
  });
  const params: Stripe.PaymentLinkCreateParams = {
    line_items: [
      {
        price: "price_1Mb8slG859ZdyFmp0ttYsJAh",
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
      destination: "acct_1MbMvi4ffKpYRYea",
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

  const paymentLink = await stripe.paymentLinks.create(params);

  console.log(paymentLink);
  return paymentLink;
}
