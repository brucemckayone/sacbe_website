import Stripe from "stripe";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/webhooks/envConfig";
import { analytics } from "@/lib/firebase/firebase";
import { logEvent } from "firebase/analytics";
import { createCheckoutSessionParams } from "../client/create_checkout_session";
import emailSender from "@/utils/email/nodemailer";

import getRawBody from "raw-body";
import { createTransferByAccoundId, getAccountIdFromCoupon } from "../../affiliate/payout";


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
  const rawBody = await getRawBody(req);
  
  let event: Stripe.Event;

  
  let status = 200;
  let message = "unhandeld webhook";
  let data = { message: "no message" };
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      envConfig.STRIPE_CHECKOUT_WEBHOOK
    );
    console.log(`handling ${event.type}`);

    switch (event.type) {
      case "checkout.session.async_payment_failed":
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        logEvent(analytics, "checkoutsession failed ", {}); 
        break;
      case "checkout.session.async_payment_succeeded":
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      case "checkout.session.completed":
        const csCompleted = event.data.object as Stripe.Checkout.Session;
        let checkoutSession = await stripe.checkout.sessions.retrieve(
          csCompleted.id,
          { expand: ["line_items", "customer", "invoice"] }
        );

        handleCheckoutCompleteLogging(checkoutSession);
        await handleUnpaid(checkoutSession, stripe);
        await handleAffiliatePayoutsViaCoupon(checkoutSession);

      case "checkout.session.expired":
        const checkoutSessionExpired = event.data.object as Stripe.Checkout.Session;
        // Then define and call a function to handle the event checkout.session.expired
        checkoutSession = await stripe.checkout.sessions.retrieve(
          checkoutSessionExpired.id,
          { expand: ["line_items", "customer"] }
        );
        
        
          
        break;
      
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


async function handleAffiliatePayoutsViaCoupon(checkoutSession: Stripe.Response<Stripe.Checkout.Session>) {
  const invoice = checkoutSession.invoice as Stripe.Invoice;
  if (invoice.payment_intent) {
    const coupon = invoice.discount?.coupon;
    if (coupon) {
      const accountId = await getAccountIdFromCoupon(coupon.name!);
      if (accountId) {
        const amount = invoice.total_discount_amounts?.reduce((sum, discount) => { return sum + discount.amount; }, 0) ?? 0;
        createTransferByAccoundId({ accountId: accountId, amount: amount ?? 0, sourceTransation: invoice.payment_intent as string ,coupon: coupon.name!});
      }
    }
  }
}

async function handleUnpaid(checkoutSession: Stripe.Response<Stripe.Checkout.Session>, stripe: Stripe) {
  if (checkoutSession.payment_status == "unpaid") {
    // The checkout session was canceled
    // Perform your desired actions here
    const customer = checkoutSession.customer as Stripe.Customer;
    const newSession = await stripe.checkout.sessions.create(createCheckoutSessionParams(checkoutSession.line_items!.data.map((item) => item!.price!.id), checkoutSession!.line_items!.data[0].quantity, checkoutSession.mode, customer?.id));

    new emailSender().send({
      to: customer.email!,
      subject: "How can we help?",
      bodyMessage: 'A little gift for you!',
      htmlContent: `<p>Hi ${customer.name},</p> <p> We noticed that you did not complete your purchase, so we attached 10% discount to your account to help make your decision for positive change easier.</p> <p>Here is a link with your coupon code: <a href="${newSession.url}">link</a></p> <p><a href="https://sacbe-ceremonial-cacao.com">Sacbe Cacao</a></p>`,
      replayTo: 'no-replay@sacbe-ceremonial-cacao.com',
      sender: 'Sacbe Cacao',
    });
  }
}

function handleCheckoutCompleteLogging(checkoutSession: Stripe.Response<Stripe.Checkout.Session>) {
  if (checkoutSession.mode == "payment") {
    logEvent(analytics, "Single Payment Checkout Complete", {
      total: checkoutSession.amount_total,
      customer: checkoutSession.customer_details?.name,
      customerEmail: checkoutSession.customer_details?.email
    });
  } else if (checkoutSession.mode == "subscription") {
    logEvent(analytics, "Single Payment Checkout Complete", {
      total: checkoutSession.amount_total,
      customer: checkoutSession.customer_details?.name,
      customerEmail: checkoutSession.customer_details?.email
    });
  }
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
