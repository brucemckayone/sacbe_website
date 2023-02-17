import stripe from "../constants/stripeInstance";
import homeUrl from "../constants/urls";
import Stripe from "stripe";
interface Params {
  customerId?: string;
  prices: string[];
  customerEmail?: string | null | undefined;
}

const createCheckoutSession = async (params: Params) => {
  const { prices, customerId, customerEmail } = params;

  const shippingRates = await stripe.shippingRates.list();

  const shippingRateIds = shippingRates.data.map((rate) => rate.id);
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
    mode: "payment",
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["GB"],
    },
    allow_promotion_codes: true,
    cancel_url: homeUrl,
    currency: "GB",
    invoice_creation: {
      enabled: true,
    },
    locale: "auto",
    shipping_options: shippingRateIds.map((id) => ({
      shipping_rate: id,
    })),
    submit_type: "pay",
  };

  if (customerId) {
    payload = {
      ...payload,
      customer: customerId,
    };
  }
  if (customerEmail) {
    payload = {
      ...payload,
      customer_email: customerEmail,
    };
  }

  stripe.checkout.sessions.create(payload);
};
export default createCheckoutSession;
