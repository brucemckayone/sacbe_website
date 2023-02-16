import Stripe from "stripe";
import { buffer } from "micro";
import checkoutSessionCompleteHandler from "@/lib/webhooks/checkout_session_completed";
import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/webhooks/envConfig";
import { firestore } from "@/lib/firebase/firebase";
import admin from "firebase-admin";

var serviceAccount = require("/Users/brucemckay/Development/third_eye/sacbe_cacao/sacbe_website/sacbe-cacao-firebase-adminsdk-xts9p-07cfc8c646.json");
// This is your Stripe CLI webhook secret for testing your endpoint locally.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
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
        "whsec_242937646811ecb8ce3e863161dceb662b1f88539e08efe29da1eb17a21bb704" //envConfig.STRIPE_WEBHOOK_ENDPOINT
      );
    } catch (err) {
      console.log("webhook error failed");
      const error = err as any;
      return res.status(401).send(`web hook error: ${error.message}`);
    }
    switch (event.type) {
      case "invoice.paid":
        const invoice: Stripe.Invoice = event.data.object as Stripe.Invoice;
        // // console.log(invoicePaymentSucceeded);
        // console.log(invoice);

        // firestore.collection("purchases").add({
        //   customerDetails: await stripe.customers.retrieve(
        //     invoice.customer as any
        //   ),
        //   lineItems: invoice.lines.data,
        //   shippingDetails: invoice.shipping_details,
        // });
        // const messaging = getMessaging();

        break;
      // ... handle other event types
      case "checkout.session.completed":
        // const data = await chec
        // checkoutSessionCompleteHandler(event);
        // console.log(data);
        const db = admin.firestore();
        db.collection("testing").doc("fart_attack").set({
          bigFart: "pppphhhhhhhhhfhhffhfhfhfhft squelch",
        });
        console.log("tested");

        break;
      case "customer.subscription.created":
        break;
      case "customer.subscription.deleted":
        break;
      case "customer.subscription.paused":
        break;
      case "customer.subscription.created":
        break;
      case "customer.subscription.resumed":
        break;
      case "product.created":
        break;
      case "transfer.created":
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
      // console.log(event.data);
    }
  } else {
    // Handle any other HTTP method
  }

  res.status(200).json({
    message: "everything went swimmingly",
  });
}
