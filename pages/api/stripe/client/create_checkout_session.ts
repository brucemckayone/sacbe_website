import { NextApiRequest, NextApiResponse } from "next";

import homeUrl from "@/lib/constants/urls";
import Stripe from "stripe";
import stripe from "@/lib/stripe/stripe";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prices = req.body.prices as string[];

  const customerId = req.body.customerId as string | null | undefined;
  const mode = req.body.mode as Stripe.Checkout.SessionCreateParams.Mode;

  let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  prices.forEach((price) => {
    lineItems.push({
      adjustable_quantity: { enabled: true },
      quantity: 1,
      price: price,
    });
  });

  let payload: Stripe.Checkout.SessionCreateParams = {
    success_url: homeUrl,
    line_items: lineItems,
    mode: mode,
    billing_address_collection: "required",
    allow_promotion_codes: true,
    cancel_url: homeUrl,
    currency: "GBP",
    locale: "auto",
    client_reference_id: customerId ? customerId : "guest checkout",
    // consent_collection: {
    //   terms_of_service: "required",
    // },
    phone_number_collection: {
      enabled: true,
    },
    shipping_address_collection: {
      allowed_countries: ["GB"],
    },

    customer: customerId ?? undefined,

    customer_update: customerId
      ? {
          shipping: "auto",
          name: "auto",
          address: "auto",
        }
      : undefined,
  };

  if (mode == "payment") {
    const shippingRates = await stripe.shippingRates.list({ active: true });
    const shippingRateIds = shippingRates.data.map((rate) => rate.id);
    console.log(shippingRateIds);
    payload = {
      ...payload,
      shipping_options: shippingRateIds.map((id) => ({
        shipping_rate: id,
      })),
      shipping_address_collection: {
        allowed_countries: ["GB"],
      },
      invoice_creation: { enabled: true },
    };
  }

  res.status(200).json(await stripe.checkout.sessions.create(payload));
}
