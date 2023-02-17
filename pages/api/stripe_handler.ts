import Stripe from "stripe";
import { buffer } from "micro";
import checkoutSessionCompleteHandler from "@/lib/webhooks/checkout_session_completed";
import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/webhooks/envConfig";
import { firestore } from "@/lib/firebase/firebase";
import eventHandler from "@/lib/stripe/eventHandler";
// This is your Stripe CLI webhook secret for testing your endpoint locally.

export const config = { api: { bodyParser: false } };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = new Stripe(envConfig.STRIPE_SECRET, {
    apiVersion: "2022-11-15",
  });

  // console.log(envConfig.STRIPE_SECRET);
  const sig: string = req.headers["stripe-signature"] as string;
  const reqBuffer = await buffer(req);
  let event;
  if (req.method === "POST") {
    try {
      event = stripe.webhooks.constructEvent(
        reqBuffer,
        sig,
        //"whsec_242937646811ecb8ce3e863161dceb662b1f88539e08efe29da1eb17a21bb704"
        envConfig.STRIPE_WEBHOOK_ENDPOINT
      );
    } catch (err) {
      console.log("webhook error failed");
      const error = err as any;
      return res.status(401).send(`web hook error: ${error.message}`);
    }

    eventHandler({ event: event as Stripe.Event, stripe: stripe });
  } else {
    // Handle any other HTTP method
  }

  res.status(200).json({
    message: "everything went swimmingly",
  });
}
