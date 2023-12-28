import initStripe from "stripe";
import { buffer } from "micro";
import { env } from "next.config";
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_242937646811ecb8ce3e863161dceb662b1f88539e08efe29da1eb17a21bb704";

export default async function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
