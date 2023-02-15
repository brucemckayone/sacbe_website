import Stripe from "stripe";
import { buffer } from "micro";
import checkoutSessionCompleteHandler from "@/lib/webhooks/checkout_session_completed";
import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/webhooks/envConfig";
// This is your Stripe CLI webhook secret for testing your endpoint locally.

export const config = { api: { bodyParser: false } };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = new Stripe(envConfig.STRIPE_SECRET, {
    apiVersion: "2022-11-15",
  });

  console.log(envConfig.STRIPE_SECRET);
  const sig: string = req.headers["stripe-signature"] as string;
  const reqBuffer = await buffer(req);
  let event;
  if (req.method === "POST") {
    try {
      event = stripe.webhooks.constructEvent(
        reqBuffer,
        sig,
        envConfig.STRIPE_WEBHOOK_ENDPOINT
      );
    } catch (err) {
      console.log("webhook error failed");
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
