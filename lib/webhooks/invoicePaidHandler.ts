import Stripe from "stripe";
import admin from "firebase-admin";
import { Timestamp } from "firebase/firestore";
import { orderStatusType } from "@/types/typings";
interface Params {
  invoice: Stripe.Invoice;
  stripe: Stripe;
}

const invoicePaidHandler = async (params: Params) => {
  const { invoice, stripe } = params;
  const db = admin.firestore();
  db.collection("orders").add({
    customerDetails: await stripe.customers.retrieve(
      invoice.customer as string
    ),
    lineItems: invoice.lines.data,
    shippingDetails: invoice.shipping_details,
    orderStatus: "processing" as orderStatusType,
    invoiceNumber: invoice.id,
    dateCreated: Timestamp.fromDate(new Date()),
    lastUpdated: Timestamp.fromDate(new Date()),
  });
};
export default invoicePaidHandler;
