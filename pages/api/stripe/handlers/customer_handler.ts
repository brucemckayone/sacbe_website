import Stripe from "stripe";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/webhooks/envConfig";
import SubscriptionWebHooks from "@/utils/server/webhooks/subscriptions";
import SubscriptionSender from "@/utils/email/senders/subscriptionSender";
import stripe from "@/lib/stripe/stripe";

// This is your Stripe CLI webhook secret for testing your endpoint locally.

export const config = { api: { bodyParser: false } };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sig: string = req.headers["stripe-signature"] as string;
  const reqBuffer = await buffer(req);
  let event: Stripe.Event;
  const subWebhooks = new SubscriptionWebHooks();
  const sendEmail = new SubscriptionSender();
  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      sig,
      envConfig.STRIPE_CUSTOMER_WEBHOOK
    );
    switch (event.type) {
      case "customer.created":
        const customerCreated = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event customer.created
        break;
      case "customer.deleted":
        const customerDeleted = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event customer.deleted
        break;
      case "customer.updated":
        const customerUpdated = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event customer.updated
        break;
      case "customer.discount.created":
        const customerDiscountCreated = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event customer.discount.created
        break;
      case "customer.discount.deleted":
        const customerDiscountDeleted = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event customer.discount.deleted
        break;
      case "customer.discount.updated":
        const customerDiscountUpdated = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event customer.discount.updated
        break;
      case "customer.subscription.created":
        
        const subscription = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(
          subscription.customer as string
        );
        
       
        const { name, email } = customer as Stripe.Customer;
        
        sendEmail.created({
          name: name!,
          email: email!,
          portalLink: "https://portal.sacbe-ceremonial-cacao.com/p/login/test_dR629SgVlcYOdri000",
        });

        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event customer.subscription.created
        break;
      case "customer.subscription.deleted":
        const customerSubscriptionDeleted = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event customer.subscription.deleted
        break;
      case "customer.subscription.paused":
        console.log(`handled event type ${event.type}`);
        const customerSubscriptionPaused = event.data.object;
        // Then define and call a function to handle the event customer.subscription.paused
        break;
      case "customer.subscription.pending_update_applied":
        console.log(`handled event type ${event.type}`);
        const customerSubscriptionPendingUpdateApplied = event.data.object;
        // Then define and call a function to handle the event customer.subscription.pending_update_applied
        break;
      case "customer.subscription.pending_update_expired":
        console.log(`handled event type ${event.type}`);
        const customerSubscriptionPendingUpdateExpired = event.data.object;
        // Then define and call a function to handle the event customer.subscription.pending_update_expired
        break;
      case "customer.subscription.resumed":
        console.log(`handled event type ${event.type}`);
        const customerSubscriptionResumed = event.data.object;
        // Then define and call a function to handle the event customer.subscription.resumed
        break;
      case "customer.subscription.trial_will_end":
        console.log(`handled event type ${event.type}`);
        const customerSubscriptionTrialWillEnd = event.data.object;
        // Then define and call a function to handle the event customer.subscription.trial_will_end
        break;
      case "customer.subscription.updated":
        console.log(`handled event type ${event.type}`);
        const customerSubscriptionUpdated = event.data.object;
        // Then define and call a function to handle the event customer.subscription.updated
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.log("webhook error failed");
    // const error = err as any;
    // return res.status(401).send(`web hook error: ${error.message}`);
  }

  res.status(200).json({ status: 200, message: "success" });
}
