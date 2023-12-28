import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/env/envConfig";
import stripe from "@/lib/stripe/init/stripe";
import getRawBody from "raw-body";
import adminInit from "@/lib/firebase/admin_init";
import api from "@/lib/apiSchema/apiSchema";
import { UserApiHandler } from "@/app/api/user/UserApiHandler";

// This is your Stripe CLI webhook secret for testing your endpoint locally.

export const config = { api: { bodyParser: false } };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let message = "";
  const sig: string = req.headers["stripe-signature"] as string;
  const rawBody = await getRawBody(req);
  let event: Stripe.Event;
  const admin = adminInit();
  const db = admin.firestore();
  // const sendEmail = new SubscriptionSender();
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      envConfig.STRIPE_CUSTOMER_WEBHOOK
    );
    switch (event.type) {
      case "customer.created":
        // const customerCreated = event.data.object as any;
        // console.log(`handled event type ${event.type}`);
        // new CustomerEmailSender().newCustomer(customerCreated.email);
        // message = "email forst time has been sent to " + customerCreated.email;
        break;

      case "customer.subscription.created":
        const subscription = event.data.object as Stripe.Subscription;

        const { name, email } = (await stripe.customers.retrieve(
          subscription.customer as string
        )) as Stripe.Customer;

        const user = await api.user.get({
          data: { customerId: subscription.customer as string },
        });

        db.collection("subscriptions").doc(subscription.id).set({
          user: user?.data.uuid,
          name: name,
          email: email,
          id: subscription.id,
          customer: subscription.customer,
          status: subscription.status,
          items: subscription.items.data,
          date: new Date(),
        });

        console.log(`handled event type ${event.type}`);
        message = "customer created handled saved to firestore";
        // Then define and call a function to handle the event customer.subscription.created
        break;

      case "customer.subscription.updated":
        const subscriptionUpdated = event.data.object as Stripe.Subscription;

        await db
          .collection("subscriptions")
          .doc(subscriptionUpdated.id)
          .update({
            status: subscriptionUpdated.status,
          });
        break;

      case "customer.subscription.deleted":
        const subscriptionDeleted = event.data.object as Stripe.Subscription;
        // Logic to handle subscription cancellation
        // E.g., mark the subscription as cancelled in Firestore
        await db
          .collection("subscriptions")
          .doc(subscriptionDeleted.id)
          .update({
            status: "cancelled",
            endDate: admin.firestore.Timestamp.fromDate(new Date()),
          });
        break;

      case "customer.subscription.paused":
      // console.log(`handled event type ${event.type}`);
      // const customerSubscriptionPaused = event.data.object as Stripe.Subscription;

      // firestore().collection("subscriptions").doc(customerSubscriptionPaused.id).update({
      //   status: customerSubscriptionPaused.status,
      //   resumesAt: customerSubscriptionPaused.pause_collection?.resumes_at,
      // });
      // Then define and call a function to handle the event customer.subscription.paused
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.log("webhook error failed");
    // const error = err as any;
    // return res.status(401).send(`web hook error: ${error.message}`);
  }

  res.status(200).json({ status: 200, message: message });
}
