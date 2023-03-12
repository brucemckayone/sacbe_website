import Stripe from "stripe";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/webhooks/envConfig";

// This is your Stripe CLI webhook secret for testing your endpoint locally.

export const config = { api: { bodyParser: false } };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const stripe = new Stripe(envConfig.STRIPE_SECRET, {
      apiVersion: "2022-11-15",
    });
    const sig: string = req.headers["stripe-signature"] as string;
    const reqBuffer = await buffer(req);
    let event: Stripe.Event;
    console.log(envConfig.STRIPE_PAYMENTLINK_WEBHOOK);
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      sig,
      //"whsec_242937646811ecb8ce3e863161dceb662b1f88539e08efe29da1eb17a21bb704"
      envConfig.STRIPE_PAYMENTLINK_WEBHOOK
    );

    switch (event.type) {
      case "checkout.session.async_payment_failed":
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
      case "checkout.session.async_payment_succeeded":
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        // Then define and call a function to handle the event checkout.session.completed
        break;
      case "checkout.session.expired":
        const checkoutSessionExpired = event.data.object;
        // Then define and call a function to handle the event checkout.session.expired
        break;
      // ... handle other event types
      default:
        console.log(`Unhandle`);
    }
    res.status(200).send(`${event.type}: processeed`);
  } catch (err) {
    console.log("webhook error failed");
    const error = err as any;
    return res.status(401).send(`web hook error: ${error.message}`);
  }
}
