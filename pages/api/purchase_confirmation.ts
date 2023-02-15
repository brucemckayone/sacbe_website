import Stripe from "stripe";
import { buffer } from "micro";
import { env } from "next.config";

import checkoutSessionCompleteHandler from "@/lib/webhooks/checkout_session_completed";
import { NextApiRequest, NextApiResponse } from "next";
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_242937646811ecb8ce3e863161dceb662b1f88539e08efe29da1eb17a21bb704";
export const config = { api: { bodyParser: false } };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = new Stripe(env!.STRIPE_SECRET, {
    apiVersion: "2022-11-15",
  });
  const sig: string = req.headers["stripe-signature"] as string;
  const reqBuffer = await buffer(req);
  let event;
  if (req.method === "POST") {
    try {
      event = stripe.webhooks.constructEvent(reqBuffer, sig, endpointSecret);
    } catch (err) {
      return res.status(401).send(`web hook error: ${err}`);
    }
    switch (event.type) {
      case "invoice.payment_succeeded":
        const invoicePaymentSucceeded = event.data.object;

        break;
      // ... handle other event types
      case "checkout.session.completed":
        const data = checkoutSessionCompleteHandler(event);
        console.log(data);
        console.log("testing");

        break;
      default:
        console.log(event.data);
        console.log(`Unhandled event type ${event.type}`);
    }
  } else {
    // Handle any other HTTP method
  }

  res.status(200).json({
    message: "everything went swimmingly",
  });
}
