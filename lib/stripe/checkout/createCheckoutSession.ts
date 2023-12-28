import Stripe from "stripe";
import api from "@/lib/apiSchema/apiSchema";

interface params {
  prices: string[];
  customerEmail?: string;
  customerId?: string;
  mode: Stripe.Checkout.SessionCreateParams.Mode;
  qty: number;
  discountCode?: string;
  giveReturn?: boolean;
}

export default async function createCheckoutSession({
  prices,
  mode,
  qty,
  discountCode,
  customerId,
  giveReturn,
}: params) {
  const checkoutSession = await api.stripe.checkout.get({
    data: {
      customerId: customerId,
      mode: mode,
      prices: prices,
      qty: qty,
      discount: discountCode,
    },
  });

  console.log(checkoutSession);

  if (checkoutSession.data.url) {
    if (giveReturn) {
      return checkoutSession.url;
    }

    location.href = checkoutSession.data.url;
  }
}
