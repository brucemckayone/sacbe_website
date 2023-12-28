import { NextApiRequest, NextApiResponse } from "next";

import homeUrl from "@/lib/constants/urls";
import Stripe from "stripe";
import stripe from "@/lib/stripe/init/stripe";
import { APIResponse } from "@/app/api/types";
import StripeCheckoutApiHelper, {
  ICreateCheckoutParams,
} from "@/app/api/stripe/checkout/helper";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const helper = new StripeCheckoutApiHelper(stripe);
  const prices = req.body.prices as string[];
  const qty = req.body.qty;
  const customerId = req.body.customerId as string | null | undefined;
  const discount = req.body.discount as string | null | undefined;
  const mode = req.body.mode as Stripe.Checkout.SessionCreateParams.Mode;

  res.status(200).json(await helper.createCheckoutSession(req.body));
  // await stripe.checkout.sessions.create(
  //   createCheckoutSessionParams(prices, qty, mode, customerId, discount)
  // )
  // );
}

function calculateShippingQty(qty: number) {
  if (qty == 1 || qty == 2) {
    return 1;
  } else if (qty == 3 || qty == 4) {
    return 2;
  } else if (qty == 5 || qty == 6) {
    return 3;
  } else if (qty == 6 || qty == 7) {
    return 4;
  } else if (qty == 8 || qty == 9) {
    return 5;
  } else return 6;
}

export function createCheckoutSessionParams(params: ICreateCheckoutParams) {
  const { customerId, mode, prices, qty, discount } = params;
  let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  prices.forEach((price) => {
    if (
      price != "price_1NLYCaG859ZdyFmprZcXvCYg" &&
      price != "price_1NLYCTG859ZdyFmpJCrCATal" &&
      price != "price_1NIsjZG859ZdyFmpvMG66qkf" &&
      price != "price_1NIsiYG859ZdyFmpLEjRmAAZ"
    ) {
      lineItems.push({
        adjustable_quantity: { enabled: false },
        quantity: qty,
        price: price,
      });
    } else {
      lineItems.push({
        adjustable_quantity: { enabled: false },
        quantity: calculateShippingQty(qty),
        price: price,
      });
    }
  });

  let payload: Stripe.Checkout.SessionCreateParams = {
    success_url: `${homeUrl}/complete/checkout?session_id={CHECKOUT_SESSION_ID}`,
    line_items: lineItems,
    mode: mode,
    billing_address_collection: "required",
    allow_promotion_codes: discount ? undefined : true,
    cancel_url: `${homeUrl}/cancelled/checkout?session_id={CHECKOUT_SESSION_ID}`,
    currency: "GBP",
    locale: "auto",
    discounts: discount ? [{ coupon: discount }] : undefined,
    client_reference_id: customerId ? customerId : "guest checkout",
    phone_number_collection: {
      enabled: true,
    },
    shipping_address_collection: {
      allowed_countries: ["GB"],
    },
    customer: customerId ?? undefined,
    customer_update:
      customerId != "undefined"
        ? {
            shipping: "auto",
            name: "auto",
            address: "auto",
          }
        : undefined,
  };

  if (mode == "payment") {
    payload = {
      ...payload,
      // payment_method_types: ["card",  "afterpay_clearpay", "klarna", "],
      customer_creation: "if_required",
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              currency: "gbp",
              amount: generateShippingCost(qty),
            },
            display_name: "1st Class ",
            delivery_estimate: {
              maximum: {
                unit: "business_day",
                value: 3,
              },
              minimum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              currency: "gbp",
              amount: generateSecondClassShipping(qty),
            },
            display_name: "2nd Class",
            delivery_estimate: {
              maximum: {
                unit: "business_day",
                value: 5,
              },
              minimum: {
                unit: "business_day",
                value: 2,
              },
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["GB"],
      },
      invoice_creation: { enabled: true },
    };
  }
  return payload;
}

function generateSecondClassShipping(qty: number) {
  const shippingCost = 395;
  const shippingCostPertem = 195;
  const shippingCostPerItemAfter = 95;
  const shippingCostAfter = 2;
  if (qty <= shippingCostAfter) {
    return shippingCost;
  }
  return shippingCost + (qty - shippingCostAfter) * shippingCostPerItemAfter;
}

function generateShippingCost(qty: number) {
  const shippingCost = 495;
  const shippingCostPerItem = 295;
  const shippingCostPerItemAfter = 195;
  const shippingCostAfter = 2;
  if (qty <= shippingCostAfter) {
    return shippingCost;
  } else {
    return shippingCost + (qty - shippingCostAfter) * shippingCostPerItemAfter;
  }
}
