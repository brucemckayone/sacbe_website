import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/webhooks/envConfig";
import homeUrl from "@/lib/constants/urls";
import Stripe from "stripe";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = new Stripe(envConfig.STRIPE_SECRET, {
    apiVersion: "2022-11-15",
  });
  const prices = req.body.prices as string[];
  const customerEmail = req.body.customerEmail as string | null | undefined;
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
    shipping_address_collection: {
      allowed_countries: ["GB"],
    },
    customer_email:
      customerEmail != null || undefined
        ? (customerEmail as string)
        : undefined,
    allow_promotion_codes: true,
    cancel_url: homeUrl,
    currency: "GBP",

    locale: "auto",

    // submit_type: "pay",
  };
  if (customerId) {
    payload = {
      ...payload,
      customer: customerId,
    };
  }

  if (mode == "payment") {
    const shippingRates = await stripe.shippingRates.list({ active: true });
    const shippingRateIds = shippingRates.data.map((rate) => rate.id);
    console.log(shippingRateIds);
    payload = {
      ...payload,
      shipping_options: shippingRateIds.map((id) => ({
        shipping_rate: id,
      })),
      invoice_creation: { enabled: true },
    };
  } else {
    payload = {
      ...payload,
    };
  }
  if (customerEmail) {
    payload = {
      ...payload,
      customer_email: customerEmail,
    };
  }
  const response = await stripe.checkout.sessions.create(payload);
  res.status(200).json(response);
}
