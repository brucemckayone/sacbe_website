import Stripe from "stripe";
import { envConfig } from "@/lib/webhooks/envConfig";

const stripe = new Stripe(envConfig.STRIPE_SECRET, {
  apiVersion: "2022-11-15",
});

export default stripe;
