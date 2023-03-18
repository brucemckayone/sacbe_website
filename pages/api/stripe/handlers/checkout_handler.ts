import Stripe from "stripe";
import { buffer } from "micro";
import checkoutSessionCompleteHandler from "@/lib/webhooks/checkout_session_completed";
import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/webhooks/envConfig";

import adminInit from "@/utils/firebase/admin_init";
import { firestore } from "firebase-admin";
import updateStripeCustomerShipping from "@/lib/stripe/updateStripeCustomerShipping";

// This is your Stripe CLI webhook secret for testing your endpoint locally.

export const config = { api: { bodyParser: false } };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = new Stripe(envConfig.STRIPE_SECRET, {
    apiVersion: "2022-11-15",
  });
  const sig: string = req.headers["stripe-signature"] as string;
  const reqBuffer = await buffer(req);
  let event: Stripe.Event;

  adminInit();
  let status = 200;
  let message = "unhandeld webhook";
  let data = { message: "no message" };
  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      sig,
      envConfig.STRIPE_CHECKOUT_WEBHOOK
    );
    console.log(`handling ${event.type}`);

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
        const csCompleted = event.data.object as Stripe.Checkout.Session;
        // get expanded customerSession
        const checkoutSession = await stripe.checkout.sessions.retrieve(
          csCompleted.id,
          { expand: ["line_items", "customer"] }
        );

        const db = firestore();

        db.collection("orderShippingDetails")
          .doc(checkoutSession.invoice as string)
          .set(
            { shipping_details: checkoutSession.shipping_details },
            { merge: true }
          );

        let customer = checkoutSession.customer as Stripe.Customer;

        console.log(checkoutSession);

      // if (!customer.shipping) {
      //   updateStripeCustomerShipping({
      //     address: {
      //       city: checkoutSession.shipping_details?.address?.city as string,
      //       country: checkoutSession.shipping_details?.address
      //         ?.country as string,
      //       line1: checkoutSession.shipping_details?.address?.line1 as string,
      //       line2: checkoutSession.shipping_details?.address?.line2 as string,
      //       postal_code: checkoutSession.shipping_details?.address
      //         ?.postal_code as string,
      //       state: checkoutSession.shipping_details?.address?.state as string,
      //     },
      //     id: customer.id,
      //     name: customer.name ?? "",
      //   });
      // }
      case "checkout.session.expired":
        const checkoutSessionExpired = event.data.object;
        // Then define and call a function to handle the event checkout.session.expired
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.log(`webhook error faild ${err}`);
    const error = err as any;
    return res.status(401).send(`web hook error: ${error.message}`);
  }
  return res
    .status(status)
    .json({ status: status, message: message, data: data });
}

// {
//   "id": "cs_test_a16tW6UCOHmwKq810qIw9mM5Buya1IMdDKfkItotjOIjPRV9O7ZHlyGg0L",
//   "object": "checkout.session",
//   "after_expiration": null,
//   "allow_promotion_codes": null,
//   "amount_subtotal": null,
//   "amount_total": null,
//   "automatic_tax": {
//     "enabled": false,
//     "status": null
//   },
//   "billing_address_collection": null,
//   "cancel_url": "https://example.com/cancel",
//   "client_reference_id": null,
//   "consent": null,
//   "consent_collection": null,
//   "created": 1678637100,
//   "currency": null,
//   "custom_fields": [],
//   "custom_text": {
//     "shipping_address": null,
//     "submit": null
//   },
//   "customer": null,
//   "customer_creation": null,
//   "customer_details": {
//     "address": null,
//     "email": "example@example.com",
//     "name": null,
//     "phone": null,
//     "tax_exempt": "none",
//     "tax_ids": null
//   },
//   "customer_email": null,
//   "expires_at": 1678637100,
//   "invoice": null,
//   "invoice_creation": null,
//   "livemode": false,
//   "locale": null,
//   "metadata": {},
//   "mode": "payment",
//   "payment_intent": "pi_1EUmyo2x6R10KRrhUuJXu9m0",
//   "payment_link": null,
//   "payment_method_collection": null,
//   "payment_method_options": {},
//   "payment_method_types": [
//     "card"
//   ],
//   "payment_status": "unpaid",
//   "phone_number_collection": {
//     "enabled": false
//   },
//   "recovered_from": null,
//   "setup_intent": null,
//   "shipping_address_collection": null,
//   "shipping_cost": null,
//   "shipping_details": null,
//   "shipping_options": [],
//   "status": "expired",
//   "submit_type": null,
//   "subscription": null,
//   "success_url": "https://example.com/success",
//   "total_details": null,
//   "url": null
// }
