import Stripe from "stripe";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";

interface params {
  prices: string[];
  customerEmail?: string;
  mode: Stripe.Checkout.SessionCreateParams.Mode;
}

export default async function createCheckoutSession({
  prices,
  customerEmail,
  mode,
}: params) {
  const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
    "/api/stripe/create_checkout_session",
    {
      prices: prices,
      customerEmail: customerEmail,
      mode: mode,
    }
  );
  if (checkoutSession.url) {
    window.open(checkoutSession.url);
  }
}
