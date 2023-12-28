import Stripe from "stripe";

import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/env/envConfig";
import { firestore, messaging } from "firebase-admin";
import stripe from "@/lib/stripe/init/stripe";
import adminInit from "@/lib/firebase/admin_init";
import emailSender from "@/lib/email/nodemailer";
import getRawBody from "raw-body";
import { orderStatusType, WooCreateOrderModel } from "@/types/typings";
import {
  convertStripeInvoiceToWoocommerceOrder,
  createWoocommerceOrder,
} from "@/app/api/thirdeye/woo";

export const config = { api: { bodyParser: false } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sig: string = req.headers["stripe-signature"] as string;
  const rawBody = await getRawBody(req);
  let event: Stripe.Event;
  let status = 200;
  let message = "message not set";
  let data: any = {};

  try {
    adminInit();

    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      envConfig.STRIPE_INVOICE_WEBHOOK
    );
    switch (event.type) {
      case "invoice.payment_failed":
        const invoiceFailed = event.data.object as Stripe.Invoice;
        // send email to admin that payment failed

        const customer = (await stripe.customers.retrieve(
          invoiceFailed.customer as string
        )) as Stripe.Customer;

        new emailSender().send({
          bodyMessage: `${customer.name ?? ""} Payment failed for invoice ${
            invoiceFailed.id
          }`,
          htmlContent: `<p>Hi Bruce, </p><p> This is an automated message to let you know that a payment has failed. for customer ${customer.name}, </p><p> Please check the admin portal for more details.</p>`,
          replayTo: "no-replay@sacbe-ceremonial-cacao.com",
          sender: "no-replay@sacbe-ceremonial-cacao.com",
          subject: `Payment failed for invoice email:${customer.email} name:${customer.name} `,
          to: "brucemckayone@gmail.com",
        });

        console.log(`handled event type ${event.type}`);

        break;

      case "invoice.paid":
        const invoicePaid = event.data.object as Stripe.Invoice;
        ({ data, message } = await handleInvoicePaid(
          invoicePaid,
          data,
          message
        ));

        const order = await convertStripeInvoiceToWoocommerceOrder(invoicePaid);

        // const order = await convertStripeInvoiceToWoocommerceOrder(invoicePaid)

        const response = await createWoocommerceOrder(order!);

        // const response = await createWoocommerceOrder(order);

        //  new emailSender().send({
        //   bodyMessage: `Invoice Has Been Paid: ${data.customer_name} ${data.customer_email} `,
        //   htmlContent: `An Invoice has been paided ${invoicePaid.subscription? "for a subscription": " for a one time purchase"}`,
        //   replayTo: "no-replay@sacbe-ceremonial-cacao.com",
        //   sender: "no-replay@sacbe-ceremonial-cacao.com",
        //   subject: `Payment failed for invoice email `,
        //   to: "brucemckayone@gmail.com",
        // });

        message =
          "invoice handled both woocommerce and sacbe order created and email sent";
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error(`webhook error failed: ${err}`);
    const error = err as any;
    return res.status(401).send(`web hook error: ${error.message}`);
  }

  return res
    .status(status)
    .json({ status: status, message: message, data: data });
}

async function handleInvoicePaid(
  invoice: Stripe.Invoice,
  data: {},
  message: string
) {
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
    const name = products.data[i].name;
    const lineItem = invoice.lines.data.filter((e) => {
      return e.description?.toLowerCase().includes(name.toLowerCase());
    })[0];
    const product = {
      id: products.data[i].id ?? "no id",
      name: products.data[i].name ?? "no nake",
      image:
        products.data[i].images[0] ??
        "https://www.sacbe-ceremonial-cacao.com/logo.svg",
      quantity: lineItem.quantity ?? "non quantity",
      cost: lineItem.amount ?? 0,
      subscriptionId: lineItem.subscription ?? "no sub id",
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

  db.collection("orders").doc(invoice.id).set(data);

  message =
    "Invoice payment_succeeded handled: email,notification and data saved";

  messaging().send({
    topic: "all",
    notification: {
      body: `Fuck Yes! Another sale worth £${
        productList.reduce((total, a) => a.cost + total, 0) / 100 ?? "something"
      } Smackaroonies`,
      imageUrl:
        productList[0]?.image ??
        "https://www.sacbe-ceremonial-cacao.com/logo.svg",
      title: `New Order: ${invoice.customer_name}`,
    },
  });
  return { data, message };
}
