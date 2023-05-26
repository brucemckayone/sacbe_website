import Stripe from "stripe";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/webhooks/envConfig";
import { handlePaymentSucceeded } from "./handlePaymentSucceeded";
import { firestore } from "firebase-admin";

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
        const invoice = event.data.object as Stripe.Invoice;
        const productIds = invoice.lines.data.map(
          (line) => line.price!.product as string
        );

        const products = await stripe.products.list({
          ids: productIds,
          limit: 100,
        });

        if (products.has_more) {
          const moreProducts = await stripe.products.list({
            ids: productIds,
            limit: 100,
            starting_after: "100",
          });
          products.data.push(...moreProducts.data);
        }

        let productList = [];
        for (let i = 0; i < products.data.length; i++) {
          const product = {
            id: products.data[i].id ?? "no id",
            name: products.data[i].name ?? "no nake",
            image: products.data[i].images[0] ?? "no image",
            quantity: invoice.lines.data[i].quantity ?? "non quantity",
            cost: invoice.lines.data[i].amount ?? 0,
            subscriptionId: invoice.lines.data[i].subscription ?? "no sub id",
          };
          productList.push(product);
        }

        data = {
          customer: {
            id: invoice.customer,
            name: invoice.customer_name,
            phone: invoice.customer_phone,
            email: invoice.customer_email,
            address: invoice.customer_address,
            customer_standard_shipping_address: invoice.customer_shipping,
          },
          products: productList,
          orderStatus: "processing" as orderStatusType,
          invoiceNumber: invoice.id,
          dateCreated: new Date(),
          lastUpdated: new Date(),
          amount_paid: invoice.amount_paid,
          amount_due: invoice.amount_due,
          shipping_cost: invoice.shipping_cost,
          charge: invoice.charge,
        };
        const db = firestore();

        const firebaseResponse = await db
          .collection("orders")
          .doc(invoice.id)
          .set(data);
        console.log(firebaseResponse);
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
