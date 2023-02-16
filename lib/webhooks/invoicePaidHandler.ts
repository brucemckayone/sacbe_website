import Stripe from "stripe";
import admin from "firebase-admin";
interface Params {
  invoice: Stripe.Invoice;
  stripe: Stripe;
}

const invoicePaidHandler = async (params: Params) => {
  const { invoice, stripe } = params;

  const db = admin.firestore();
  db.collection("orders").add({
    customerDetails: await stripe.customers.retrieve(invoice.customer as any),
    lineItems: invoice.lines.data,
    shippingDetails: invoice.shipping_details,
  });
};
export default invoicePaidHandler;
