import Stripe from "stripe";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/webhooks/envConfig";
import { handlePaymentSucceeded } from "../handlePaymentSucceeded";

// import { InvoiceHandler } from "@/utils/server/webhooks/invoices";

// import emailTemplateSender from "@/utils/email/templates/templateSender";
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

  let status = 200;
  let message = "message not set";
  let data = {};
  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      sig,
      envConfig.STRIPE_INVOICE_WEBHOOK
    );
    switch (event.type) {
      case "invoice.payment_failed":
        const invoiceFailed = event.data.object as Stripe.Invoice;

        console.log(`handled event type ${event.type}`);

        break;
      case "invoice.payment_succeeded":
        data = await handlePaymentSucceeded(event, stripe, data);
        message =
          "Invoice payment_succeeded handled: email,notification and data saved";
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.log(`webhook error failed: ${err}`);
    const error = err as any;
    return res.status(401).send(`web hook error: ${error.message}`);
  }

  return res
    .status(status)
    .json({ status: status, message: message, data: data });
}
