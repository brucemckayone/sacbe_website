// ./utils/get-stripejs.ts
import { envConfig } from "@/lib/webhooks/envConfig";
import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(envConfig.STRIPE_PUBLIC);
  }
  return stripePromise;
};

export default getStripe;
