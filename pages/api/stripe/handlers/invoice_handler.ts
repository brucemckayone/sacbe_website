import Stripe from "stripe";
import { buffer } from "micro";

import { firestore, messaging } from "firebase-admin";
import stripe from "@/lib/stripe/stripe";
import adminInit from "@/utils/firebase/admin_init";
import InvoiceSender from "@/utils/email/senders/invoiceSender";
import { log } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/webhooks/envConfig";

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

  const invoiceHandler = new InvoiceHandler();

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
        data = invoiceHandler.invoiceFailed(invoiceFailed);
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
        console.log(productList);
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
        try {
          const firebaseResponse = await db
            .collection("orders")
            .doc(invoice.id)
            .set(data);
          console.log(firebaseResponse);
        } catch (e) {
          console.log(e);
        }

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
  } catch (err) {
    console.log(`webhook error failed: ${err}`);
    const error = err as any;
    return res.status(401).send(`web hook error: ${error.message}`);
  }

  return res
    .status(status)
    .json({ status: status, message: message, data: data });
}

export class InvoiceHandler {
  email = new InvoiceSender();
  private readonly db = firestore();
  async invoicePaid(invoice: Stripe.Invoice) {
    let data = await this.parseInvoiceForFirebase(invoice);
    try {
      this.saveData(data, invoice);
    } catch (e) {
      console.log("saving invoice data failed");
    }
    try {
      messaging().send({
        topic: "all",
        notification: {
          title: `New Order £${data.amount_paid / 100} ${
            data.products[0].name
          }`,
          body: data.customer.name + " has ordered" ?? " NO name has ordered ",
          imageUrl: data.products[0].image ?? "",
        },
      });
    } catch (e) {
      console.log("notification failed for invoice ");
    }
    try {
      this.email.success({
        email: invoice.customer_email!,
        name: invoice.customer_name ?? "",
        orderNumber: data.invoiceNumber,
        orderNumberUrl: invoice.hosted_invoice_url!,
        productName: data.products[0].name ?? "",
        recipeUrl: invoice.hosted_invoice_url ?? "",
      });
    } catch (e) {
      console.log("failed to send email for invoice to customer");
    }

    return data;
  }
  async invoiceFailed(invoice: Stripe.Invoice) {
    const data = await this.parseInvoiceForFirebase(invoice);
    data.orderStatus = "failed";
    messaging().send({
      topic: "all",
      notification: {
        title:
          "Payment Failed £" +
          data.amount_paid / 100 +
          ` ${data.products[0].name}`,
        body: data.customer.name! + " payment has failed",
        imageUrl: data.products[0].image,
      },
    });

    this.saveData(data, invoice);
    this.email.failure({
      email: invoice.customer_email!,
      name: invoice.customer_name ?? "",
      orderNumber: data.invoiceNumber,
      orderNumberUrl: invoice.hosted_invoice_url!,
    });
    return data;
  }

  private async parseInvoiceForFirebase(invoice: Stripe.Invoice) {
    const productIds = invoice.lines.data.map(
      (line) => line.price!.product as string
    );
    console.log(productIds);
    const products = await stripe.products.list({
      ids: productIds,
      limit: 100,
    });

    console.log(products);
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
    console.log(productList);
    return {
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
  }

  saveData(data: any, invoice: Stripe.Invoice) {
    this.db
      .collection("orders")
      .doc(invoice.id)
      .set(data)
      .then((res) => {
        return res;
      })
      .catch((e) => console.log(e));
    return data;
  }
}
