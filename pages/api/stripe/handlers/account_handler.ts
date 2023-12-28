import Stripe from "stripe";

import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/env/envConfig";
import getRawBody from "raw-body";
import stripe from "@/lib/stripe/init/stripe";
// This is your Stripe CLI webhook secret for testing your endpoint locally.

export const config = { api: { bodyParser: false } };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sig: string = req.headers["stripe-signature"] as string;
  const rawBody = await getRawBody(req);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      envConfig.STRIPE_ACCOUNT_WEBHOOK
    );

    switch (event.type) {
      case "account.updated":
        const accountUpdated = event.data.object;
        break;
      case "account.application.authorized":
        const accountApplicationAuthorized = event.data.object;
        // Then define and call a function to handle the event account.application.authorized
        break;
      case "account.application.deauthorized":
        const accountApplicationDeauthorized = event.data.object;
        // Then define and call a function to handle the event account.application.deauthorized
        break;
      case "account.external_account.created":
        const accountExternalAccountCreated = event.data.object;
        // Then define and call a function to handle the event account.external_account.created
        break;
      case "account.external_account.deleted":
        const accountExternalAccountDeleted = event.data.object;
        // Then define and call a function to handle the event account.external_account.deleted
        break;
      case "account.external_account.updated":
        const accountExternalAccountUpdated = event.data.object;
        // Then define and call a function to handle the event account.external_account.updated
        break;
      // ... handle other event types
      default:
        console.error(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error("webhook error failed");
    const error = err as any;
    return res.status(401).send(`web hook error: ${error.message}`);
  }

  res.status(200).json({ status: 200, message: "success" });
}
