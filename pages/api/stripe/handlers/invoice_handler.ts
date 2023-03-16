import Stripe from "stripe";
import { buffer } from "micro";

import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/webhooks/envConfig";
import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import InvoiceHandler from "@/utils/server/webhooks/invoices";

import emailTemplateSender from "@/utils/email/templates/templateSender";
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

  const invoiceHandler = new InvoiceHandler();

  let event: Stripe.Event;
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: cert({
        projectId: envConfig.FIREBASE_PROJECT_ID,
        clientEmail: envConfig.FIREBASE_CLIENT_EMAIL,
        privateKey: envConfig.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  }
  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      sig,
      envConfig.STRIPE_INVOICE_WEBHOOK
    );
    switch (event.type) {
      case "invoice.created":
        const invoiceCreated = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event invoice.created
        break;
      case "invoice.deleted":
        const invoiceDeleted = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event invoice.deleted
        break;
      case "invoice.finalization_failed":
        const invoiceFinalizationFailed = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event invoice.finalization_failed
        break;
      case "invoice.finalized":
        const invoiceFinalized = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event invoice.finalized
        break;
      case "invoice.marked_uncollectible":
        const invoiceMarkedUncollectible = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event invoice.marked_uncollectible
        break;
      case "invoice.paid":
        console.log(`handled event type ${event.type}`);
        invoiceHandler.invoicePaid(event.data.object as Stripe.Invoice);
        // emailTemplateSender.purchaseConfirmation({
        //   email: "bruce.r.mckay@outlook.com",
        //   name: "bruce McKay",
        //   product: "Sacbe Cacao",
        // });
        res.status(200).json({
          status: 200,
          message: "Payed Invoice has been handled and sent to databse",
        });
        // Then define and call a function to handle the event invoice.paid

        break;
      case "invoice.payment_action_required":
        const invoicePaymentActionRequired = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event invoice.payment_action_required
        break;
      case "invoice.payment_failed":
        const invoicePaymentFailed = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event invoice.payment_failed
        break;
      case "invoice.payment_succeeded":
        const invoicePaymentSucceeded = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event invoice.payment_succeeded
        break;
      case "invoice.sent":
        const invoiceSent = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event invoice.sent
        break;
      case "invoice.upcoming":
        const invoiceUpcoming = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event invoice.upcoming
        break;
      case "invoice.updated":
        const invoiceUpdated = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event invoice.updated
        break;
      case "invoice.voided":
        const invoiceVoided = event.data.object;
        console.log(`handled event type ${event.type}`);
        // Then define and call a function to handle the event invoice.voided
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).json({ status: 200, message: "success" });
  } catch (err) {
    console.log("webhook error failed");
    const error = err as any;
    return res.status(401).send(`web hook error: ${error.message}`);
  }
}
